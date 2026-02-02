# 🔍 Debug: Model Execution Failed

## Current Status
UI shows: **"Model execution failed"**

This means `sessionRef.current.run(feeds)` is throwing an error.

## What I Just Added
Comprehensive logging that will show:
1. What input name we're using
2. What tensor shape we're sending
3. What data is in the tensor
4. What the model expects
5. The EXACT error message from ONNX Runtime

## 🚨 ACTION REQUIRED

### Step 1: Refresh Browser
Press **Ctrl + Shift + R**

### Step 2: Open Console
Press **F12** → Console tab

### Step 3: Clear Console
Click 🚫 to clear old logs

### Step 4: Start Camera
Click green Play button

### Step 5: Position Hand
Show your hand to the camera

### Step 6: Wait 1-2 Seconds
Let it try to run inference

### Step 7: CHECK CONSOLE FOR THIS:
```
❌ ========== MODEL.RUN() FAILED ==========
Error: [THE ACTUAL ERROR MESSAGE]
Message: [ERROR DETAILS]
Input name used: [name]
Tensor shape: [1, 42]
Tensor type: float32
Tensor data length: 42
Tensor data sample: [0.234, 0.567, ...]
Model input names: [...]
Model output names: [...]
==========================================
```

## 📋 What to Look For

### **Check 1: Input Name**
```
Input name used: "float_input"
Model input names: ["X"]  ← MISMATCH!
```
**If they don't match**: The model expects a different name

### **Check 2: Tensor Shape**
```
Tensor shape: [1, 42]
```
**Should be**: `[1, 42]` for 21 landmarks × 2 coordinates

### **Check 3: Error Message**
Common errors:
- **"Invalid argument"** → Wrong input shape or type
- **"Input X not found"** → Wrong input name
- **"Expected shape [1, 21, 2]"** → Model wants different shape
- **"Expected type int64"** → Model wants integer input

### **Check 4: Tensor Data**
```
Tensor data sample: [0.234, 0.567, 0.123, ...]
```
**Should be**: Numbers between 0 and 1 (normalized coordinates)
**Should NOT be**: NaN, Infinity, or negative numbers

## 🎯 Most Likely Issues

### Issue 1: Wrong Input Shape
**Model expects**: `[1, 21, 2]` (batch, landmarks, coordinates)
**We're sending**: `[1, 42]` (batch, flattened)

**Fix**: Reshape the tensor

### Issue 2: Wrong Input Name
**Model expects**: Something other than what we're using
**Fix**: Use the correct name from `Model input names`

### Issue 3: Wrong Data Type
**Model expects**: int64 or different precision
**Fix**: Convert data type

## 📸 What I Need
Please copy and paste the ENTIRE error block from the console, especially:
1. The error message
2. Input name used vs Model input names
3. Tensor shape
4. Tensor data sample

This will tell me EXACTLY what's wrong!

---

**Status**: ⏳ Waiting for console output  
**Next**: I'll provide exact fix based on the error
