
export const localStorageKeys = {
    PITCH_DATA: 'pitch-coach-pitches',
    USER_SETTINGS: 'pitch-coach-settings',
    AUTH_TOKEN: 'pitch-coach-auth'
  } as const;
  
  export const storage = {
    get: <T>(key: string): T | null => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch {
        return null;
      }
    },
    set: <T>(key: string, value: T): void => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error('Storage error:', error);
      }
    },
    remove: (key: string): void => {
      localStorage.removeItem(key);
    }
  };