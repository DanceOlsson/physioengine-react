/**
 * This page handles the mobile questionnaire filling experience accessed via QR code.
 * It loads a questionnaire session from Firebase, displays the appropriate questionnaire,
 * and saves the responses back to the database. The page includes error handling for
 * common issues like ad blockers and network connectivity problems.
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { database } from "@/lib/firebase";
import { MobileQuestionnaireReader } from "@/components/dynamic-readers/MobileQuestionnaireReader";
import { Loader2, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import questionnaire data
import { questions as koosQuestions } from "@/assets/questionnaires/koos_swedish";
import { questions as hoosQuestions } from "@/assets/questionnaires/hoos_swedish";
import { questions as dashQuestions } from "@/assets/questionnaires/dash_swedish";
import { questions as satisfactionQuestions } from "@/assets/questionnaires/satisfaction_swedish";

const getQuestionnaireData = (id: string) => {
  switch (id) {
    case "koos":
      return koosQuestions[0];
    case "hoos":
      return hoosQuestions[0];
    case "dash":
      return dashQuestions[0];
    case "satisfaction":
      return satisfactionQuestions[0];
    default:
      return null;
  }
};

export default function FillQuestionnairePage() {
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionnaireId, setQuestionnaireId] = useState<string | null>(null);
  const [storageKey, setStorageKey] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const loadSession = async () => {
      if (!sessionId) {
        setError("No session ID provided");
        setLoading(false);
        return;
      }

      try {
        const sessionRef = ref(database, `sessions/${sessionId}`);
        const snapshot = await get(sessionRef);

        if (!snapshot.exists()) {
          setError("Session not found");
          setLoading(false);
          return;
        }

        const sessionData = snapshot.val();
        if (sessionData.status === "completed") {
          setError("This questionnaire has already been completed");
          setLoading(false);
          return;
        }

        setQuestionnaireId(sessionData.questionnaireId);
        setStorageKey(sessionData.storageKey);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          // Check if it's a Firebase error related to ad blockers
          if (err.message.includes("network error")) {
            setError(
              "Unable to connect to the server. If you're using an ad blocker, please disable it for this site."
            );
          } else {
            setError("An error occurred while loading the questionnaire");
          }
        }
        setLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  const handleSubmit = async (responses: Record<string, number | string>) => {
    if (!sessionId || !storageKey) return;

    try {
      const sessionRef = ref(database, `sessions/${sessionId}`);
      await update(sessionRef, {
        status: "completed",
        responses,
        completedAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit responses. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">Loading questionnaire...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <ShieldAlert className="h-8 w-8 text-destructive mx-auto mb-2" />
          <h1 className="text-xl font-semibold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          {error.includes("ad blocker") && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                This site requires access to our secure database to:
                <ul className="list-disc list-inside mt-2">
                  <li>Load your questionnaire</li>
                  <li>Save your responses securely</li>
                  <li>Ensure data privacy</li>
                </ul>
              </p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Thank You!</h1>
          <p className="text-muted-foreground">
            Your responses have been submitted successfully.
          </p>
        </div>
      </div>
    );
  }

  const questionnaireData = questionnaireId
    ? getQuestionnaireData(questionnaireId)
    : null;

  if (!questionnaireData || !sessionId || !storageKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">Questionnaire not found</p>
        </div>
      </div>
    );
  }

  return (
    <MobileQuestionnaireReader
      questionnaire={questionnaireData}
      onSubmit={handleSubmit}
    />
  );
}
