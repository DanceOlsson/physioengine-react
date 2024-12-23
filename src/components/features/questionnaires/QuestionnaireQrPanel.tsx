import { useState, useEffect, useRef } from "react";
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
  const [qrSize, setQrSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        // Account for padding and other elements (200px buffer)
        const availableHeight = window.innerHeight - 200;
        // Use the smaller of width/height while maintaining maximum bounds
        const size = Math.min(
          containerWidth - 48, // Account for padding (24px on each side)
          availableHeight,
          500 // Maximum size
        );
        setQrSize(size);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
    <div className="animate-in slide-in-from-right h-full flex flex-col">
      <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="p-6 flex-1 overflow-auto">
        <Card className="p-6" ref={containerRef}>
          <div className="space-y-6 overflow-y-auto">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {questionnaire.title}
              </h3>
              <p className="text-muted-foreground mb-6">
                Scan this QR code to fill out the questionnaire
              </p>
            </div>

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
              <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
                <div
                  className="flex items-center justify-center bg-white rounded-lg p-6"
                  style={{ width: qrSize, height: qrSize }}
                >
                  <QRCodeSVG
                    value={qrUrl}
                    size={qrSize - 48}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="w-full mt-6 space-y-4">
                  <div className="bg-accent/50 rounded-lg p-4 space-y-2">
                    <h3 className="font-medium">Enhanced Mobile Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      We've designed a smooth, engaging questionnaire experience
                      for your patients:
                    </p>
                    <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                      <li>Simple one-question-at-a-time format</li>
                      <li>Satisfying animations and interactions</li>
                      <li>Easy to navigate back and forth</li>
                      <li>Clear progress indication</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Session ID: {sessionId}
                    </p>
                    <p className="text-xs text-muted-foreground break-all">
                      URL: {qrUrl}
                    </p>
                    {window.location.hostname === "localhost" && (
                      <p className="text-xs text-yellow-500">
                        Note: For mobile testing, use ngrok URL:
                        https://safe-newly-salmon.ngrok-free.app/fill/
                        {sessionId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
