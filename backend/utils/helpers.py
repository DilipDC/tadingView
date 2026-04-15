# ================= HELPER UTILITIES =================

import time
from config import log, MIN_PRICE, MAX_PRICE


# ================= RESPONSE =================

def success_response(data=None):
    return {
        "success": True,
        "data": data or {}
    }


def error_response(message="error"):
    return {
        "success": False,
        "error": message
    }


# ================= TIME =================

def current_timestamp():
    return int(time.time())


def format_time(ts):
    return time.strftime("%H:%M:%S", time.localtime(ts))


# ================= VALIDATION =================

def clamp_price(price):
    if price < MIN_PRICE:
        return MIN_PRICE
    if price > MAX_PRICE:
        return MAX_PRICE
    return price


def validate_stock_data(data):
    errors = []

    if not data.get("name"):
        errors.append("Name required")

    try:
        price = float(data.get("price", 0))
        if price <= 0:
            errors.append("Invalid price")
    except:
        errors.append("Price must be number")

    return errors


# ================= SAFE PARSE =================

def safe_int(value, default=0):
    try:
        return int(value)
    except:
        return default


def safe_float(value, default=0.0):
    try:
        return float(value)
    except:
        return default


# ================= LOGGING =================

def debug_log(message):
    log(f"[DEBUG] {message}")


def error_log(message):
    log(f"[ERROR] {message}")


# ================= STOCK HELPERS =================

def calculate_percentage_change(old, new):
    try:
        return ((new - old) / old) * 100
    except:
        return 0


def normalize_users(up, down):
    if up < 0: up = 0
    if down < 0: down = 0
    return up, down