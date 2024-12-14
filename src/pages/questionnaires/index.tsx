import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Questionnaire {
  id: string;
  title: string;
  description: string;
  category: "knee" | "hip" | "ankle";
}

const questionnaires: Questionnaire[] = [
  {
    id: "koos",
    title: "KOOS",
    description: "Knee injury and Osteoarthritis Outcome Score",
    category: "knee",
  },
  // Add more questionnaires here
];

export function QuestionnairesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Questionnaires</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {questionnaires.map((questionnaire) => (
          <Link
            key={questionnaire.id}
            to={`/questionnaires/${questionnaire.id}`}
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
          </Link>
        ))}
      </div>
    </div>
  );
}