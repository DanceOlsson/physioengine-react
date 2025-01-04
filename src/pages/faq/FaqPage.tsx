import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is PhysioEngine?",
    answer:
      "PhysioEngine is a modern web application designed for physiotherapists to administer and analyze standardized medical questionnaires. It supports various assessment tools including KOOS, HOOS, DASH, and satisfaction questionnaires.",
  },
  {
    question: "How do I use the questionnaires?",
    answer:
      "Navigate to the Tools menu and select 'Patient Questionnaires'. Choose the appropriate questionnaire for your needs. You can administer the questionnaire directly to patients, and the results will be automatically calculated and presented in an easy-to-understand format.",
  },
  {
    question: "Are my questionnaire responses saved?",
    answer:
      "Yes, all questionnaire responses are automatically saved in your browser's local storage. This means you can safely close the browser and return later to continue where you left off.",
  },
  {
    question: "Can I use PhysioEngine on mobile devices?",
    answer:
      "Yes, PhysioEngine is fully responsive and works on all devices including smartphones and tablets. The interface automatically adjusts to provide the best experience for your screen size.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take data security seriously. All data is stored locally in your browser by default. We do not collect or store any patient information on our servers unless explicitly configured to do so.",
  },
];

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16 2xl:mt-20 3xl:mt-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about PhysioEngine
          </p>
        </div>

        <div className="grid gap-6">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {faq.answer}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            Can't find what you're looking for?{" "}
            <a
              href="#contact"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
