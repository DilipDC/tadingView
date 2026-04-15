# ================= SECURITY UTILITIES =================

import hashlib
import time
from functools import wraps
from flask import request, jsonify, session

from config import SESSION_TIMEOUT, log


# ================= PASSWORD HASH =================

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(input_password, stored_hash):
    return hash_password(input_password) == stored_hash


# ================= SESSION SECURITY =================

def login_user():
    session["admin"] = True
    session["login_time"] = int(time.time())


def logout_user():
    session.clear()


def is_logged_in():
    return session.get("admin") is True


def session_valid():
    login_time = session.get("login_time")

    if not login_time:
        return False

    return (int(time.time()) - login_time) < SESSION_TIMEOUT


# ================= DECORATOR =================

def admin_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if not is_logged_in() or not session_valid():
            return jsonify({"error": "unauthorized"}), 403
        return func(*args, **kwargs)
    return wrapper


# ================= INPUT SANITIZATION =================

def sanitize_string(value: str) -> str:
    if not value:
        return ""

    return value.strip().replace("<", "").replace(">", "")


def sanitize_number(value, default=0):
    try:
        return float(value)
    except:
        return default


# ================= RATE LIMIT (BASIC) =================

REQUEST_LOG = {}

def rate_limit(ip, limit=10, window=5):
    now = time.time()

    if ip not in REQUEST_LOG:
        REQUEST_LOG[ip] = []

    # remove old requests
    REQUEST_LOG[ip] = [t for t in REQUEST_LOG[ip] if now - t < window]

    if len(REQUEST_LOG[ip]) >= limit:
        return False

    REQUEST_LOG[ip].append(now)
    return True


def rate_limit_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        ip = request.remote_addr

        if not rate_limit(ip):
            return jsonify({"error": "Too many requests"}), 429

        return func(*args, **kwargs)
    return wrapper