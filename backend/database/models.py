# ================= DATABASE MODELS =================

import sqlite3
import time

from config import DB_PATH, log

# ================= CONNECTION =================

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ================= INIT =================

def init_tables():
    conn = get_connection()

    conn.execute("""
    CREATE TABLE IF NOT EXISTS stocks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        mode TEXT,
        direction TEXT,
        percentage REAL,
        interval INTEGER,
        users_up INTEGER,
        users_down INTEGER,
        last_update INTEGER
    )
    """)

    conn.commit()
    conn.close()

    log("Database initialized")


# ================= GET =================

def get_all_stocks():
    conn = get_connection()

    rows = conn.execute("SELECT * FROM stocks").fetchall()

    conn.close()

    return [dict(row) for row in rows]


# ================= CREATE =================

def create_stock(data):
    conn = get_connection()

    conn.execute("""
    INSERT INTO stocks (
        name, price, mode, direction,
        percentage, interval,
        users_up, users_down,
        last_update
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("name"),
        data.get("price", 100),
        data.get("mode"),
        data.get("direction"),
        data.get("percentage"),
        data.get("interval"),
        data.get("users_up"),
        data.get("users_down"),
        int(time.time())
    ))

    conn.commit()
    conn.close()


# ================= UPDATE =================

def update_stock(stock_id, data):
    conn = get_connection()

    conn.execute("""
    UPDATE stocks
    SET mode=?,
        direction=?,
        percentage=?,
        interval=?,
        users_up=?,
        users_down=?,
        last_update=?
    WHERE id=?
    """, (
        data.get("mode"),
        data.get("direction"),
        data.get("percentage"),
        data.get("interval"),
        data.get("users_up"),
        data.get("users_down"),
        int(time.time()),
        stock_id
    ))

    conn.commit()
    conn.close()


# ================= DELETE =================

def delete_stock(stock_id):
    conn = get_connection()

    conn.execute("DELETE FROM stocks WHERE id=?", (stock_id,))

    conn.commit()
    conn.close()


# ================= RESET PRICE =================

def reset_price(stock_id, price):
    conn = get_connection()

    conn.execute("""
    UPDATE stocks
    SET price=?,
        last_update=?
    WHERE id=?
    """, (
        price,
        int(time.time()),
        stock_id
    ))

    conn.commit()
    conn.close()


# ================= UPDATE PRICE =================

def update_price(stock_id, new_price):
    conn = get_connection()

    conn.execute("""
    UPDATE stocks
    SET price=?,
        last_update=?
    WHERE id=?
    """, (
        new_price,
        int(time.time()),
        stock_id
    ))

    conn.commit()
    conn.close()