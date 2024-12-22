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
  const [error, setError] = useState<{
    message: string;
    isFirebaseError?: boolean;
  } | null>(null);
  const [questionnaireId, setQuestionnaireId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) return;

      try {
        const sessionRef = ref(database, `sessions/${sessionId}`);
        const snapshot = await get(sessionRef);

        if (!snapshot.exists()) {
          setError({ message: "Session not found" });
          return;
        }

        const data = snapshot.val();

        if (data.status === "completed") {
          setSubmitted(true);
          return;
        }

        setQuestionnaireId(data.questionnaireId);
      } catch (err) {
        console.error("Error fetching session:", err);
        // Check if it's likely a connection error
        const isFirebaseError =
          err instanceof Error &&
          (err.message.includes("fetch") ||
            err.message.includes("network") ||
            err.message.includes("connection"));

        setError({
          message: isFirebaseError
            ? "Unable to connect to the questionnaire service. Please check if you have an ad blocker enabled and disable it for this site."
            : "Failed to load session",
          isFirebaseError,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleSubmit = async (responses: Record<string, number | string>) => {
    if (!sessionId) return;

    try {
      setLoading(true);
      const sessionRef = ref(database, `sessions/${sessionId}`);

      await update(sessionRef, {
        responses,
        status: "completed",
        completedAt: Date.now(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting responses:", err);
      const isFirebaseError =
        err instanceof Error &&
        (err.message.includes("fetch") ||
          err.message.includes("network") ||
          err.message.includes("connection"));

      setError({
        message: isFirebaseError
          ? "Unable to submit responses. Please check if you have an ad blocker enabled and disable it for this site."
          : "Failed to submit responses",
        isFirebaseError,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="text-xl font-semibold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          {error.isFirebaseError && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Common ad blockers that might cause this:
              </p>
              <ul className="text-sm text-muted-foreground list-disc list-inside">
                <li>uBlock Origin</li>
                <li>AdBlock Plus</li>
                <li>Privacy Badger</li>
              </ul>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="mt-4"
              >
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

  if (!questionnaireData || !sessionId) {
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
