/* eslint-disable @typescript-eslint/no-unused-vars */
// src/utils/uuid.ts

/**
 * Generates a UUID v4 string
 */
function generateFallbackUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  
  /**
   * Cross-browser compatible UUID generator
   */
  export function generateUUID(): string {
    try {
      return crypto.randomUUID();
    } catch (e) {
      // Fallback for browsers that don't support crypto.randomUUID()
      return generateFallbackUUID();
    }
  }