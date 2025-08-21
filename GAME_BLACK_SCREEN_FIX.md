# Modern Arrow Game Black Screen Fix

## Issue Description
User reported "vẫn chỉ có mỗi màu nền" (still only background color showing) and console errors showing:
- `Game area not found`
- `MessageNotSentError` (browser extension related)
- `runtime.lastError` (browser extension related)

## Root Cause Analysis
The main issue was with the game initialization and DOM element access:

1. **Timing Issue**: JavaScript was trying to access DOM elements before they were fully rendered by Vue
2. **Element Access Method**: Using `document.querySelector()` instead of Vue refs
3. **Race Condition**: `setupEventListeners()` was called before the DOM was ready

## Solution Implemented

### 1. Added Vue Refs
```javascript
// Added gameArea ref for proper Vue-style DOM access
const gameArea = ref(null)
```

### 2. Fixed Element Access
```javascript
// Before: document.querySelector('.game-area')
// After: gameArea.value (using Vue ref)
```

### 3. Improved Timing
```javascript
onMounted(() => {
  // Wait for DOM to be fully rendered
  nextTick(() => {
    // Additional setTimeout for extra safety
    setTimeout(() => {
      initGame()
      updateUI()
    }, 100)
  })
})
```

### 4. Added Debug Logging
```javascript
console.log('Debug - Elements found:', {
  character: !!character,
  bow: !!bow,
  target: !!target,
  gameAreaRef: !!gameArea.value
})
```

### 5. Updated Event Listeners
```javascript
// Setup using Vue ref instead of querySelector
if (gameArea.value) {
  gameArea.value.addEventListener('mousedown', startAim)
  // ... other event listeners
}
```

## Key Changes Made

1. **Import Addition**: Added `nextTick` to Vue imports
2. **Ref Declaration**: Added `gameArea = ref(null)` for DOM access
3. **Template Binding**: Ensured `ref="gameArea"` is in template
4. **Timing Fix**: Used `nextTick()` + `setTimeout()` for proper timing
5. **Event Cleanup**: Updated `onUnmounted()` to use Vue ref

## Expected Result
- Game elements (character, bow, target) should now be visible
- Event listeners should be properly attached
- No more "Game area not found" errors
- Game should be interactive and functional

## Browser Extension Errors
The `MessageNotSentError` and `runtime.lastError` are related to browser extensions and don't affect game functionality. These can be safely ignored or mitigated by disabling problematic extensions.

## Testing Status
- ✅ Page loads without Vue compilation errors
- ✅ No more "Game area not found" console errors
- 🔄 Awaiting user confirmation that game elements are now visible
