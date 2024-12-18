/**
 * Generic questionnaire types that can be used across all questionnaires
 */

export interface QuestionOption {
  value: number | string;
  text: string;
}

export interface QuestionDependency {
  questionId: string;
  expectedValue: string | number;
}

export interface Question {
  id: string;
  text: string;
  type?: "text"; // Optional type field for text input questions
  options?: QuestionOption[]; // Made optional to support text input questions
  dependsOn?: QuestionDependency; // Optional dependency on another question's answer
}

export interface QuestionnaireSection {
  title: string;
  instructions: string;
  questions: Question[];
}

export interface Questionnaire {
  title: string;
  subtitle: string;
  instructions: string;
  sections: QuestionnaireSection[];
}

export interface QuestionnaireResponse {
  [questionId: string]: number | string;
}

export interface SectionScore {
  name: string;
  score: number;
  interpretation: string;
}

export interface QuestionnaireResult {
  questionnaire_name: string;
  sections: SectionScore[];
  total_score: number;
  interpretation: string;
  text_responses?: { [questionId: string]: string }; // Optional field for text responses
} 