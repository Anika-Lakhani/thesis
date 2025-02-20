import React, { useState, useEffect } from "react";
import JsPolipy from "../../utils/jsPolipy/index";
import "./Popup.css";
import RiskMeter from "./components/RiskMeter";
import PolicyDetails from "./components/PolicyDetails";
import Accessibility from "./components/Accessibility";
import OnboardingForm from "./components/OnboardingForm";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCog, 
  faWheelchair, 
  faTimes, 
  faMoon, 
  faSun, 
  faDesktop 
} from "@fortawesome/free-solid-svg-icons";
import Settings from "./components/Settings";

const Popup: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"summary" | "details">("summary");

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const result = await chrome.storage.sync.get(["onboardingComplete"]);
        setShowOnboarding(!result.onboardingComplete);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    checkOnboardingStatus();
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingForm onComplete={handleOnboardingComplete} />;
  }

  return (
    <AccessibilityProvider>
      {/* Existing popup content from lines 49-117 in Popup.jsx */}
      {/* Reference: */}
    </AccessibilityProvider>
  );
};

export default Popup; 