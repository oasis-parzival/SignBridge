# ISL ONNX Model Integration Guide

## Overview
This document explains the integration of the custom-trained Indian Sign Language (ISL) ONNX model into the Vite/React application.

## Model Details
- **File**: `public/isl_model.onnx` (6.5 MB)
- **Input Shape**: `[1, 42]` (21 hand landmarks × 2 coordinates: x, y)
- **Output**: Probability distribution over 42 ISL gesture classes
- **Framework**: ONNX Runtime Web

## Data Preprocessing

### Critical Math: Landmark Normalization
For each video frame, the model expects normalized hand landmark data:

1. **Extract Coordinates**: Get x and y from all 21 MediaPipe hand landmarks
2. **Calculate Minimums**: Find `min_x` and `min_y` for the current frame
3. **Normalize**: Subtract minimums from each coordinate:
   ```
   normalized_x_i = x_i - min_x
   normalized_y_i = y_i - min_y
   ```
4. **Flatten**: Convert to Float32Array of length 42: `[x₀, y₀, x₁, y₁, ..., x₂₀, y₂₀]`

### Implementation
```typescript
const processLandmarks = (landmarks: any[]): Float32Array => {
    // Extract x and y coordinates
    const coords = landmarks.map(lm => ({ x: lm.x, y: lm.y }));
    
    // Calculate min_x and min_y
    const minX = Math.min(...coords.map(c => c.x));
    const minY = Math.min(...coords.map(c => c.y));
    
    // Normalize: subtract minimums and flatten
    const normalized: number[] = [];
    for (const coord of coords) {
        normalized.push(coord.x - minX);
        normalized.push(coord.y - minY);
    }
    
    return new Float32Array(normalized);
};
```

## Dependencies Installed
```bash
npm install onnxruntime-web @mediapipe/hands @mediapipe/camera_utils
```

### Package Versions
- **onnxruntime-web**: ONNX Runtime for browser-based inference
- **@mediapipe/hands**: Google MediaPipe Hands for hand landmark detection
- **@mediapipe/camera_utils**: Camera utilities for MediaPipe

## Architecture

### Component Flow
```
User clicks Start
    ↓
Load ONNX Model (once)
    ↓
Initialize MediaPipe Hands
    ↓
Start Camera (1280×720)
    ↓
Process frames at ~30 FPS:
    1. Capture video frame
    2. MediaPipe detects 21 hand landmarks
    3. Normalize landmarks (min-subtraction)
    4. Run ONNX inference
    5. Get prediction + confidence
    6. Update UI
    ↓
Display results in real-time
```

### Key Features Implemented

#### 1. **Model Loading**
- ONNX model loads on component mount
- Camera starts only after model is ready
- Uses WebAssembly execution provider for performance

#### 2. **Real-time Processing**
- 30 FPS hand tracking
- Live landmark visualization on canvas
- Inference latency tracking (~50-150ms typical)

#### 3. **UI Updates**
- Large, clear prediction display
- Confidence score visualization
- FPS and latency metrics
- Conversation history with auto-transcript

#### 4. **Hand Visualization**
- Green landmarks and connections drawn on canvas
- 21 hand keypoints tracked
- Palm and finger connections rendered

## ISL Gesture Classes (42 Total)
The model recognizes the following gestures:
```typescript
const ISL_CLASSES = [
    'Hello', 'Thank you', 'Please', 'Help', 'Yes', 'No', 
    'Good morning', 'How are you', 'Sorry', 'Welcome',
    'Goodbye', 'I', 'You', 'We', 'They', 'What', 'When', 
    'Where', 'Why', 'How', 'Good', 'Bad', 'Happy', 'Sad',
    'Eat', 'Drink', 'Sleep', 'Work', 'Study', 'Play',
    'Family', 'Friend', 'Mother', 'Father', 'Brother', 'Sister',
    'Love', 'Like', 'Want', 'Need', 'Have', 'Go'
];
```
**Note**: Update this array to match your actual trained classes.

## Performance Optimizations

### 1. **Efficient Inference**
- Single hand tracking (maxNumHands: 1)
- Model complexity: 1 (balanced)
- Confidence thresholds: 0.5 (detection), 0.5 (tracking)

### 2. **Canvas Rendering**
- Direct canvas manipulation for hand landmarks
- No unnecessary re-renders
- Optimized drawing with requestAnimationFrame

### 3. **Memory Management**
- Proper cleanup on component unmount
- Camera stream stopped when session ends
- MediaPipe resources released

## Usage

### Starting a Session
1. Click the green **Play** button
2. Wait for "Position hands in frame" message
3. Show ISL gestures to the camera
4. View real-time predictions in the right panel

### Stopping a Session
1. Click the red **Pause** button
2. Camera and processing stop immediately
3. All resources are cleaned up

## Troubleshooting

### Model Not Loading
- Check browser console for errors
- Ensure `public/isl_model.onnx` exists
- Verify file is not corrupted (should be ~6.5 MB)

### Camera Not Starting
- Grant camera permissions in browser
- Check if camera is already in use
- Try refreshing the page

### Low Accuracy
- Ensure good lighting conditions
- Position hand clearly in frame
- Check if gestures match training data
- Verify confidence threshold (default: 0.5)

### Performance Issues
- Close other browser tabs
- Check CPU usage
- Consider reducing video resolution
- Ensure WebAssembly is enabled

## Technical Notes

### MediaPipe Hand Landmarks (21 points)
```
0: Wrist
1-4: Thumb (CMC, MCP, IP, Tip)
5-8: Index finger (MCP, PIP, DIP, Tip)
9-12: Middle finger (MCP, PIP, DIP, Tip)
13-16: Ring finger (MCP, PIP, DIP, Tip)
17-20: Pinky (MCP, PIP, DIP, Tip)
```

### ONNX Inference Pipeline
```typescript
1. Create Float32Array[42] from normalized landmarks
2. Create ONNX Tensor with shape [1, 42]
3. Run session.run() with input tensor
4. Extract output probabilities
5. Apply softmax for confidence scores
6. Return argmax as prediction
```

## Future Enhancements
- [ ] Add support for two-handed gestures
- [ ] Implement gesture sequence recognition
- [ ] Add custom gesture training interface
- [ ] Optimize for mobile devices
- [ ] Add offline mode support
- [ ] Implement gesture smoothing/filtering

## Credits
- **ONNX Runtime**: Microsoft
- **MediaPipe**: Google
- **Model Training**: Custom ISL dataset

---

**Last Updated**: January 31, 2026
**Version**: 1.0.0
