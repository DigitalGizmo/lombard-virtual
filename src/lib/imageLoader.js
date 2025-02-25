// lib/imageLoader.js
import { writable, derived } from 'svelte/store';
import { formatFrameNumber } from './utils.js';

/**
 * Creates and manages image preloading for a sequence of images
 * 
 * @param {Object} config Configuration object
 * @param {string} config.assetPath Base path for assets
 * @param {string} config.imgDir Directory containing images
 * @param {string} config.imgPrefix Prefix for image filenames
 * @param {number} config.min Minimum frame number
 * @param {number} config.max Maximum frame number
 * @param {string} config.extension File extension (default: 'webp')
 * @returns {Object} Image loading helpers and state
 */
export function createImageLoader(config) {
  const {
    assetPath,
    imgDir,
    imgPrefix,
    min,
    max,
    extension = 'webp'
  } = config;
  
  // Calculate total images
  const totalImages = max - min + 1;
  
  // Create stores for state management
  const loadedImages = writable(0);
  const isLoading = writable(true);
  const preloadedImages = writable([]);
  
  // Derived store for loading percentage
  const loadingPercentage = derived(
    loadedImages,
    $loadedImages => Math.round(($loadedImages / totalImages) * 100)
  );
  
  // Function to preload all images
  const preloadImages = async () => {
    const promises = [];

    for (let i = min; i <= max; i++) {
      const zFrame = formatFrameNumber(i);
      const imagePath = `${assetPath}images/${imgDir}/${imgPrefix}${zFrame}.${extension}`;
      
      const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loadedImages.update(count => count + 1);
          preloadedImages.update(images => {
            const newImages = [...images];
            newImages[i - min] = img; // Adjust index if min is not 0
            return newImages;
          });
          resolve(img);
        };
        img.onerror = (error) => {
          console.error(`Failed to load image: ${imagePath}`, error);
          reject(error);
        };
        img.src = imagePath;
      });
      
      promises.push(promise);
    }

    try {
      await Promise.all(promises);
      isLoading.set(false);
    } catch (error) {
      console.error('Error preloading images:', error);
      // Still mark as not loading so UI doesn't get stuck
      isLoading.set(false);
    }
  };
  
  // Function to get image path for a specific frame
  const getImagePath = (frame) => {
    const zFrame = formatFrameNumber(frame);
    return `${assetPath}images/${imgDir}/${imgPrefix}${zFrame}.${extension}`;
  };
  
  return {
    loadedImages,
    isLoading,
    preloadedImages,
    loadingPercentage,
    preloadImages,
    getImagePath,
    totalImages
  };
}