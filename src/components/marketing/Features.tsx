import React from "react";
import {
  QrCode,
  Clock,
  BarChart,
  Layout,
  Scan,
  Globe,
  FileText,
  MessageSquare,
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Features() {
  const physiotherapistFeatures: FeatureCard[] = [
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "Generate QR codes",
      description: "Create unique QR codes for any questionnaire instantly",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-time tracking",
      description: "Monitor questionnaire completion as it happens",
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Analysis tools",
      description: "Get insights from patient responses automatically",
    },
    {
      icon: <Layout className="h-6 w-6" />,
      title: "Visual dashboard",
      description: "Access all your data in an intuitive interface",
    },
  ];

  const patientFeatures: FeatureCard[] = [
    {
      icon: <Scan className="h-6 w-6" />,
      title: "Easy scanning",
      description: "Quick access to forms via QR code",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Multiple languages",
      description: "Support for various languages",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Simple forms",
      description: "User-friendly questionnaire interface",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Quick feedback",
      description: "Get immediate results and recommendations",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to manage your physiotherapy questionnaires
            effectively
          </p>
        </div>

        <div className="space-y-16">
          {/* For Physiotherapists */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-gray-900">
              For Physiotherapists
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {physiotherapistFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-6 bg-white rounded-2xl 
                                                  shadow-sm ring-1 ring-gray-200 hover:ring-blue-500 
                                                  transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 
                                  transition-colors duration-200"
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Patients */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-gray-900">
              For Patients
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {patientFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-6 bg-white rounded-2xl 
                                                  shadow-sm ring-1 ring-gray-200 hover:ring-blue-500 
                                                  transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-100 
                                  transition-colors duration-200"
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {feature.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
