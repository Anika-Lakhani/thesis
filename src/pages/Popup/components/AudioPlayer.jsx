import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useAccessibility } from '../context/AccessibilityContext';

const AudioPlayer = ({ pageType, content, activeTab, isModalOpen }) => {
  const audioRef = useRef(null);
  const { autoPlayAudio, playbackSpeed } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  const currentPageRef = useRef(pageType);
  const previousTabRef = useRef(activeTab);
  const previousModalStateRef = useRef(isModalOpen);

  // Get the appropriate audio description based on page type and content
  const getAudioDescription = () => {
    let description = "";

    // Base descriptions for each page
    switch(pageType) {
      case 'summary':
        description = `Welcome to the Summary page. ${
          content?.riskLevel ? 
          `The risk meter shows a ${content.riskLevel.toLowerCase()} risk level. ` : 
          ""
        }${content?.explanation || ""}`;
        break;
      case 'details':
        description = `Welcome to the Details page. Here's the detailed analysis: ${content?.details || ""}`;
        break;
      case 'settings':
        description = "Welcome to the Settings page. Here you can customize your experience. " +
                     "You can choose between different explanation styles: Default for clear and professional explanations, " +
                     "Girlypop for a casual and fun style, or Sports Announcer for an energetic commentary.";
        break;
      case 'accessibility':
        description = "Welcome to the Accessibility settings. Here you can customize your experience: " +
                     "Adjust the font size between small, regular, and large. " +
                     "Enable or disable dyslexic-friendly font. " +
                     "Toggle automatic audio descriptions. " +
                     "Adjust audio playback speed between slow, regular, and fast. " +
                     "Choose between light, dark, or system theme.";
        break;
      default:
        return null;
    }

    return description;
  };

  // Stop audio when component unmounts, page changes, tab changes, or modal opens
  useEffect(() => {
    const shouldStopAudio = () => {
      // Stop if page type changed
      if (currentPageRef.current !== pageType) return true;
      // Stop if tab changed
      if (previousTabRef.current !== activeTab) return true;
      // Stop if modal state changed
      if (previousModalStateRef.current !== isModalOpen) return true;
      return false;
    };

    if (shouldStopAudio()) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      }
      currentPageRef.current = pageType;
      previousTabRef.current = activeTab;
      previousModalStateRef.current = isModalOpen;
    }

    return () => {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      }
    };
  }, [pageType, activeTab, isModalOpen]);

  // Handle auto-play when navigating between pages
  useEffect(() => {
    if (autoPlayAudio && currentPageRef.current === pageType) {
      handlePlay();
    }
  }, [pageType, autoPlayAudio, content]);

  const handlePlay = () => {
    // Cancel any ongoing speech
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const description = getAudioDescription();
    if (description) {
      const utterance = new SpeechSynthesisUtterance(description);
      utterance.rate = playbackSpeed === 'slow' ? 0.8 : playbackSpeed === 'fast' ? 1.2 : 1.0;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

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