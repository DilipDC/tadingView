# ================= MAIN ENGINE =================

import time
from config import ENGINE_INTERVAL, log
from database.models import get_all_stocks, update_price
from engine.manual_engine import manual_update
from engine.auto_engine import auto_update


# ================= TIME CHECK =================

def should_update(stock):
    now = int(time.time())
    last = stock["last_update"]
    interval = stock["interval"] * 60  # minutes → seconds

    return (now - last) >= interval


# ================= PROCESS =================

def process_stock(stock):
    """
    Decide which mode to apply
    """

    if not should_update(stock):
        return None

    if stock["mode"] == "manual":
        return manual_update(stock)

    elif stock["mode"] == "auto":
        return auto_update(stock)

    return None


# ================= ENGINE LOOP =================

def run_engine():
    """
    Main engine loop
    Runs continuously
    """

    log("Engine started")

    while True:
        try:
            stocks = get_all_stocks()

            for stock in stocks:
                new_price = process_stock(stock)

                if new_price:
                    update_price(stock["id"], new_price)
                    log(f"Updated {stock['name']} → {round(new_price, 2)}")

        except Exception as e:
            log(f"Engine error: {e}")

        time.sleep(ENGINE_INTERVAL)