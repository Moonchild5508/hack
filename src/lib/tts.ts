export const speak = (text: string, lang: string = 'en-IN'): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported in this browser');
  }
};

export const stopSpeaking = (): void => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const getLanguageCode = (language: 'english' | 'hindi' | 'regional'): string => {
  const languageCodes: Record<string, string> = {
    english: 'en-IN',
    hindi: 'hi-IN',
    regional: 'ta-IN'
  };
  return languageCodes[language] || 'en-IN';
};
