import os
import pytesseract
import json
from PIL import Image
import shutil

# -------------------------------
# CONFIG
# -------------------------------
INPUT_FOLDER = "books_input"       # your raw book images folders
OUTPUT_FOLDER = "../public/books"  # inside Next.js public folder

# Set tesseract executable if needed
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# -------------------------------
# PROCESS ALL BOOKS
# -------------------------------
for book_name in os.listdir(INPUT_FOLDER):
    book_input_path = os.path.join(INPUT_FOLDER, book_name)
    images_folder = os.path.join(book_input_path, "images")  # LOOK INSIDE images/

    if not os.path.isdir(images_folder):
        print(f"No images folder found for '{book_name}', skipping.")
        continue

    book_output_path = os.path.join(OUTPUT_FOLDER, book_name)
    os.makedirs(book_output_path, exist_ok=True)

    print(f"Processing book: {book_name}")

    book_data = []

    # Sort images alphabetically to maintain page order
    image_files = sorted([
        f for f in os.listdir(images_folder)
        if f.lower().endswith((".png", ".jpg", ".jpeg"))
    ])

    if not image_files:
        print(f"No images found in {images_folder}, skipping.")
        continue

    for img_file in image_files:
        img_path = os.path.join(images_folder, img_file)

        # OCR text
        text = pytesseract.image_to_string(Image.open(img_path))

        # Copy image to public folder
        dest_path = os.path.join(book_output_path, img_file)
        shutil.copy(img_path, dest_path)

        # Save only filename (frontend prepends book folder)
        book_data.append({
            "image": img_file,
            "text": text.strip()
        })

    # Save JSON
    json_path = os.path.join(book_output_path, "book.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"pages": book_data}, f, ensure_ascii=False, indent=2)

    print(f"Saved {len(book_data)} pages for '{book_name}' in public/books/{book_name}\n")

print("All books processed successfully!")
