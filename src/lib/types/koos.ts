export interface QuestionOption {
  value: number;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface QuestionnaireSection {
  title: string;
  instructions: string;
  questions: Question[];
}

export interface KoosQuestionnaire {
  title: string;
  subtitle: string;
  instructions: string;
  sections: QuestionnaireSection[];
}

export interface KoosResponse {
  [questionId: string]: number;
}

export interface SectionScore {
  name: string;
  score: number;
  interpretation: string;
}

export interface KoosResult {
  questionnaire_name: string;
  sections: SectionScore[];
  total_score: number;
  interpretation: string;
} 