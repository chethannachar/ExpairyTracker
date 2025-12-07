from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, date

# ==========================================================
#  DATABASE CONFIG
# ==========================================================
DB_HOST = "localhost"
DB_NAME = "expiarydatabase"
DB_USER = "postgres"
DB_PASSWORD = "chethanachar03"
DB_PORT = "5432"


def get_db():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            port=DB_PORT,
            cursor_factory=RealDictCursor
        )
        return conn
    except Exception as e:
        print("DB ERROR:", e)
        raise e


# ==========================================================
#  INIT TABLE
# ==========================================================
def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            image_url TEXT,
            expiry_date DATE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    cur.close()
    conn.close()


init_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
#  MODELS
# ==========================================================
class ProductModel(BaseModel):
    name: str
    category: str
    image: str | None = None
    expiry_date: str  # YYYY-MM-DD (can be warranty date too)


# ==========================================================
#  HELPERS
# ==========================================================
def calculate_days_left(target_date: date):
    today = date.today()
    diff = (target_date - today).days
    return diff


# ==========================================================
#  ROUTES
# ==========================================================
@app.post("/add-product")
def add_product(data: ProductModel):
    try:
        conn = get_db()
        cur = conn.cursor()

        cur.execute("""
            INSERT INTO products (name, category, image_url, expiry_date)
            VALUES (%s, %s, %s, %s)
            RETURNING id;
        """, (data.name, data.category, data.image, data.expiry_date))

        new_id = cur.fetchone()["id"]
        conn.commit()

        cur.close()
        conn.close()

        return {"status": "success", "product_id": new_id}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/products")
def get_products():
    try:
        conn = get_db()
        cur = conn.cursor()

        cur.execute("SELECT * FROM products ORDER BY expiry_date ASC;")
        rows = cur.fetchall()

        products = []
        for r in rows:
            target_date = r["expiry_date"]
            dleft = calculate_days_left(target_date)

            products.append({
                "id": r["id"],
                "name": r["name"],
                "category": r["category"],
                "image": r["image_url"],
                "expiry_date": str(target_date),
                "daysLeft": dleft
            })

        cur.close()
        conn.close()

        return {"products": products}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/delete-product/{product_id}", status_code=200)
def delete_product(product_id: int):
    try:
        conn = get_db()
        cur = conn.cursor()

        # Run the delete query
        cur.execute("DELETE FROM products WHERE id = %s RETURNING id;", (product_id,))
        deleted_row = cur.fetchone()

        # If no row deleted → ID doesn't exist
        if deleted_row is None:
            cur.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Product not found")

        conn.commit()
        cur.close()
        conn.close()

        return {"status": "success", "message": "Product deleted successfully"}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting product: {str(e)}"
        )


@app.get("/")
def home():
    return {"message": "FastAPI + PostgreSQL Server Running"}
