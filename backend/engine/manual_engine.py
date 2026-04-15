# ================= MANUAL ENGINE =================

from config import validate_percentage

def manual_update(stock):
    """
    Manual mode:
    - direction: up/down
    - percentage
    - interval (handled outside)
    """

    price = stock["price"]
    direction = stock["direction"]
    percentage = stock["percentage"]

    # Safety check
    if not validate_percentage(percentage):
        percentage = 1

    change = percentage / 100

    if direction == "up":
        new_price = price * (1 + change)
    else:
        new_price = price * (1 - change)

    return new_price