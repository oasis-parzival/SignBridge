# 🌉 SignBridge - Breaking Barriers with AI

![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen)

**SignBridge** is a powerful, real-time Indian Sign Language (ISL) translator that runs entirely in your browser. By leveraging advanced computer vision and machine learning (ONNX Runtime + MediaPipe), it bridges the communication gap between the Deaf community and the rest of the world—without needing server-side processing.

---

## 🚀 Key Features

- **👉 Real-Time ISL Translation**: Instantly converts ISL gestures into text using a lightweight, locally optimized ONNX model.
- **🗣️ Text-to-Speech**: Type your message and have it spoken aloud for seamless two-way communication.
- **🌐 Multilingual Support**: Accessible detailed UI in **English, Hindi (हिंदी), Marathi (मराठी), and Gujarati (ગુજરાતી)**.
- **🔒 Privacy First**: All inference happens on your device. No video data is ever sent to a server.
- **⚡ High Performance**: Powered by **WebAssembly (WASM)** and SIMD instructions for smooth performance on standard devices.
- **🤖 AI Assistant**: Integrated chatbot powered by DeepSeek-V3 for getting help with the platform.

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite (Fast & lightweight)
- **Styling**: TailwindCSS + Framer Motion (Beautiful & responsive animations)
- **AI/ML Engine**:
  - **MediaPipe Hands**: For skeletal hand tracking.
  - **ONNX Runtime Web**: For running the custom ISL classification model.
- **Icons**: Lucide React

---

## 🧠 How It Works

The translation pipeline operates in four distinct stages to ensure high-speed, client-side performance:

1.  **Detection**: MediaPipe identifies and tracks **21 skeletal landmarks** on each hand within the video stream.
2.  **Preprocessing**: Landmark coordinates are **normalized** relative to the wrist. This mathematical adjustment ensures the model remains accurate regardless of the user's distance from the camera or their hand's position on the screen.
3.  **Inference**: The processed tensor is fed into a **quantized Random Forest model** (via ONNX Runtime), which classifies the input into one of **42 unique ISL signs**.
4.  **Result**: The predicted sign is rendered instantly on the UI, accompanied by a real-time **confidence score**.

---

## 📝 Supported Signs (42 Total)

The model is currently optimized to recognize the following categories of Indian Sign Language:

| Category | Supported Signs |
| :--- | :--- |
| **Alphabets** | A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z |
| **Numbers** | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 |
| **Common Phrases** | Hello, Thank You, Please, Sorry, Yes, No |

---

## 🔧 Troubleshooting

* **Camera Not Loading**: Ensure no other application (e.g., Zoom, Teams, or Discord) is currently accessing the webcam. Refresh the page after closing competing apps.
* **Low FPS / Performance Lag**: SignBridge utilizes **WASM** for heavy computation. For the best experience, use a Chromium-based browser (Chrome, Edge, or Brave) and verify that **"Hardware Acceleration"** is enabled in your browser settings.
* **Model Accuracy**: For optimal translation, ensure your environment is well-lit and both hands are fully visible within the camera frame without significant motion blur.

---

---

<div align="center">

### Made with 💖 by **Atharva**

![Glow](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)

*Bridging communication gaps, one sign at a time.*

</div>
