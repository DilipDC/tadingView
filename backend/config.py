# =========================================
# ⚙️ FINAL CONFIG (SECURE + FLEXIBLE)
# =========================================

import os

# =========================
# 📁 BASE PATH
# =========================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# 🗄 DATABASE
# =========================

DB_NAME = "db.sqlite"
DB_PATH = os.path.join(BASE_DIR, "database", DB_NAME)

# =========================
# 🌐 SERVER
# =========================

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 5000))
DEBUG = os.getenv("DEBUG", "false").lower() == "true"

# =========================
# 🔐 SECURITY (IMPORTANT)
# =========================

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY not set!")

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME", "admin")

ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
if not ADMIN_PASSWORD:
    raise ValueError("ADMIN_PASSWORD not set!")

SESSION_TIMEOUT = int(os.getenv("SESSION_TIMEOUT", 3600))

# =========================
# 📊 STOCK DEFAULTS
# =========================

DEFAULT_PRICE = 100.0
DEFAULT_MODE = "auto"

DEFAULT_DIRECTION = "up"
DEFAULT_PERCENTAGE = 1.0
DEFAULT_INTERVAL = 1

DEFAULT_USERS_UP = 50
DEFAULT_USERS_DOWN = 50

# =========================
# ⚙️ ENGINE
# =========================

ENGINE_INTERVAL = float(os.getenv("ENGINE_INTERVAL", 1))

AUTO_UP_MULTIPLIER = 1.005
AUTO_DOWN_MULTIPLIER = 0.995

# =========================
# 🛡 LIMITS
# =========================

MIN_PRICE = 1
MAX_PRICE = 100000

MIN_PERCENTAGE = 0.1
MAX_PERCENTAGE = 20

MIN_INTERVAL = 1
MAX_INTERVAL = 60

# =========================
# 📜 LOGGING
# =========================

ENABLE_LOGS = DEBUG

def log(message):
    if ENABLE_LOGS:
        print(f"[LOG] {message}")

def error_log(message):
    if ENABLE_LOGS:
        print(f"[ERROR] {message}")

# =========================
# 🧠 VALIDATION
# =========================

def validate_price(price):
    try:
        price = float(price)
        return MIN_PRICE <= price <= MAX_PRICE
    except:
        return False

def validate_percentage(pct):
    try:
        pct = float(pct)
        return MIN_PERCENTAGE <= pct <= MAX_PERCENTAGE
    except:
        return False

def validate_mode(mode):
    return mode in ["manual", "auto"]

def validate_interval(interval):
    try:
        interval = int(interval)
        return MIN_INTERVAL <= interval <= MAX_INTERVAL
    except:
        return False