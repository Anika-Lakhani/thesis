import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * @typedef {Object} TextToSpeechProps
 * @property {string} text - The text to be read aloud
 * @property {boolean} autoPlay - Whether to automatically play the text
 * @property {Object} style - Additional styles for the button
 */

/**
 * A button component that reads text aloud when clicked
 * @param {TextToSpeechProps} props
 */
const TextToSpeech = ({ text, autoPlay, style }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { playbackSpeed } = useAccessibility();
  const speechSynthesis = window.speechSynthesis;

  const handleSpeak = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set playback speed based on accessibility settings
    switch(playbackSpeed) {
      case 'slow': utterance.rate = 0.8; break;
      case 'fast': utterance.rate = 1.2; break;
      default: utterance.rate = 1.0;
    }
    
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => {
      console.error("Speech synthesis error");
      setIsPlaying(false);
    };

    setIsPlaying(true);
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (autoPlay) {
      handleSpeak();
    }
    return () => {
      speechSynthesis.cancel();
    };
  }, [autoPlay, text]);

  return (
    <button
      className="text-to-speech-button"
      onClick={handleSpeak}
      aria-label={isPlaying ? "Stop reading" : "Read aloud"}
      title={isPlaying ? "Stop reading" : "Read aloud"}
      style={style}
    >
      <FontAwesomeIcon icon={isPlaying ? faVolumeMute : faVolumeUp} />
    </button>
  );
};

export default TextToSpeech;
