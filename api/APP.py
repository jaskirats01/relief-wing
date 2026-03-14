import cv2
from ultralytics import YOLO
import os

print("✅ Script started")

model_path = 'yolo12l.pt'
if not os.path.exists(model_path):
    print(f"❌ Model not found: {model_path}")
    exit()

model = YOLO(model_path)
print("✅ Model loaded")

IMAGE_FOLDER = "images"
OUTPUT_FOLDER = "output"
filename = "test2.jpg"

input_path = os.path.join(IMAGE_FOLDER, filename)
output_path = os.path.join(OUTPUT_FOLDER, filename)

print(f"🔍 Looking for: {input_path}")

if not os.path.exists(input_path):
    print(f"❌ Error: '{filename}' not found in '{IMAGE_FOLDER}/'")
    exit()

os.makedirs(OUTPUT_FOLDER, exist_ok=True)

img = cv2.imread(input_path)
if img is None:
    print("❌ Error loading the image.")
    exit()

print("✅ Image loaded, running detection...")

results = model(img)[0]

for box, cls, conf in zip(results.boxes.xyxy, results.boxes.cls, results.boxes.conf):
    x1, y1, x2, y2 = map(int, box)
    label = "person" if model.names[int(cls)] == "person" else "object"
    color = (0, 255, 0) if label == "person" else (0, 0, 255)
    cv2.rectangle(img, (x1, y1), (x2, y2), color, 2)
    cv2.putText(img, f"{label} {conf:.2f}", (x1, y1 - 10),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

cv2.imwrite(output_path, img)
print(f"✅ Detection complete! Output saved to: {output_path}")
