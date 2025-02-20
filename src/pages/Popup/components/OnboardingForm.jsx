import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAccessibility } from "../context/AccessibilityContext";

/**
 * @typedef {Object} OnboardingFormProps
 * @property {() => void} onComplete - Callback function to execute when onboarding is complete
 */

/**
 * OnboardingForm component that guides users through initial setup
 * @param {OnboardingFormProps} props
 */
const OnboardingForm = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { theme } = useAccessibility();

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "n" || e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "b" || e.key === "ArrowLeft") {
        handleBack();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStep]);

  const handleNext = () => {
    // For now, complete onboarding after first step
    // Later we'll add more steps and conditions
    savePreferences();
    onComplete();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const savePreferences = async () => {
    try {
      await chrome.storage.sync.set({
        onboardingComplete: true,
        onboardingTimestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving onboarding preferences:", error);
    }
  };

  return (
    <AccessibilityProvider>
      <div className="onboarding-container">
        <h1>OwlGuard Installation</h1>
        
        <p className="onboarding-message">
          Hi there! Thanks so much for installing OwlGuard! To best tailor this
          extension to your needs, we're going to ask you a few questions (2 minutes)
        </p>

        <div className="navigation-hints">
          <span className="key-hint">Press 'b' for back</span>
          <span className="key-hint">Press 'n' for next</span>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-button back"
            onClick={handleBack}
            disabled={currentStep === 0}
            aria-label="Go back"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back</span>
          </button>
          <button
            className="nav-button next"
            onClick={handleNext}
            aria-label="Continue to next step"
          >
            <span>Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </AccessibilityProvider>
  );
};

export default OnboardingForm; 