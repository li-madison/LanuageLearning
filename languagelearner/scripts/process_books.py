import os
import pytesseract
import json
from PIL import Image
import shutil

# -------------------------------
# CONFIG
# -------------------------------
INPUT_FOLDER = "books_input"       # folder containing raw book folders
OUTPUT_FOLDER = "../public/books"  # Next.js public folder

# Path to Tesseract (update if needed)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Make sure output folder exists
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# -------------------------------
# PROCESS ALL BOOKS
# -------------------------------
for book_name in os.listdir(INPUT_FOLDER):
    book_input_path = os.path.join(INPUT_FOLDER, book_name)
    if not os.path.isdir(book_input_path):
        continue

    # Create output folder for this book
    book_output_path = os.path.join(OUTPUT_FOLDER, book_name)
    os.makedirs(book_output_path, exist_ok=True)

    print(f"Processing book: {book_name}")

    book_data = []

    # Sort images alphabetically to maintain page order
    image_files = sorted([
        f for f in os.listdir(book_input_path)
        if f.lower().endswith((".png", ".jpg", ".jpeg"))
    ])

    if not image_files:
        print(f"No images found for {book_name}, skipping.")
        continue

    for img_file in image_files:
        img_path = os.path.join(book_input_path, img_file)

        # OCR text
        text = pytesseract.image_to_string(Image.open(img_path))

        # Copy image to public folder
        dest_path = os.path.join(book_output_path, img_file)
        shutil.copy(img_path, dest_path)

        book_data.append({
            "image": img_file,  # just the filename
            "text": text.strip()
        })

    # Save JSON file
    json_path = os.path.join(book_output_path, "book.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"pages": book_data}, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(book_data)} pages for '{book_name}' in {book_output_path}\n")

print("All books processed successfully!")
