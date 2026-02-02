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
   git clone https://github.com/your-username/SignBridge.git
   cd SignBridge
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

## 🧠 How It Works

1. **Detection**: MediaPipe detects 21 landmarks on each hand in the video stream.
2. **Preprocessing**: Coordinates are normalized (relative to the wrist) to ensure the model understands gestures regardless of camera distance.
3. **Inference**: The normalized data is fed into a quantized Random Forest model (via ONNX) which predicts one of **42 ISL signs**.
4. **Result**: The prediction is displayed instantly with a confidence score.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Built with ❤️ for a more inclusive future.*
