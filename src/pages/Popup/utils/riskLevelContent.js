/**
 * Risk level explanations for each combination of format and reading level
 */
export const riskLevelExplanations = {
  "default-simple": {
    High: "Warning! This website collects a lot of your personal info and shares it with others. You might want to be careful or look for a different website.",
    Medium: "This website collects some of your info. It's about average for most websites, but you should check the details to make sure you're okay with it.",
    Low: "Good news! This website is careful with your personal info. They don't collect much data and they're clear about how they use it."
  },
  "default-medium": {
    High: "This privacy policy contains multiple concerning elements that could impact your privacy. We've detected a high number of data collection practices and potential sharing with third parties. Consider reviewing the Details tab for specific concerns.",
    Medium: "This privacy policy has some standard data collection practices, but it also includes elements that warrant attention. While not unusually invasive, we recommend reviewing the specific data handling practices in the Details tab.",
    Low: "This privacy policy appears to follow privacy-friendly practices. It has clear terms and limited data collection. As always, we recommend reviewing the specific details to ensure they align with your privacy preferences."
  },
  "default-advanced": {
    High: "This privacy policy exhibits significant privacy implications through extensive data collection mechanisms and broad third-party data sharing practices. We strongly recommend conducting a thorough review of the granular details to understand the full scope of potential privacy impacts.",
    Medium: "The privacy policy implements industry-standard data collection practices while incorporating certain elements that merit careful consideration. We recommend a detailed review of the specific data handling protocols to ensure alignment with your privacy requirements.",
    Low: "This privacy policy demonstrates robust privacy-centric practices with transparent terms and minimal data collection protocols. We encourage reviewing the comprehensive details to verify complete alignment with your privacy preferences."
  },
  "girlypop-simple": {
    High: "OMG bestie, RED FLAG! 🚩 This site is totally spilling all your tea to everyone! Maybe we should find a different website that respects your vibe?",
    Medium: "Ok bestie, keeping it real - this site's kinda basic with your data. Not toxic, but like, maybe check the deets just to be safe? 💅",
    Low: "Yaaas! We love a respectful king! 👑 This site's super gentle with your data, bestie. Still worth a quick peek at the Details tab tho!"
  },
  "girlypop-medium": {
    High: "Babe, YOU'RE DONE 🚩 This website is a total snitch, collecting ALL your data and sharing it with, like, everyone. I think you should def check out the Details tab if you wanna know more, or just dump this website's ass.",
    Medium: "This privacy policy is pretty mid. I'm a girl's girl, so I just wanted to warn you even though they're not like, toxic or anything. Still j check the Details tab if you wanna learn more.",
    Low: "This privacy policy is BUTTERY SOFT and SO chic. When it comes to my data and privacy, I just love a respectful king. Still worth a quick peek at the Details tab though... just in case."
  },
  "girlypop-advanced": {
    High: "Bestie, we need to talk - this site's giving major privacy violation energy 🚩 The data collection practices are literally so problematic, and they're sharing your business with everyone. Time for a full tea spill in the Details tab, or maybe we just ghost?",
    Medium: "Let's get sophisticated about it, bestie - this site's privacy policy is serving mid-tier realness. Not totally toxic, but definitely needs a vibe check. Spill all the tea in the Details tab!",
    Low: "Period, queen! This site understood the assignment with their privacy policy! They're giving main character energy with minimal data collection and clear boundaries. Still, let's do a quick vibe check in the Details?"
  },
  "sports announcer-simple": {
    High: "FOUL PLAY! 🚨 This website's playing dirty with your info! Maybe time to sub in a different website, folks!",
    Medium: "FOLKS, we're seeing some standard plays here, nothing too wild! Keep your eyes on the game and check those details!",
    Low: "TOUCHDOWN! 🏆 This website's playing clean with your data! A quick review of the details and we're good to go!"
  },
  "sports announcer-medium": {
    High: "It's looking like a rough game tonight! I'm not really seeing a lot of clean plays out there. The ref is calling a LOT of aggressive data collection fouls, the defense is DOWN and they're sharing data left and right! Head over to the Details tab for the play-by-play!",
    Medium: "The game is looking pretty even tonight! We're watching some standard moves we'd expect to see, but keep your eyes on the field! Check out the Details tab for the full strategic breakdown.",
    Low: "TOUCHDOWN, PRIVACY FANS! This policy is showing EXCELLENT form with privacy-friendly practices! A STELLAR performance in data protection! MVP performance right here. Take a quick timeout to review the Details tab for the full winning strategy!"
  },
  "sports announcer-advanced": {
    High: "LADIES AND GENTLEMEN, we're witnessing an UNPRECEDENTED display of aggressive data collection! The privacy defense has COMPLETELY COLLAPSED! Multiple violations on the field! We're going to need a FULL REVIEW in the Details tab, or perhaps it's time to consider a STRATEGIC RETREAT!",
    Medium: "Sports fans, we're observing a BALANCED PERFORMANCE in privacy practices! While executing standard data collection plays, there are some TACTICAL ELEMENTS that warrant your attention! Let's go to the Details tab for our in-depth analysis!",
    Low: "AN ABSOLUTELY MASTERFUL DISPLAY of privacy protection, folks! This policy is DOMINATING with minimal data collection and CRYSTAL CLEAR communication! A CHAMPIONSHIP-CALIBER performance! Let's review the Details tab for the complete highlight reel!"
  }
};

/**
 * Get the appropriate risk level explanation based on format, level, and risk
 * @param {string} format - The explanation format (default, girlypop, sports announcer)
 * @param {string} readingLevel - The reading level (simple, medium, advanced)
 * @param {string} riskLevel - The risk level (High, Medium, Low)
 * @returns {string} The appropriate explanation text
 */
export function getRiskExplanation(format, readingLevel, riskLevel) {
  const key = `${format}-${readingLevel}`;
  return riskLevelExplanations[key]?.[riskLevel] || riskLevelExplanations["default-medium"][riskLevel];
} 