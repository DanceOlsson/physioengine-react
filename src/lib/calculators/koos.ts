import { KoosResponse, KoosResult, SectionScore } from "../types/koos.types";

// Configuration for score interpretation
const INTERPRETATION_RANGES = {
  "0-25": "Severe problems",
  "26-50": "Moderate problems",
  "51-75": "Mild problems",
  "76-100": "No problems"
} as const;

// Configuration for question grouping by section
const SECTION_QUESTIONS = {
  "Symptoms": ["S1", "S2", "S3", "S4", "S5", "S6", "S7"],
  "Pain": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"],
  "Daily Living": ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17"],
  "Sports": ["SP1", "SP2", "SP3", "SP4", "SP5"],
  "Quality of Life": ["Q1", "Q2", "Q3", "Q4"]
};

const getInterpretation = (score: number): string => {
  for (const [range, description] of Object.entries(INTERPRETATION_RANGES)) {
    const [min, max] = range.split("-").map(Number);
    if (score >= min && score <= max) {
      return description;
    }
  }
  return "Unable to interpret";
};

export const calculateKoosScores = (responses: KoosResponse): KoosResult => {
  try {
    const subscaleScores: { [key: string]: number } = {};

    // Calculate scores for each section
    for (const [section, questions] of Object.entries(SECTION_QUESTIONS)) {
      const validResponses = questions
        .filter(q => q in responses)
        .map(q => responses[q]);

      if (validResponses.length > 0) {
        // Formula: 100 - mean(responses) * 25
        // This normalizes the score to 0-100 where 100 is best
        const meanScore = validResponses.reduce((a, b) => a + b, 0) / validResponses.length;
        subscaleScores[section] = 100 - (meanScore * 25);
      }
    }

    if (Object.keys(subscaleScores).length === 0) {
      return {
        questionnaire_name: "KOOS",
        sections: [],
        total_score: 0,
        interpretation: "No valid responses received"
      };
    }

    // Calculate total score as mean of subscale scores
    const totalScore = Object.values(subscaleScores).reduce((a, b) => a + b, 0) / 
                      Object.values(subscaleScores).length;

    // Create section scores with interpretations
    const sectionScores: SectionScore[] = Object.entries(subscaleScores).map(([name, score]) => ({
      name,
      score,
      interpretation: getInterpretation(score)
    }));

    return {
      questionnaire_name: "KOOS",
      sections: sectionScores,
      total_score: totalScore,
      interpretation: getInterpretation(totalScore)
    };

  } catch (error) {
    console.error("Error calculating KOOS scores:", error);
    throw new Error("Failed to calculate KOOS scores");
  }
}; 