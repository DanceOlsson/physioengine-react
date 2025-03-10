/**
 * CALCULATOR RULES:
 * 1. ONLY handle numerical calculations
 * 2. NO text or labels
 * 3. NO interpretations
 * 4. NO language-specific content
 * 5. Use IDs only, never display text
 * 
 * All display text MUST come from questionnaire data files
 */

import { QuestionnaireResponse, QuestionnaireResult, SectionScore } from "../types/questionnaire.types";

// SEFAS has all questions in one section
const SECTION_QUESTIONS = {
  "Foot/Ankle Function": ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"]
};

export function calculateSefasScore(responses: QuestionnaireResponse): QuestionnaireResult {
  try {
    const subscaleScores: { [key: string]: number } = {};

    // Calculate scores for each section
    for (const [section, questions] of Object.entries(SECTION_QUESTIONS)) {
      const validResponses = questions
        .filter(q => q in responses && typeof responses[q] === 'number')
        .map(q => responses[q] as number);

      if (validResponses.length > 0) {
        // SEFAS score is the sum of all responses (0-4 points per question)
        // Total score ranges from 0 (best) to 48 (worst)
        const totalScore = validResponses.reduce((a, b) => a + b, 0);
        subscaleScores[section] = totalScore;
      }
    }

    if (Object.keys(subscaleScores).length === 0) {
      return {
        questionnaire_name: "SEFAS",
        sections: [],
        total_score: 0,
        interpretation: ""
      };
    }

    // In SEFAS, the total score is the same as the section score
    // since there's only one section
    const totalScore = Object.values(subscaleScores)[0];

    // Create section scores without interpretations
    const sectionScores: SectionScore[] = Object.entries(subscaleScores).map(([name, score]) => ({
      name,
      score,
      interpretation: ""
    }));

    return {
      questionnaire_name: "SEFAS",
      sections: sectionScores,
      total_score: totalScore,
      interpretation: ""
    };

  } catch (error) {
    console.error("Error calculating SEFAS scores:", error);
    throw new Error("Failed to calculate SEFAS scores");
  }
} 