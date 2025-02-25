// lib/touchGesture.js
export function touchGesture(node, params) {
  let { min, max, step, getValue, setValue } = params;
  
  let touchStartX = null;
  let touchStartValue = null;
  let containerWidth = 0;
  
  function calculateNewValue(touchX) {
    const deltaX = touchX - touchStartX;
    const containerRange = containerWidth;
    const valueRange = max - min;
    
    // Convert pixel movement to value change
    const ratioMoved = deltaX / containerRange;
    const valueChange = ratioMoved * valueRange;
    
    // Calculate new value
    let newValue = touchStartValue + valueChange;
    
    // Constrain to min/max and round to step
    newValue = Math.round(newValue / step) * step;
    newValue = Math.min(Math.max(newValue, min), max);
    
    return newValue;
  }

  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartValue = getValue();
    containerWidth = node.offsetWidth;
    event.preventDefault();
  }

  function handleTouchMove(event) {
    if (touchStartX === null) return;
    const currentTouchX = event.touches[0].clientX;
    setValue(calculateNewValue(currentTouchX));
    event.preventDefault();
  }

  function handleTouchEnd() {
    touchStartX = null;
    touchStartValue = null;
  }
  
  node.addEventListener('touchstart', handleTouchStart);
  node.addEventListener('touchmove', handleTouchMove);
  node.addEventListener('touchend', handleTouchEnd);
  node.addEventListener('touchcancel', handleTouchEnd);
  
  return {
    update(newParams) {
      min = newParams.min;
      max = newParams.max;
      step = newParams.step;
      getValue = newParams.getValue;
      setValue = newParams.setValue;
    },
    destroy() {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchmove', handleTouchMove);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('touchcancel', handleTouchEnd);
    }
  };
}