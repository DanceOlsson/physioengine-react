import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
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

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          Resultat - Patientnöjdhet
        </h1>

        <Card className="mb-8 p-6">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Din feedback
          </h2>
          <div className="text-lg text-muted-foreground">
            Nöjdhet med behandling:{" "}
            {response["S1"] === 4
              ? "Mycket nöjd"
              : response["S1"] === 3
              ? "Nöjd"
              : response["S1"] === 2
              ? "Neutral"
              : response["S1"] === 1
              ? "Missnöjd"
              : "Mycket missnöjd"}
          </div>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/questionnaires/satisfaction")}
          >
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
