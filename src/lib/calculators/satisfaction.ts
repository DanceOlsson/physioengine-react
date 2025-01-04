import { QuestionnaireResponse, QuestionnaireResult } from "../types/questionnaire.types";

export function calculateSatisfactionScore(responses: QuestionnaireResponse): QuestionnaireResult {
  try {
    const score = responses["S1"] as number;

    if (typeof score !== 'number') {
      return {
        questionnaire_name: "Patientnöjdhet",
        sections: [],
        total_score: 0,
        interpretation: ""
      };
    }

    return {
      questionnaire_name: "Patientnöjdhet",
      sections: [
        {
          name: "Generell nöjdhet",
          score,
          interpretation: ""
        }
      ],
      total_score: score,
      interpretation: ""
    };

  } catch (error) {
    console.error("Error calculating satisfaction scores:", error);
    throw new Error("Failed to calculate satisfaction scores");
  }
} 