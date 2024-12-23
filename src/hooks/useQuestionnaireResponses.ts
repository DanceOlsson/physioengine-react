import { useState, useEffect } from "react";
import { database } from "@/lib/firebase";
import { ref, get } from "firebase/database";
import { QuestionnaireResponse } from "@/lib/types/questionnaire.types";

export function useQuestionnaireResponses(storageKey: string) {
  const [responses, setResponses] = useState<QuestionnaireResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadResponses = async () => {
      // First, try to get responses from localStorage
      const storedResponses = localStorage.getItem(storageKey);
      if (storedResponses) {
        try {
          const parsedResponses = JSON.parse(storedResponses) as QuestionnaireResponse;
          setResponses(parsedResponses);
          return;
        } catch (err) {
          console.error("Error parsing localStorage responses:", err);
        }
      }

      // If no localStorage responses, check Firebase for active session
      try {
        const sessionsRef = ref(database, "sessions");
        const snapshot = await get(sessionsRef);
        if (!snapshot.exists()) return;

        // Find the most recent completed session for this questionnaire
        const sessions = snapshot.val();
        const recentSession = Object.values(sessions)
          .filter((session: any) => 
            session.status === "completed" && 
            session.responses && 
            session.storageKey === storageKey
          )
          .sort((a: any, b: any) => b.completedAt - a.completedAt)[0] as any;

        if (recentSession?.responses) {
          setResponses(recentSession.responses as QuestionnaireResponse);
          // Save to localStorage for future use
          localStorage.setItem(storageKey, JSON.stringify(recentSession.responses));
        }
      } catch (err) {
        console.error("Error fetching Firebase responses:", err);
        setError("Failed to load responses");
      }
    };

    loadResponses();
  }, [storageKey]);

  return { responses, error };
} 