from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

BOOKS_TEXT_DIR = r"C:\Users\forst\LanuageLearning\backend\books\output_texts"

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# List available books
@app.get("/books")
def list_books():
    books = [f for f in os.listdir(BOOKS_TEXT_DIR) if f.endswith(".txt")]
    return {"books": books}

# Get book content
@app.get("/books/{book_name}")
def get_book_text(book_name: str):
    path = os.path.join(BOOKS_TEXT_DIR, book_name)
    if not os.path.exists(path):
        return {"error": "Book not found"}
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    return {"text": text}
