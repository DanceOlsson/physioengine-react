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
    <section id="features" className="relative py-16 sm:py-24">
      <div className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent to-background" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground px-4">
            Everything you need to manage your physiotherapy questionnaires
            effectively
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {/* For Physiotherapists */}
          <div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-foreground px-2">
              For Physiotherapists
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {physiotherapistFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-4 sm:p-6 bg-card rounded-2xl 
                            shadow-sm ring-1 ring-border hover:ring-primary 
                            transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <div
                      className="p-2 bg-primary/10 rounded-lg text-primary shrink-0
                                  group-hover:bg-primary/20 transition-colors duration-200"
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-foreground">
                        {feature.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
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
            <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8 text-foreground px-2">
              For Patients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
              {patientFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group relative p-4 sm:p-6 bg-card rounded-2xl 
                            shadow-sm ring-1 ring-border hover:ring-primary 
                            transition-all duration-200 hover:shadow-md"
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <div
                      className="p-2 bg-accent rounded-lg text-accent-foreground shrink-0
                                  group-hover:bg-accent/80 transition-colors duration-200"
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium text-foreground">
                        {feature.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
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
