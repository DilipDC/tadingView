# ================= STOCK ROUTES =================

from flask import Blueprint, request, jsonify, session

from config import (
    DEFAULT_MODE,
    DEFAULT_DIRECTION,
    DEFAULT_PERCENTAGE,
    DEFAULT_INTERVAL,
    DEFAULT_USERS_UP,
    DEFAULT_USERS_DOWN,
    validate_price,
    validate_mode,
    validate_percentage,
    validate_interval,
    log
)

from database.models import (
    get_all_stocks,
    create_stock,
    update_stock,
    delete_stock,
    reset_price
)

stock_bp = Blueprint("stocks", __name__)


# ================= ADMIN CHECK =================

def is_admin():
    return session.get("admin") is True


def unauthorized():
    return jsonify({"success": False, "error": "Unauthorized"}), 403


# ================= GET ALL =================

@stock_bp.route("/api/stocks", methods=["GET"])
def get_stocks():
    try:
        data = get_all_stocks()
        return jsonify({"success": True, "data": data})
    except Exception as e:
        log(f"Error fetching stocks: {e}")
        return jsonify({"success": False, "error": "Server error"}), 500


# ================= ADD =================

@stock_bp.route("/api/add", methods=["POST"])
def add_stock():
    if not is_admin():
        return unauthorized()

    data = request.json or {}

    name = data.get("name", "").strip()
    price = data.get("price", 100)

    if not name:
        return jsonify({"success": False, "error": "Name required"})

    if not validate_price(price):
        return jsonify({"success": False, "error": "Invalid price"})

    try:
        create_stock({
            "name": name,
            "price": float(price),
            "mode": DEFAULT_MODE,
            "direction": DEFAULT_DIRECTION,
            "percentage": DEFAULT_PERCENTAGE,
            "interval": DEFAULT_INTERVAL,
            "users_up": DEFAULT_USERS_UP,
            "users_down": DEFAULT_USERS_DOWN
        })

        log(f"Stock added: {name}")

        return jsonify({"success": True})

    except Exception as e:
        log(f"Error adding stock: {e}")
        return jsonify({"success": False, "error": "Server error"}), 500


# ================= UPDATE =================

@stock_bp.route("/api/update/<int:stock_id>", methods=["POST"])
def update(stock_id):
    if not is_admin():
        return unauthorized()

    data = request.json or {}

    mode = data.get("mode")
    percentage = data.get("percentage", 1)
    interval = data.get("interval", 1)

    if not validate_mode(mode):
        return jsonify({"success": False, "error": "Invalid mode"})

    if not validate_percentage(percentage):
        return jsonify({"success": False, "error": "Invalid percentage"})

    if not validate_interval(interval):
        return jsonify({"success": False, "error": "Invalid interval"})

    try:
        update_stock(stock_id, {
            "mode": mode,
            "direction": data.get("direction", DEFAULT_DIRECTION),
            "percentage": float(percentage),
            "interval": int(interval),
            "users_up": int(data.get("users_up", 0)),
            "users_down": int(data.get("users_down", 0))
        })

        log(f"Stock updated: {stock_id}")

        return jsonify({"success": True})

    except Exception as e:
        log(f"Error updating stock: {e}")
        return jsonify({"success": False, "error": "Server error"}), 500


# ================= DELETE =================

@stock_bp.route("/api/delete/<int:stock_id>", methods=["DELETE"])
def delete(stock_id):
    if not is_admin():
        return unauthorized()

    try:
        delete_stock(stock_id)
        log(f"Stock deleted: {stock_id}")
        return jsonify({"success": True})
    except Exception as e:
        log(f"Error deleting stock: {e}")
        return jsonify({"success": False, "error": "Server error"}), 500


# ================= RESET =================

@stock_bp.route("/api/reset/<int:stock_id>", methods=["POST"])
def reset(stock_id):
    if not is_admin():
        return unauthorized()

    data = request.json or {}
    price = data.get("price")

    if not validate_price(price):
        return jsonify({"success": False, "error": "Invalid price"})

    try:
        reset_price(stock_id, float(price))
        log(f"Stock reset: {stock_id}")
        return jsonify({"success": True})
    except Exception as e:
        log(f"Error resetting stock: {e}")
        return jsonify({"success": False, "error": "Server error"}), 500