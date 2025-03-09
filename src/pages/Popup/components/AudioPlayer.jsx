import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useAccessibility } from '../context/AccessibilityContext';

const AudioPlayer = ({ pageType, content }) => {
  const audioRef = useRef(null);
  const { autoPlayAudio, playbackSpeed } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);

  // Get the appropriate audio description based on page type and content
  const getAudioDescription = () => {
    const baseDescription = {
      summary: "Welcome to the Summary page. Here you can see an overview of the privacy policy's risk level and a brief explanation. ",
      details: "You're now on the Details page. This page provides an in-depth analysis of the privacy policy. ",
      settings: "This is the Settings page where you can customize how OwlGuard explains privacy policies to you. ",
      accessibility: "You're in the Accessibility settings. Here you can adjust font size, enable dyslexic-friendly font, control audio playback settings, and customize the theme. "
    }[pageType];

    if (!baseDescription) return null;

    // Add dynamic content description
    let fullDescription = baseDescription;
    
    if (content) {
      if (pageType === 'summary') {
        const riskLevel = content.riskLevel || 'unknown';
        fullDescription += `The risk meter shows a ${riskLevel.toLowerCase()} risk level, indicated by the needle pointing to the ${riskLevel.toLowerCase()} section. ${content.explanation || ''}`;
      } else if (pageType === 'details') {
        fullDescription += content.details || '';
      }
    }

    return fullDescription;
  };

  // Stop audio when component unmounts or page changes
  useEffect(() => {
    return () => {
      if (isPlaying) {
        speechSynthesis.cancel(); // Stop any ongoing speech
        setIsPlaying(false);
      }
    };
  }, [pageType]);

  // Set playback rate based on accessibility settings
  useEffect(() => {
    if (audioRef.current) {
      switch (playbackSpeed) {
        case 'slow':
          audioRef.current.playbackRate = 0.8;
          break;
        case 'fast':
          audioRef.current.playbackRate = 1.2;
          break;
        default:
          audioRef.current.playbackRate = 1.0;
      }
    }
  }, [playbackSpeed]);

  // Handle auto-play when navigating between pages
  useEffect(() => {
    if (autoPlayAudio) {
      handlePlay();
    }
  }, [pageType, autoPlayAudio, content]);

  const handlePlay = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const description = getAudioDescription();
      if (description) {
        const utterance = new SpeechSynthesisUtterance(description);
        utterance.rate = playbackSpeed === 'slow' ? 0.8 : playbackSpeed === 'fast' ? 1.2 : 1.0;
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  if (!getAudioDescription()) return null;

  return (
    <div className={`audio-player ${pageType}-audio`}>
      <button 
        onClick={handlePlay}
        aria-label={isPlaying ? "Stop audio description" : "Play audio description"}
        className="audio-button"
      >
        <FontAwesomeIcon icon={isPlaying ? faVolumeMute : faVolumeUp} />
      </button>
    </div>
  );
};

export default AudioPlayer; 