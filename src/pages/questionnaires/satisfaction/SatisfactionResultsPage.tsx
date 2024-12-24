import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { QuestionnaireResponse } from "@/lib/types/questionnaire.types";

export function SatisfactionResultsPage() {
  const navigate = useNavigate();
  const [response, setResponse] = useState<QuestionnaireResponse | null>(null);

  useEffect(() => {
    const storedResponses = localStorage.getItem("satisfactionResponses");
    if (!storedResponses) {
      navigate("/questionnaires/satisfaction");
      return;
    }

    try {
      const responses = JSON.parse(storedResponses) as QuestionnaireResponse;
      setResponse(responses);
    } catch (error) {
      console.error("Error parsing results:", error);
      navigate("/questionnaires/satisfaction");
    }
  }, [navigate]);

  if (!response) {
    return <div className="text-foreground">Loading results...</div>;
  }

  const getSatisfactionEmoji = (score: number) => {
    switch (score) {
      case 5:
        return "😄";
      case 4:
        return "🙂";
      case 3:
        return "😐";
      case 2:
        return "🙁";
      case 1:
        return "😞";
      default:
        return "❓";
    }
  };

  const getSatisfactionText = (score: number) => {
    switch (score) {
      case 5:
        return "Mycket nöjd";
      case 4:
        return "Nöjd";
      case 3:
        return "Neutral";
      case 2:
        return "Missnöjd";
      case 1:
        return "Mycket missnöjd";
      default:
        return "Okänt";
    }
  };

  const handleRetake = () => {
    localStorage.removeItem("satisfactionResponses");
    window.dispatchEvent(new Event("storage")); // Trigger storage event to update state
  };

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Resultat - Patientnöjdhet
        </h1>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-6 text-foreground">
            Din feedback
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <div
              className="text-6xl"
              role="img"
              aria-label={getSatisfactionText(Number(response["S1"]))}
            >
              {getSatisfactionEmoji(Number(response["S1"]))}
            </div>
            <div className="text-2xl font-medium text-foreground">
              {getSatisfactionText(Number(response["S1"]))}
            </div>
            <div className="text-muted-foreground">
              Poäng: {response["S1"]} av 5
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={handleRetake}>
            Ta enkäten igen
          </Button>
          <Button variant="outline" onClick={() => navigate("/questionnaires")}>
            Tillbaka till enkäter
          </Button>
        </div>
      </div>
    </div>
  );
}
