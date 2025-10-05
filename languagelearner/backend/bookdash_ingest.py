import os
import pytesseract
import json
from PIL import Image
import shutil

# -------------------------------
# CONFIG
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FOLDER = os.path.join(BASE_DIR, "books_input")
OUTPUT_FOLDER = os.path.join(BASE_DIR, "../public/books")

# Set tesseract executable if not in PATH
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# -------------------------------
# PROCESS ALL BOOKS
# -------------------------------
for book_name in os.listdir(INPUT_FOLDER):
    book_folder = os.path.join(INPUT_FOLDER, book_name)
    images_folder = os.path.join(book_folder, "images")

    if not os.path.isdir(images_folder):
        print(f"No 'images' folder for book '{book_name}', skipping.")
        continue

    book_output_path = os.path.join(OUTPUT_FOLDER, book_name)
    os.makedirs(book_output_path, exist_ok=True)

    print(f"Processing book: {book_name}")

    book_data = []

    # Sort images alphabetically
    image_files = sorted([
        f for f in os.listdir(images_folder)
        if f.lower().endswith((".png", ".jpg", ".jpeg"))
    ])

    if not image_files:
        print(f"No images found in {images_folder}, skipping.")
        continue

    for img_file in image_files:
        img_path = os.path.join(images_folder, img_file)

        # OCR text from PDF or skip if already in PDF
        text = pytesseract.image_to_string(Image.open(img_path))

        # Copy image to public folder
        dest_path = os.path.join(book_output_path, img_file)
        shutil.copy(img_path, dest_path)

        book_data.append({
            "image": f"{book_name}/{img_file}",
            "text": text.strip()
        })

    # Save JSON
    json_path = os.path.join(book_output_path, "book.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"pages": book_data}, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(book_data)} pages for '{book_name}' in public/books/{book_name}\n")

print("All books processed successfully!")
