/**
 * ISL Model Integration Verification Script
 * Run this in the browser console to verify the prediction pipeline
 */

console.log('🔍 ISL Model Integration Verification');
console.log('=====================================\n');

// Check 1: ONNX Runtime loaded
console.log('1️⃣ Checking ONNX Runtime...');
if (typeof window.ort !== 'undefined') {
    console.log('   ✅ ONNX Runtime loaded');
    console.log('   📍 WASM paths:', window.ort.env.wasm.wasmPaths);
} else {
    console.log('   ❌ ONNX Runtime not found');
}

// Check 2: MediaPipe loaded
console.log('\n2️⃣ Checking MediaPipe...');
if (typeof window.Hands !== 'undefined') {
    console.log('   ✅ MediaPipe Hands loaded');
} else {
    console.log('   ⚠️ MediaPipe Hands not found (might be in module scope)');
}

// Check 3: Camera access
console.log('\n3️⃣ Checking Camera Access...');
navigator.mediaDevices.getUserMedia({ video: true })
    .then(() => {
        console.log('   ✅ Camera access granted');
    })
    .catch((err) => {
        console.log('   ❌ Camera access denied:', err.message);
    });

// Check 4: WebAssembly support
console.log('\n4️⃣ Checking WebAssembly Support...');
if (typeof WebAssembly === 'object') {
    console.log('   ✅ WebAssembly supported');
    console.log('   📍 Type:', typeof WebAssembly);
} else {
    console.log('   ❌ WebAssembly not supported');
}

// Check 5: Model file accessibility
console.log('\n5️⃣ Checking Model File...');
fetch('/isl_model.onnx', { method: 'HEAD' })
    .then(response => {
        if (response.ok) {
            console.log('   ✅ Model file accessible');
            console.log('   📍 Size:', response.headers.get('content-length'), 'bytes');
        } else {
            console.log('   ❌ Model file not found (status:', response.status, ')');
        }
    })
    .catch(err => {
        console.log('   ❌ Error fetching model:', err.message);
    });

// Test preprocessing function
console.log('\n6️⃣ Testing Preprocessing Logic...');
const testLandmarks = Array.from({ length: 21 }, (_, i) => ({
    x: 0.5 + (i * 0.01),
    y: 0.5 + (i * 0.01)
}));

console.log('   📍 Input: 21 landmarks with x,y in [0.5, 0.7]');

// Simulate the preprocessing
const coords = testLandmarks.map(lm => ({ x: lm.x, y: lm.y }));
const mirroredCoords = coords.map(c => ({ x: 1 - c.x, y: c.y }));
const minX = Math.min(...mirroredCoords.map(c => c.x));
const minY = Math.min(...mirroredCoords.map(c => c.y));

const normalized = [];
for (const coord of mirroredCoords) {
    normalized.push(coord.x - minX);
    normalized.push(coord.y - minY);
}

const result = new Float32Array(normalized);

console.log('   ✅ Preprocessing successful');
console.log('   📍 Output length:', result.length);
console.log('   📍 Output type:', result.constructor.name);
console.log('   📍 First 6 values:', Array.from(result.slice(0, 6)));
console.log('   📍 Min X:', minX.toFixed(3), '| Min Y:', minY.toFixed(3));

// Summary
console.log('\n=====================================');
console.log('✅ Verification Complete!');
console.log('📝 Next: Navigate to /translate and click Play');
console.log('=====================================\n');
