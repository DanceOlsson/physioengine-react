/**
 * This file defines the structure and types for the KOOS (Knee injury and Osteoarthritis Outcome Score) questionnaire system.
 * 
 * As a beginner, it's important to understand that this is a TypeScript file that acts as a blueprint for our questionnaire data.
 * Think of it like creating templates that ensure all our questionnaire data follows the same structure throughout the application.
 * 
 * The KOOS questionnaire is a medical survey that helps evaluate knee problems and track patient recovery.
 * It consists of multiple sections (like Pain, Symptoms, Daily Activities) where patients answer questions on a scale.
 * 
 * This file defines several interfaces that work together:
 * - QuestionOption: Defines what an answer choice looks like (e.g., "No pain" = 0, "Extreme pain" = 4)
 * - Question: Describes a single question with its text and possible answers
 * - QuestionnaireSection: Groups related questions together into sections
 * - KoosQuestionnaire: The complete structure of the survey
 * - KoosResponse: How we store a patient's answers
 * - SectionScore & KoosResult: How we structure the calculated results
 * 
 * These types help catch errors early in development and make our code more reliable and maintainable.
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