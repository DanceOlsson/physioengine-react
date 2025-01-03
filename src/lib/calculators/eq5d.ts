import { QuestionnaireResponse, QuestionnaireResult, SectionScore } from "../types/questionnaire.types";

// EQ-5D-5L has 5 dimensions plus a VAS scale
const DIMENSION_QUESTIONS = {
  "Mobility": "mobility",
  "Self-Care": "selfCare",
  "Usual Activities": "activities",
  "Pain/Discomfort": "pain",
  "Anxiety/Depression": "anxiety"
};

const getHealthState = (responses: QuestionnaireResponse): string => {
  // Add 1 to each response because our storage uses 0-4 but EQ-5D uses 1-5
  return Object.values(DIMENSION_QUESTIONS)
    .map(questionId => {
      const response = responses[questionId];
      return typeof response === 'number' ? (response + 1).toString() : '0';
    })
    .join('');
};

const formatHealthState = (healthState: string): string => {
  const dimensions = [
    "Mobility",
    "Self-Care",
    "Usual Activities",
    "Pain/Discomfort",
    "Anxiety/Depression"
  ];
  
  const levels = [
    "No problems",
    "Slight problems",
    "Moderate problems",
    "Severe problems",
    "Extreme problems"
  ];

  return healthState
    .split('')
    .map((level, index) => `${dimensions[index]}: ${levels[parseInt(level) - 1] || 'Not answered'}`)
    .join('\n');
};

export function calculateEq5dScore(responses: QuestionnaireResponse): QuestionnaireResult {
  try {
    const healthState = getHealthState(responses);
    const vasScore = responses["vas"] as number;
    const hasVasScore = typeof vasScore === 'number';

    // Create section scores
    const sectionScores: SectionScore[] = [
      {
        name: "Health State",
        score: -1, // Not applicable for health state
        interpretation: formatHealthState(healthState)
      }
    ];

    // Add VAS score if available
    if (hasVasScore) {
      sectionScores.push({
        name: "VAS Score",
        score: vasScore,
        interpretation: `${vasScore}/100`
      });
    }

    // Create a concise summary for easy copying
    const summary = [
      `EQ-5D-5L Health State: ${healthState}`,
      ...formatHealthState(healthState).split('\n').map(line => `• ${line}`),
      hasVasScore ? `VAS Score: ${vasScore}/100` : null
    ].filter(Boolean).join('\n');

    return {
      questionnaire_name: "EQ-5D-5L",
      sections: sectionScores,
      total_score: -1, // Not applicable for EQ-5D-5L
      interpretation: summary
    };

  } catch (error) {
    console.error("Error calculating EQ-5D-5L scores:", error);
    throw new Error("Failed to calculate EQ-5D-5L scores");
  }
} 