# 🚀 Quick Start Commands

## Installation (Already Done ✅)
```bash
npm install onnxruntime-web @mediapipe/hands @mediapipe/camera_utils
```

## Verify Integration
```bash
node verify-integration.js
```

## Start Development Server
```bash
npm run dev
```

## Build for Production
```bash
npm run build
```

## Preview Production Build
```bash
npm run preview
```

## Lint Code
```bash
npm run lint
```

---

## 📝 Quick Notes

### Model Location
- **Path**: `public/isl_model.onnx`
- **Size**: 6.56 MB
- **Input**: Float32Array[42] (21 landmarks × 2 coordinates)
- **Output**: 42 class probabilities

### Access Translator
1. Start dev server: `npm run dev`
2. Open: `http://localhost:5173/translate`
3. Click green Play button
4. Show ISL gestures to camera

### Key Files Modified
- ✅ `src/pages/Translator.tsx` - Main component
- ✅ `src/types/mediapipe.d.ts` - Type definitions
- ✅ `public/isl_model.onnx` - ONNX model

### Dependencies Added
- `onnxruntime-web` - ONNX inference
- `@mediapipe/hands` - Hand tracking
- `@mediapipe/camera_utils` - Camera utilities

---

## 🎯 Testing Checklist

- [ ] Run `node verify-integration.js` - Should pass all checks
- [ ] Start dev server with `npm run dev`
- [ ] Navigate to `/translate` route
- [ ] Wait for "Model loaded - Ready to start"
- [ ] Click Play button
- [ ] Grant camera permissions
- [ ] Show hand gestures
- [ ] Verify predictions appear in real-time
- [ ] Check FPS (~30), latency (~50-150ms)
- [ ] Test confidence scores
- [ ] Verify hand landmarks are drawn
- [ ] Click Pause to stop session

---

## 📚 Documentation

- **Complete Guide**: `INTEGRATION_COMPLETE.md`
- **Technical Details**: `ISL_MODEL_INTEGRATION.md`
- **Project README**: `README.md`

---

**Status**: ✅ Ready to Run  
**Last Updated**: January 31, 2026
