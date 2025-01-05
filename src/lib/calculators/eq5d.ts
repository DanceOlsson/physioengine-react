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

import { QuestionnaireResponse, QuestionnaireResult } from "../types/questionnaire.types";

export function calculateEq5dScore(responses: QuestionnaireResponse): QuestionnaireResult {
  // Get the 5 dimension scores (adding 1 to convert from 0-4 to 1-5)
  const dimensionScores = [
    { name: "mobility", score: (responses["mobility"] as number) + 1, interpretation: "" },
    { name: "selfCare", score: (responses["selfCare"] as number) + 1, interpretation: "" },
    { name: "activities", score: (responses["activities"] as number) + 1, interpretation: "" },
    { name: "pain", score: (responses["pain"] as number) + 1, interpretation: "" },
    { name: "anxiety", score: (responses["anxiety"] as number) + 1, interpretation: "" }
  ];

  // Get VAS score (already in correct range 0-100)
  const vasScore = responses["vas"] as number;

  return {
    questionnaire_name: "EQ-5D-5L",
    sections: [
      ...dimensionScores,
      { name: "vas", score: vasScore, interpretation: "" }
    ],
    total_score: -1,  // Not applicable
    interpretation: dimensionScores.map(d => d.score).join("")  // Health state as string
  };
} 