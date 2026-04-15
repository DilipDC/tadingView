# ================= AUTH ROUTES =================

from flask import Blueprint, request, jsonify, session
from config import ADMIN_USERNAME, ADMIN_PASSWORD, log

auth_bp = Blueprint("auth", __name__)


# ================= LOGIN =================

@auth_bp.route("/api/login", methods=["POST"])
def login():
    data = request.json or {}

    username = data.get("username")
    password = data.get("password")

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        session["admin"] = True
        log("Admin logged in")
        return {"success": True}

    return {"success": False}, 401


# ================= LOGOUT =================

@auth_bp.route("/api/logout", methods=["POST"])
def logout():
    session.pop("admin", None)
    return {"success": True}


# ================= CHECK =================

@auth_bp.route("/api/check", methods=["GET"])
def check_auth():
    if session.get("admin"):
        return {"logged": True}
    return {"logged": False}