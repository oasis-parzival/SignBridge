# 🌉 SignBridge - Breaking Barriers with AI

![Status](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Privacy](https://img.shields.io/badge/Privacy-100%25%20Client--Side-brightgreen)

**SignBridge** is a powerful, real-time Indian Sign Language (ISL) translator that runs entirely in your browser. By leveraging advanced computer vision and machine learning (ONNX Runtime + MediaPipe), it bridges the communication gap between the Deaf community and the rest of the world—without needing server-side processing.

## 🚀 Key Features

- **👉 Real-Time ISL Translation**: Instantly converts ISL gestures into text using a lightweight, locally optimized ONNX model.
- **🗣️ Text-to-Speech**: Type your message and have it spoken aloud.
- **🌐 Multilingual Support**: Accessible detailed UI in **English, Hindi (हिंदी), Marathi (मराठी), and Gujarati (ગુજરાતી)**.
- **🔒 Privacy First**: All inference happens on your device. No video data is ever sent to a server.
- **⚡ High Performance**: Powered by **WebAssembly (WASM)** and SIMD instructions for smooth performance on standard devices.
- **🤖 AI Assistant**: Integrated chatbot powered by DeepSeek-V3 for getting help with the platform.

## 🛠️ Tech Stack

- **Frontend**: React + Vite (Fast & lightweight)
- **Styling**: TailwindCSS + Framer Motion (Beautiful & responsive animations)
- **AI/ML Engine**:
  - **MediaPipe Hands**: For skeletal hand tracking.
  - **ONNX Runtime Web**: For running the custom ISL classification model.
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/SignBridge.git](https://github.com/your-username/SignBridge.git)
   cd SignBridge
