import { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { database } from "@/lib/firebase";
import { ref, set, onValue } from "firebase/database";
import { ArrowLeft, Loader2 } from "lucide-react";
import { KoosResultsPage } from "@/pages/questionnaires/koos/KoosResultsPage";
import { HoosResultsPage } from "@/pages/questionnaires/hoos/HoosResultsPage";
import { DashResultsPage } from "@/pages/questionnaires/dash/DashResultsPage";
import { SefasResultsPage } from "@/pages/questionnaires/sefas/SefasResultsPage";
import { Eq5dResultsPage } from "@/pages/questionnaires/eq5d/Eq5dResultsPage";

interface QuestionnaireQrPanelProps {
  questionnaire: {
    id: string;
    title: string;
  };
  onBack: () => void;
  onResponseReceived: () => void;
}

const getStorageKey = (questionnaireId: string) => {
  switch (questionnaireId) {
    case "koos":
      return "koosResponses";
    case "hoos":
      return "hoosResponses";
    case "dash":
      return "dashResponses";
    case "satisfaction":
      return "satisfactionResponses";
    case "sefas":
      return "sefasResponses";
    case "eq5d":
      return "eq5dResponses";
    default:
      return null;
  }
};

const ResultsComponent = ({ questionnaireId }: { questionnaireId: string }) => {
  switch (questionnaireId) {
    case "koos":
      return <KoosResultsPage />;
    case "hoos":
      return <HoosResultsPage />;
    case "dash":
      return <DashResultsPage />;
    case "sefas":
      return <SefasResultsPage />;
    case "eq5d":
      return <Eq5dResultsPage />;
    default:
      return null;
  }
};

export function QuestionnaireQrPanel({
  questionnaire,
  onBack,
  onResponseReceived,
}: QuestionnaireQrPanelProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [qrSize, setQrSize] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [progress, setProgress] = useState<{
    current: number;
    total: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.clientWidth;
        // Calculate available height by considering the container's position
        const containerRect = container.getBoundingClientRect();
        const availableHeight = window.innerHeight - containerRect.top - 100; // 100px buffer for bottom margin

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

        const storageKey = getStorageKey(questionnaire.id);
        if (!storageKey) {
          throw new Error("Invalid questionnaire ID");
        }

        // Create a new session in Firebase with additional metadata
        const sessionRef = ref(database, `sessions/${newSessionId}`);
        await set(sessionRef, {
          questionnaireId: questionnaire.id,
          storageKey,
          status: "pending",
          created: Date.now(),
          readerType: "mobile", // Specify that this is for mobile reader
          responses: null, // Will be populated when patient submits
          progress: {
            current: 0,
            total: 0,
          },
          metadata: {
            source: "qr_code",
            questionnaireTitle: questionnaire.title,
          },
        });

        // Listen for responses and progress
        onValue(sessionRef, (snapshot) => {
          const data = snapshot.val();
          if (data?.progress) {
            setProgress(data.progress);
          }
          if (data?.status === "completed" && data?.responses) {
            localStorage.setItem(storageKey, JSON.stringify(data.responses));
            setShowResults(true);
            onResponseReceived();
          }
        });

        setSessionId(newSessionId);
      } catch (err) {
        console.error("Failed to generate QR code:", err);
        setError("Failed to generate QR code. Please try again.");
      } finally {
        setIsGenerating(false);
      }
    };

    generateSession();
  }, [questionnaire.id, questionnaire.title, onResponseReceived]);

  const qrUrl = sessionId ? `${window.location.origin}/fill/${sessionId}` : "";

  if (showResults) {
    return (
      <div className="animate-in slide-in-from-right h-full flex flex-col">
        <div className="p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <div className="p-6 flex-1 overflow-auto">
          <ResultsComponent questionnaireId={questionnaire.id} />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in slide-in-from-right h-full flex flex-col">
      <div className="md:hidden p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // Go back to list instead of empty state
            onBack();
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>

      <div className="p-6 flex-1 overflow-auto">
        <Card className="w-full max-w-lg mx-auto" ref={containerRef}>
          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-1">
                {questionnaire.title}
              </h3>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  <p>1. Show this QR code to your patient</p>
                  <p>2. Patient scans the code with their phone camera</p>
                  <p>3. Patient fills out the questionnaire on their device</p>
                  <p>4. Results will appear automatically on your screen</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
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
                  {/* Progress bar - only show if progress exists and patient has started (current > 0) */}
                  {progress && progress.current > 0 && !showResults && (
                    <div className="w-full mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Patient's Progress</span>
                        <span>
                          {Math.round(
                            (progress.current / progress.total) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{
                            width: `${
                              (progress.current / progress.total) * 100
                            }%`,
                          }}
                        />
                      </div>
                      {progress.total > 0 && (
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                          Question {progress.current} of {progress.total}
                        </p>
                      )}
                    </div>
                  )}
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
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
