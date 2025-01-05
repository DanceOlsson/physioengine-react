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

// Configuration for question grouping by section
const SECTION_QUESTIONS = {
  "Activities": Array.from({ length: 21 }, (_, i) => `Q${i + 1}`),
  "Social Impact": ["Q22", "Q23"],
  "Symptoms": ["Q24", "Q25", "Q26", "Q27", "Q28"],
  "Sleep and Confidence": ["Q29", "Q30"],
  "Work": ["Q33", "Q34", "Q35", "Q36"],
  "Sports/Music": ["Q39", "Q40", "Q41", "Q42"]
};

// Configuration for text input questions (these won't be included in score calculations)
const TEXT_INPUT_QUESTIONS = ["Q31", "Q32", "Q37", "Q38"];

export const calculateDashScores = (responses: QuestionnaireResponse): QuestionnaireResult => {
  try {
    const subscaleScores: { [key: string]: number } = {};
    const textResponses: { [key: string]: string } = {};

    // Collect text responses
    TEXT_INPUT_QUESTIONS.forEach(q => {
      if (q in responses && typeof responses[q] === 'string') {
        textResponses[q] = responses[q] as string;
      }
    });

    // Calculate scores for each section
    for (const [section, questions] of Object.entries(SECTION_QUESTIONS)) {
      // Filter out text input questions from score calculation
      const scoringQuestions = questions.filter(q => !TEXT_INPUT_QUESTIONS.includes(q));
      
      const validResponses = scoringQuestions
        .filter(q => q in responses && typeof responses[q] === 'number')
        .map(q => responses[q] as number);

      if (validResponses.length > 0) {
        // DASH formula: ((sum of n responses / n) - 1) * 25
        // This gives a score from 0 (no disability) to 100 (most severe disability)
        const meanScore = validResponses.reduce((a, b) => a + b, 0) / validResponses.length;
        subscaleScores[section] = ((meanScore - 1) * 25);
      }
    }

    if (Object.keys(subscaleScores).length === 0) {
      return {
        questionnaire_name: "DASH",
        sections: [],
        total_score: 0,
        interpretation: "",
        text_responses: textResponses
      };
    }

    // Calculate total score as mean of subscale scores
    const totalScore = Object.values(subscaleScores).reduce((a, b) => a + b, 0) / 
                      Object.values(subscaleScores).length;

    // Create section scores without interpretations
    const sectionScores: SectionScore[] = Object.entries(subscaleScores).map(([name, score]) => ({
      name,
      score,
      interpretation: ""
    }));

    return {
      questionnaire_name: "DASH",
      sections: sectionScores,
      total_score: totalScore,
      interpretation: "",
      text_responses: textResponses
    };

  } catch (error) {
    console.error("Error calculating DASH scores:", error);
    throw new Error("Failed to calculate DASH scores");
  }
} 