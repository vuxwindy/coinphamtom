// DOM Utilities for Vue.js integration
export const safeQuerySelector = (selector) => {
  try {
    return document.querySelector(selector)
  } catch (error) {
    console.warn(`Element not found: ${selector}`)
    return null
  }
}

export const safeQuerySelectorAll = (selector) => {
  try {
    return document.querySelectorAll(selector)
  } catch (error) {
    console.warn(`Elements not found: ${selector}`)
    return []
  }
}

export const safeSetTextContent = (selector, text) => {
  const element = safeQuerySelector(selector)
  if (element) {
    element.textContent = text
  } else {
    console.warn(`Cannot set textContent on null element: ${selector}`)
  }
}

export const safeAddEventListener = (selector, event, handler) => {
  const element = safeQuerySelector(selector)
  if (element) {
    element.addEventListener(event, handler)
  } else {
    console.warn(`Cannot add event listener to null element: ${selector}`)
  }
}

// Wait for DOM to be ready
export const waitForElement = (selector, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const observer = new MutationObserver((mutations) => {
      const element = document.querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    setTimeout(() => {
      observer.disconnect()
      reject(new Error(`Element ${selector} not found within ${timeout}ms`))
    }, timeout)
  })
}

// Initialize components when DOM is ready
export const initWhenReady = (selector, initFunction) => {
  waitForElement(selector)
    .then((element) => {
      initFunction(element)
    })
    .catch((error) => {
      console.warn(`Failed to initialize ${selector}:`, error)
    })
}

