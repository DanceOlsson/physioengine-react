/**
 * This file defines the structure and types for the HOOS (Hip disability and Osteoarthritis Outcome Score) questionnaire system.
 * 
 * The HOOS questionnaire is a medical survey that helps evaluate hip problems and track patient recovery.
 * It consists of multiple sections (like Pain, Symptoms, Daily Activities) where patients answer questions on a scale.
 * 
 * The structure mirrors the KOOS questionnaire for consistency, but is specific to hip-related assessments.
 */

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

export interface HOOSQuestionnaire {
  title: string;
  subtitle: string;
  instructions: string;
  sections: QuestionnaireSection[];
}

export interface HOOSResponse {
  [questionId: string]: number;
}

export interface SectionScore {
  name: string;
  score: number;
  interpretation: string;
}

export interface HOOSResult {
  questionnaire_name: string;
  sections: SectionScore[];
  total_score: number;
  interpretation: string;
} 