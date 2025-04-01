/**
 * Sound effect utility for the baseball trivia game
 * 
 * Uses the Web Audio API to play simple sounds for game events.
 * In a production app, you would use actual audio files instead of
 * synthesized sounds, but this provides a simple solution for the prototype.
 */

// Audio context for sound generation
let audioContext: AudioContext | null = null;

// Initialize audio context (must be called after a user interaction)
export const initAudio = (): void => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      console.log('Audio context initialized');
    }
  } catch (error) {
    console.error('Failed to initialize audio context:', error);
  }
};

// Play a sound indicating a correct answer
export const playCorrectSound = (): void => {
  if (!audioContext) {
    initAudio();
    if (!audioContext) return;
  }
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.error('Error playing correct sound:', error);
  }
};

// Play a sound indicating an incorrect answer
export const playIncorrectSound = (): void => {
  if (!audioContext) {
    initAudio();
    if (!audioContext) return;
  }
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.error('Error playing incorrect sound:', error);
  }
};

// Play a sound for scoring a run
export const playScoreSound = (): void => {
  if (!audioContext) {
    initAudio();
    if (!audioContext) return;
  }
  
  try {
    // First note
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(440, audioContext.currentTime);
    
    gainNode1.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    
    oscillator1.start();
    oscillator1.stop(audioContext.currentTime + 0.2);
    
    // Second note (higher)
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(660, audioContext.currentTime + 0.2);
    
    gainNode2.gain.setValueAtTime(0.5, audioContext.currentTime + 0.2);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    
    oscillator2.start(audioContext.currentTime + 0.2);
    oscillator2.stop(audioContext.currentTime + 0.4);
  } catch (error) {
    console.error('Error playing score sound:', error);
  }
};

// Play a sound for game over
export const playGameOverSound = (): void => {
  if (!audioContext) {
    initAudio();
    if (!audioContext) return;
  }
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(55, audioContext.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  } catch (error) {
    console.error('Error playing game over sound:', error);
  }
};