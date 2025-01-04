import { QuestionnaireResponse, QuestionnaireResult, SectionScore } from "../types/questionnaire.types";

// Configuration for question grouping by section
const SECTION_QUESTIONS = {
  "Symptoms": ["S1", "S2", "S3"],
  "Stiffness": ["S4", "S5"],
  "Pain": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10"],
  "Physical Function": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17"],
  "Sports and Recreation": ["SP1", "SP2", "SP3", "SP4"],
  "Quality of Life": ["Q1", "Q2", "Q3", "Q4"]
};

export const calculateHoosScores = (responses: QuestionnaireResponse): QuestionnaireResult => {
  try {
    const subscaleScores: { [key: string]: number } = {};

    // Calculate scores for each section
    for (const [section, questions] of Object.entries(SECTION_QUESTIONS)) {
      const validResponses = questions
        .filter(q => q in responses && typeof responses[q] === 'number')
        .map(q => responses[q] as number);

      if (validResponses.length > 0) {
        // Formula: 100 - mean(responses) * 25
        // This normalizes the score to 0-100 where 100 is best
        const meanScore = validResponses.reduce((a, b) => a + b, 0) / validResponses.length;
        subscaleScores[section] = 100 - (meanScore * 25);
      }
    }

    if (Object.keys(subscaleScores).length === 0) {
      return {
        questionnaire_name: "HOOS",
        sections: [],
        total_score: 0,
        interpretation: ""
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
      questionnaire_name: "HOOS",
      sections: sectionScores,
      total_score: totalScore,
      interpretation: ""
    };

  } catch (error) {
    console.error("Error calculating HOOS scores:", error);
    throw new Error("Failed to calculate HOOS scores");
  }
} 