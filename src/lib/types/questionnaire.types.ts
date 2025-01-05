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

export interface BaseQuestion {
  id: string;
  text: string;
  dependsOn?: QuestionDependency;
}

export interface TextQuestion extends BaseQuestion {
  type: "text";
}

export interface RegularQuestion extends BaseQuestion {
  type?: "regular";
  options: QuestionOption[];
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider";
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
}

export type Question = TextQuestion | RegularQuestion | SliderQuestion;

export interface QuestionnaireSection {
  title: string;
  instructions: string;
  questions: Question[];
}

export interface Questionnaire {
  title: string;
  subtitle?: string;
  instructions: string;
  sections: QuestionnaireSection[];
  metadata?: QuestionnaireMetadata;
  interpretations?: {
    ranges: Record<string, string>;
    labels?: Record<string, string>;
  };
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
  text_responses?: { [questionId: string]: string };
}

// Visualization types for results display
export type VisualizationType = "spider" | "simple";

export interface VisualizationConfig {
  type: VisualizationType;
  options?: {
    showTotal?: boolean;
    showSections?: boolean;
  };
}

export interface QuestionnaireMetadata {
  visualization: VisualizationConfig;
  scoreRange?: {
    min: number;
    max: number;
  };
} 