# 🚁 Relief Wing
## AI-Powered Disaster Response Platform

Relief Wing is a **technology-driven disaster response system** designed to assist rescue teams during floods and natural disasters. The platform combines **computer vision, drones, IoT, and a web-based coordination system** to detect stranded humans and animals, identify obstacles, and enable rapid delivery of essential supplies such as **food, water, and medicines**.

The project aims to improve **situational awareness and response efficiency** during disaster scenarios by leveraging **real-time AI detection and a centralized monitoring dashboard**.

---

# 🌍 Project Vision

Natural disasters often leave people stranded in inaccessible areas where traditional rescue operations struggle to reach quickly. Relief Wing proposes a **drone-assisted AI system** capable of:

- Detecting **humans and animals** using computer vision  
- Identifying **obstacles for safe drone navigation**  
- Allowing victims to send **SOS signals for emergency assistance**  
- Enabling rescue teams to **monitor disaster zones via a centralized dashboard**  
- Coordinating **delivery of relief supplies**

This platform demonstrates how **AI and robotics can support humanitarian operations** and improve disaster management.

---

# ⚙️ Key Features

## 🤖 AI-Based Detection
Uses a **YOLO (You Only Look Once) computer vision model** to detect humans and objects from drone imagery.

## 🚁 Drone-Assisted Monitoring
Supports **drone camera feeds** for monitoring disaster zones and locating stranded individuals.

## 🧭 Obstacle Awareness
Uses **computer vision (and can integrate LiDAR sensors)** to detect obstacles for safer drone navigation.

## 🆘 SOS Emergency System
Allows people trapped during disasters to send **SOS requests for essential supplies such as food, water, and medicine.**

## 💻 Web-Based Dashboard
Provides a **user interface and admin panel** for monitoring incidents, viewing detections, and coordinating relief operations.

---

# 🛠 Tech Stack

## Artificial Intelligence
- YOLO Object Detection  
- Python  
- OpenCV  
- Ultralytics  

## Web Development
**MERN Stack**

- MongoDB  
- Express.js  
- React.js  
- Node.js  

## Other Technologies
- Drone Imaging  
- IoT Communication  
- Flask API  
- Computer Vision  

---

# 🏗 Project Architecture
Drone Camera Feed
↓
YOLO Detection Model (Python API)
↓
Backend Server
↓
MongoDB Database
↓
React Frontend Dashboard


---

# 🚀 How to Run the Project

Follow the steps below to run the project locally.

---

## 1️⃣ Download the Project

Clone the repository:
git clone https://github.com/jaskirats01/relief-wing.git

Or download the ZIP file and extract it.

---

## 2️⃣ Run the Backend (YOLO Detection API)

Navigate to the API folder.
cd api

Run the Python backend server.
python main.py
This will start the **YOLO detection model and backend API**.

---

## 3️⃣ Open the Video Feed

Open the following link in your browser:
http://127.0.0.1:5000/video_feed
This will show the **YOLO detection video stream**.

---

## 4️⃣ Start the Frontend

Navigate to the frontend folder and start the development server.
npm run dev
This will start the **React frontend dashboard**.

---

## 5️⃣ Access the Platform

Once both backend and frontend are running:

- The **AI detection model will process camera input**
- The **dashboard will display the system interface**
- The platform will be ready for **testing and development**

---

# 🔮 Future Improvements

- Real-time **drone camera integration**
- **LiDAR sensor fusion** for improved obstacle detection
- **Automated drone navigation** for supply delivery
- **Cloud deployment** for large-scale disaster monitoring
- **Mobile SOS application** for victims

---

# 🏆 Achievement

Relief Wing secured **4th place in a State-Level Business Pitching Competition**, demonstrating the potential of **AI-assisted disaster response technology**.

---

# ⚠️ Disclaimer

This project is a **prototype and research implementation** intended for **demonstration and educational purposes**.
