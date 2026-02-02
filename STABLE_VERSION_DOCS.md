# 🏆 ISL Translator - Stable Version Documentation

**Date:** February 1, 2026
**Status:** ✅ Fully Functional / Production Ready
**Key Feature:** Real-time Indian Sign Language Translation using locally hosted ONNX Runtime.

---

## 🔧 Technical Configuration

### 1. ONNX Runtime WebAssembly (WASM)
We are using a **Local Hosting** strategy for WASM files to ensure stability, offline support, and prevent version mismatches.

- **Library Version:** `onnxruntime-web@1.20.0`
- **File Location:** `public/` (Root of dev server)
- **Key Files:**
  - `ort-wasm.wasm` (Standard)
  - `ort-wasm-simd.wasm` (SIMD Optimized)
- **Code Configuration (`Translator.tsx`):**
  ```typescript
  // USE LOCAL WASM FILES (Copied by vite-plugin-static-copy)
  ort.env.wasm.wasmPaths = '/';
  ort.env.wasm.simd = true;
  ```

### 2. Inference Logic (CRITICAL)
The model (Scikit-learn exported via `skl2onnx`) produces two outputs:
1.  **Label (Index 0)**: The predicted class string/int.
2.  **Probabilities (Index 1)**: A ZipMap of probabilities.

**🚨 The Fix for "Index 1 Error":**
ONNX Runtime Web does NOT support ZipMap outputs. trying to fetch them causing a crash.
We fixed this by **explicitly fetching ONLY the first output**:

```typescript
// Translator.tsx line 199
const outputKey = sessionRef.current.outputNames[0];

// Pass [outputKey] as second argument to strictly fetch ONLY the label
const results = await sessionRef.current.run(feeds, [outputKey]);
```

### 3. Class Mapping
The `ISL_CLASSES` array **MUST** be sorted alphabetically to match the folder structure used during training (`ImageFolder` behavior).

```typescript
const ISL_CLASSES = [
    'Bad', 'Brother', 'Drink', 'Eat', ... // Alphabetical Order
];
```

---

## 📂 Project Structure

- **`src/pages/Translator.tsx`**: Main logic (MediaPipe + ONNX).
- **`public/`**: HOSTS the model (`isl_model.onnx`) and WASM binaries.
- **`vite.config.ts`**: Uses `vite-plugin-static-copy` to move WASM files from node_modules to dist during build.

## 🚀 How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    # Ensures onnxruntime-web@1.20.0 is installed
    ```

2.  **Start Dev Server:**
    ```bash
    npm run dev
    ```

3.  **Usage:**
    - Allow Camera Access.
    - Wait for "Model loaded" (Green badge).
    - Press Play.
    - Show gestures!

---

**Do not modify `Translator.tsx` logic without understanding the zip-map constraint.**
