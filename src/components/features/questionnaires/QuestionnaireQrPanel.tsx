import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { database } from "@/lib/firebase";
import { ref, set, onValue } from "firebase/database";
import { ArrowLeft, Loader2 } from "lucide-react";

interface QuestionnaireQrPanelProps {
  questionnaire: {
    id: string;
    title: string;
  };
  onBack: () => void;
  onResponseReceived: () => void;
}

export function QuestionnaireQrPanel({
  questionnaire,
  onBack,
  onResponseReceived,
}: QuestionnaireQrPanelProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a unique session ID when component mounts
  useEffect(() => {
    const generateSession = async () => {
      setIsGenerating(true);
      setError(null);
      try {
        // Generate a unique ID (timestamp + random string)
        const newSessionId = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 7)}`;

        // Create a new session in Firebase with additional metadata
        const sessionRef = ref(database, `sessions/${newSessionId}`);
        await set(sessionRef, {
          questionnaireId: questionnaire.id,
          status: "pending",
          created: Date.now(),
          readerType: "mobile", // Specify that this is for mobile reader
          responses: null, // Will be populated when patient submits
          metadata: {
            source: "qr_code",
            questionnaireTitle: questionnaire.title,
          },
        });

        setSessionId(newSessionId);

        // Listen for responses
        onValue(sessionRef, (snapshot) => {
          const data = snapshot.val();
          if (data?.status === "completed" && data?.responses) {
            onResponseReceived();
          }
        });
      } catch (err) {
        setError("Failed to generate QR code. Please try again.");
        console.error("Error generating session:", err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateSession();
  }, [questionnaire.id, questionnaire.title, onResponseReceived]);

  const qrUrl = sessionId ? `${window.location.origin}/fill/${sessionId}` : "";

  return (
    <div className="animate-in slide-in-from-right h-full">
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="p-6">
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-2">{questionnaire.title}</h3>
          <p className="text-muted-foreground mb-6">
            Scan this QR code to fill out the questionnaire
          </p>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                Generating QR code...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg border-destructive">
              <p className="text-sm text-destructive">{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : sessionId ? (
            <div className="flex flex-col items-center">
              <div className="p-4 bg-white rounded-lg">
                <QRCodeSVG value={qrUrl} size={200} level="H" includeMargin />
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Session ID: {sessionId}
              </p>
              <p className="mt-2 text-xs text-muted-foreground break-all">
                URL: {qrUrl}
              </p>
              {window.location.hostname === "localhost" && (
                <p className="mt-2 text-xs text-yellow-500">
                  Note: For mobile testing, use ngrok URL:
                  https://safe-newly-salmon.ngrok-free.app/fill/{sessionId}
                </p>
              )}
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
