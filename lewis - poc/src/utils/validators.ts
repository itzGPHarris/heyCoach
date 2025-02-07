export const isValidPitch = (data: any): boolean => {
    const requiredFields = ['id', 'title', 'playbackId', 'metrics'];
    return requiredFields.every(field => data?.[field]);
  };
  
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  