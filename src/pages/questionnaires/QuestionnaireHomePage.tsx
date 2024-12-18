// Note: Layout concerns are handled by parent App.tsx:
// - container width
// - horizontal padding
// - flex layout
// - main tag wrapper
// Only page-specific spacing (py-24) is handled here

import { Card } from "@/components/ui/card";
import { QuestionnaireActionDialog } from "@/components/features/questionnaires/QuestionnaireActionDialog";
import { useState } from "react";

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  category: "knee" | "hip" | "ankle" | "general";
}

const questionnaires: Questionnaire[] = [
  {
    id: "koos",
    title: "KOOS",
    description: "Knee injury and Osteoarthritis Outcome Score",
    category: "knee",
  },
  {
    id: "hoos",
    title: "HOOS",
    description: "Hip disability and Osteoarthritis Outcome Score",
    category: "hip",
  },
  {
    id: "satisfaction",
    title: "Patient Satisfaction",
    description: "Brief survey about your healthcare experience",
    category: "general",
  },
];

export function QuestionnaireHomePage() {
  const [selectedQuestionnaire, setSelectedQuestionnaire] =
    useState<Questionnaire | null>(null);

  return (
    <div className="py-24">
      <h1 className="text-3xl font-bold">Questionnaires</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {questionnaires.map((questionnaire) => (
          <div
            key={questionnaire.id}
            onClick={() => setSelectedQuestionnaire(questionnaire)}
            className="cursor-pointer"
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold">{questionnaire.title}</h2>
              <p className="text-gray-600 mt-2">{questionnaire.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                  {questionnaire.category}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <QuestionnaireActionDialog
        open={selectedQuestionnaire !== null}
        onOpenChange={(open) => !open && setSelectedQuestionnaire(null)}
        questionnaireName={selectedQuestionnaire?.title ?? ""}
        questionnaireId={selectedQuestionnaire?.id ?? ""}
      />
    </div>
  );
}
