# # yolov8_person_object.py
# from flask import Flask, Response
# import cv2
# from ultralytics import YOLO

# app = Flask(__name__)

# # Load YOLO model (replace with your model path if needed)
# model = YOLO('yolo12l.pt')

# # Open webcam
# cap = cv2.VideoCapture(0)

# def generate_frames():
#     while True:
#         success, frame = cap.read()
#         if not success:
#             break

#         results = model(frame)[0]

#         # Loop over detections
#         for box, cls, conf in zip(results.boxes.xyxy, results.boxes.cls, results.boxes.conf):
#             x1, y1, x2, y2 = map(int, box)
#             # Assign label: person or object
#             label = "person" if model.names[int(cls)] == "person" else "object"
#             color = (0, 0, 255) if label == "person" else (0, 255, 0)
#             cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
#             cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1-10),
#                         cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

#         # Encode frame to JPEG
#         ret, buffer = cv2.imencode('.jpg', frame)
#         frame_bytes = buffer.tobytes()
#         yield (b'--frame\r\n'
#                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

# @app.route('/video_feed')
# def video_feed():
#     return Response(generate_frames(),
#                     mimetype='multipart/x-mixed-replace; boundary=frame')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)

from flask import Flask, Response
from flask_cors import CORS
import cv2
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)  # Allow React to fetch video feed

# Load YOLO model
model = YOLO('yolo12l.pt')  # Replace with your model path if needed

# Start webcam
cap = cv2.VideoCapture(0)

def generate_frames():
    while True:
        success, frame = cap.read()
        if not success:
            break

        results = model(frame)[0]

        # Loop over detections
        for box, cls, conf in zip(results.boxes.xyxy, results.boxes.cls, results.boxes.conf):
            x1, y1, x2, y2 = map(int, box)
            # Two classes: person or object
            label = "person" if model.names[int(cls)] == "person" else "object"
            color = (0, 255, 0) if label == "person" else (0, 0, 255)
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
            cv2.putText(frame, f"{label} {conf:.2f}", (x1, y1-10),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        # Encode frame to JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return "YOLO Live Feed Running"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
