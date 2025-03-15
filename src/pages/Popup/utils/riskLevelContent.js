/**
 * Risk level explanations for each combination of format and reading level
 */
export const riskLevelExplanations = {
  "default-simple": {
    High: "Warning! This website collects a lot of your personal info and shares it with others. You might want to be careful or look for a different website - check the Details tab to learn more.",
    Medium: "This website collects some of your info. It's about average for most websites, but you should check the details to make sure you're okay with it - check the Details tab to learn more.",
    Low: "Good news! This website is careful with your personal info. They don't collect much data and they're clear about how they use it. Review the Details tab to learn more."
  },
  "default-medium": {
    High: "This privacy policy contains multiple concerning elements that could impact your privacy. We've detected a high number of data collection practices and potential sharing with third parties. Consider reviewing the Details tab for specific concerns.",
    Medium: "This privacy policy has some standard data collection practices, but it also includes elements that warrant attention. While not unusually invasive, we recommend reviewing the specific data handling practices in the Details tab.",
    Low: "This privacy policy appears to follow privacy-friendly practices. It has clear terms and limited data collection. As always, we recommend reviewing the Details tab to ensure this website aligns with your privacy preferences."
  },
  "default-advanced": {
    High: "This privacy policy contains multiple concerning elements, like extensive data collection mechanisms and broad third-party data sharing practices. We strongly recommend conducting a thorough review of the Details tab to understand the full scope of potential privacy impacts.",
    Medium: "The privacy policy implements industry-standard data collection practices but still incorporates certain elements that merit careful consideration. We recommend a detailed review of the specific data handling protocols, like on the Details tab, to ensure alignment with your privacy requirements.",
    Low: "This privacy policy demonstrates robust privacy-centric practices with transparent terms and minimal data collection protocols. However, we still encourage reviewing the comprehensive details, like on the Details tab, to verify complete alignment with your privacy preferences."
  },
  "girlypop-simple": {
    High: "Babe, YOU'RE DONE 🚩 This site is such a snitch! If u can, leave... or at least check the Details tab...",
    Medium: "This site might be a little basic, but at least they're kinda normal with your data. Maybe j check the Details tab to be safe?",
    Low: "We love a respectful king 👑 He's gentle, he's thoughtful... it's a 9/10 for me. , Peek at the Details tab to give your rating toooo"
  },
  "girlypop-medium": {
    High: "Babe, YOU'RE DONE 🚩 This website is a total snitch, collecting ALL your data and sharing it with, like, everyone. I think you should def check out the Details tab if u wanna know more, or just dump this website's ass.",
    Medium: "This privacy policy is pretty mid. I'm a girl's girl, so I just wanted to warn you even though they're not like, toxic or anything. Still j check the Details tab if u wanna learn more.",
    Low: "This privacy policy is BUTTERY SOFT and SO chic. When it comes to my data and privacy, I just love a respectful king. Still worth a quick peek at the Details tab tho... just in case."
  },
  "girlypop-advanced": {
    High: "Babe, we need to talk - this site's giving MAJOR privacy predator 🚩 The data collection practices are literally so problematic, and they're sharing your business with everyone. They really should have put in more safeguards... u deserve better. I spilled the tea in the Details tab. Maybe we just ghost?",
    Medium: "This privacy policy is pretty mid. I'm a girl's girl, so I just wanted to warn you even though they're not like, toxic or anything. They could have more safeguards in place, so still j check the Details tab if u wanna learn more.",
    Low: "This privacy policy is BUTTERY SOFT and SO chic. When it comes to my data and privacy, I just love a respectful king. Minimal data collection, healthy boundaries... my therapist approves. Still worth a quick peek at the Details tab tho... just in case."
  },
  "sports announcer-simple": {
    High: "FOUL PLAY! 🚨 This website's playing dirty with your info! Maybe time to sub in a different website, folks! And check the Details Tab!",
    Medium: "FOLKS, we're seeing some standard plays here, nothing too wild! Keep your eyes on the game and check the Details Tab!",
    Low: "TOUCHDOWN! 🏆 This website's playing clean with your data! A quick review of the Details Tab and we're good to go!"
  },
  "sports announcer-medium": {
    High: "It's looking like a rough game tonight! I'm not really seeing a lot of clean plays out there. The ref is calling a LOT of aggressive data collection fouls, the defense is DOWN and they're sharing data left and right! Head over to the Details tab for the play-by-play!",
    Medium: "The game is looking pretty even tonight! We're watching some standard moves we'd expect to see, but keep your eyes on the field! Check out the Details tab for the full strategic breakdown.",
    Low: "TOUCHDOWN, PRIVACY FANS! This policy is showing EXCELLENT form with privacy-friendly practices! A STELLAR performance in data protection! MVP performance right here. Take a quick timeout to review the Details tab for the full winning strategy!"
  },
  "sports announcer-advanced": {
    High: "LADIES AND GENTLEMEN, we're witnessing an UNPRECEDENTED display of aggressive data collection! The privacy defense has COMPLETELY COLLAPSED! Multiple violations on the field! Lots of data collection and sharing without much of a defensive line. The ref box conducted a full review in the Details tab, so let's cut to that. Or perhaps it's time to consider a strategic retreat!",
    Medium: "Sports fans, we're observing a pretty even game with the privacy practices here! While executing standard data collection plays, there are some tactical elements that warrant your attention! They really could have buffed up the defense. Let's go to the Details tab for our in-depth analysis!",
    Low: "An absolute masterful display of privacy protection, folks! This policy is dominating with minimal data collection and crystal-clear communication! A championship-caliber performance! Let's review the Details tab for the complete highlight reel!"
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