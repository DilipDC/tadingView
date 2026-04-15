# ================= AUTO ENGINE =================

from config import AUTO_UP_MULTIPLIER, AUTO_DOWN_MULTIPLIER

def auto_update(stock):
    """
    Auto mode:
    - users_up vs users_down
    - opposite movement logic (trap system)
    """

    price = stock["price"]
    up = stock["users_up"]
    down = stock["users_down"]

    # Avoid division issues
    if up < 0: up = 0
    if down < 0: down = 0

    # Decision logic
    if up > down:
        # Majority UP → go DOWN
        new_price = price * AUTO_DOWN_MULTIPLIER
    else:
        # Majority DOWN → go UP
        new_price = price * AUTO_UP_MULTIPLIER

    return new_price