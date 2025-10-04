// tts.js

/**
 * This module provides a simple, browser-based text-to-speech function called speakText.
 * When called with a string of text, it uses the Web Speech API's SpeechSynthesisUtterance 
 * to convert that text into spoken audio. It also allows optional customization of the 
 * voice used (if the user’s device/browser supports multiple voices) and the speed of 
 * speech using the rate parameter. The function first checks if the browser supports 
 * speech synthesis, and if not, it logs a warning. If a voice name is provided, it 
 * searches the available voices and applies the selected one. Finally, it instructs 
 * the browser to speak the text aloud, making this function suitable for accessibility 
 * features, reading content to users, or enhancing applications with voice feedback.
 */

/**

 * @param {string} text - The text to speak
 * @param {string} [voiceName] - Optional: name of the voice
 * @param {number} [rate=1] - Optional: speed of speech (0.1 to 10, default 1)
 */
export function speakText(text, voiceName = null, rate = 1) {
    if (!window.speechSynthesis) {
      console.warn("Text-to-speech not supported in this browser.");
      return;
    }
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
  
    if (voiceName) {
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.name === voiceName);
      if (selectedVoice) utterance.voice = selectedVoice;
    }
  
    window.speechSynthesis.speak(utterance);
  }
  
  