import { QuestionnaireResponse, QuestionnaireResult, SectionScore } from "../types/questionnaire.types";

// EQ-5D-5L has 5 dimensions plus a VAS scale
const DIMENSION_QUESTIONS = {
  "mobility": "mobility",
  "selfCare": "selfCare",
  "activities": "activities",
  "pain": "pain",
  "anxiety": "anxiety"
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

export function calculateEq5dScore(responses: QuestionnaireResponse): QuestionnaireResult {
  try {
    const healthState = getHealthState(responses);
    const vasScore = responses["vas"] as number;
    const hasVasScore = typeof vasScore === 'number';

    // Create section scores
    const sectionScores: SectionScore[] = [
      {
        name: "healthState",
        score: -1, // Not applicable for health state
        interpretation: healthState
      }
    ];

    // Add VAS score if available
    if (hasVasScore) {
      sectionScores.push({
        name: "vasScore",
        score: vasScore,
        interpretation: `${vasScore}`
      });
    }

    return {
      questionnaire_name: "EQ-5D-5L",
      sections: sectionScores,
      total_score: -1, // Not applicable for EQ-5D-5L
      interpretation: ""
    };

  } catch (error) {
    console.error("Error calculating EQ-5D-5L scores:", error);
    throw new Error("Failed to calculate EQ-5D-5L scores");
  }
} 