# =========================================
# 🚀 FINAL BACKEND CORE (PRODUCTION READY)
# =========================================

from flask import Flask
from flask_cors import CORS
import threading
import os

# CONFIG
from config import HOST, PORT, DEBUG, SECRET_KEY, log

# DATABASE
from database.models import init_tables

# ROUTES
from routes.auth_routes import auth_bp
from routes.stock_routes import stock_bp

# ENGINE
from engine.engine import run_engine


# ================= APP =================

app = Flask(__name__)
app.secret_key = SECRET_KEY

# 🔥 FIX 1: CORS (VERY IMPORTANT)
CORS(app, supports_credentials=True)

# 🔥 FIX 2: SESSION (RENDER HTTPS SUPPORT)
app.config.update(
    SESSION_COOKIE_SAMESITE="None",
    SESSION_COOKIE_SECURE=True
)

# ================= ROUTES =================

app.register_blueprint(auth_bp)
app.register_blueprint(stock_bp)


# ================= ENGINE THREAD =================

engine_started = False

def start_engine_once():
    global engine_started

    if not engine_started:
        log("Starting engine thread...")
        thread = threading.Thread(target=run_engine, daemon=True)
        thread.start()
        engine_started = True


# ================= HEALTH =================

@app.route("/")
def home():
    return {
        "status": "running",
        "service": "Trading Backend"
    }


@app.route("/api/health")
def health():
    return {"status": "ok"}


# ================= STARTUP =================

def startup():
    log("Initializing database...")
    init_tables()

    log("Starting engine...")
    start_engine_once()

    log("System ready 🚀")


# 🔥 IMPORTANT: RUN STARTUP FOR GUNICORN (RENDER)
startup()


# ================= MAIN =================

if __name__ == "__main__":

    # Prevent duplicate engine in debug mode
    if not DEBUG or os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        startup()

    print("=================================")
    print("🚀 SERVER RUNNING")
    print(f"🌐 URL: http://{HOST}:{PORT}")
    print("🔐 Admin: admin / (env password)")
    print("=================================")

    app.run(
        host=HOST,
        port=PORT,
        debug=DEBUG
    )