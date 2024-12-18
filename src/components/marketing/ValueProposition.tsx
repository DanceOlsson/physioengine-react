import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import showQrCodeImage from "@/assets/images/marketing/physical-therapy-qr-code-consultation-side-view.webp";
import resultsImage from "@/assets/images/marketing/physical-therapy-results-doctor-patient-table.webp";
import { useEffect, useRef, useState } from "react";
import { QrCode, Scan, ClipboardList, LineChart } from "lucide-react";

interface ValuePropositionProps {
  className?: string;
}

interface BenefitProps {
  imageUrl: string;
  altText: string;
  description: string;
  imagePosition: "left" | "right";
}

const Benefit = ({ imageUrl, altText, imagePosition }: BenefitProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(
    imagePosition === "left" ? -100 : 100
  );

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Calculate how far through the viewport the element is (0 to 1)
          const viewportProgress = entry.intersectionRatio;
          // Calculate the center point of the element relative to the viewport
          const boundingRect = entry.boundingClientRect;
          const elementCenter = boundingRect.top + boundingRect.height / 2;
          const windowCenter = window.innerHeight / 2;
          const distanceFromCenter = Math.abs(elementCenter - windowCenter);
          const maxDistance = window.innerHeight / 2;
          const centerProgress =
            1 - Math.min(distanceFromCenter / maxDistance, 1);

          // Combine both metrics for smooth animation
          const progress = (viewportProgress + centerProgress) / 2;

          // Calculate translation based on position and progress
          const baseTranslate = imagePosition === "left" ? -100 : 100;
          const newTranslate = baseTranslate * (1 - progress);

          setTranslateX(newTranslate);
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: Array.from({ length: 20 }, (_, i) => i / 19), // Create 20 thresholds
      rootMargin: "0px",
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [imagePosition]);

  const steps =
    imagePosition === "left"
      ? [
          {
            icon: <QrCode className="w-6 h-6 text-primary" />,
            text: "Find relevant questionnaire, show a QR code on your screen",
          },
          {
            icon: <Scan className="w-6 h-6 text-primary" />,
            text: "Your patient scans it with their phone. Patient can then easily fill in the questionnaire",
          },
        ]
      : [
          {
            icon: <ClipboardList className="w-6 h-6 text-primary" />,
            text: "As soon as they're done, you see their results right away",
          },
          {
            icon: <LineChart className="w-6 h-6 text-primary" />,
            text: "Quickly understand their condition and plan treatment, all in one place",
          },
        ];

  return (
    <div className="flex flex-col md:flex-row items-start gap-0 py-12 relative">
      {imagePosition === "left" && (
        <div
          ref={imageRef}
          className="relative w-full md:w-3/4 transition-transform duration-300 ease-out h-[450px] -ml-32"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-background via-background/25 to-transparent z-10" />
          <img
            src={imageUrl}
            alt={altText}
            className="rounded-[2rem] w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div
        className={`w-full md:w-1/2 flex flex-col min-h-[450px] md:pt-20 z-10 
        ${imagePosition === "left" ? "-ml-24" : "-mr-24"}`}
      >
        <div className="flex-grow">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 group">
                <div className="pt-1">{step.icon}</div>
                <p className="text-xl text-foreground leading-relaxed">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`mt-16 ${
            imagePosition === "left" ? "text-right" : "text-left"
          }`}
        >
          <Button variant="default" size="lg">
            Explore All Tools
          </Button>
        </div>
      </div>
      {imagePosition === "right" && (
        <div
          ref={imageRef}
          className="relative w-full md:w-3/4 transition-transform duration-300 ease-out h-[450px] -mr-32"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/25 to-transparent z-10" />
          <img
            src={imageUrl}
            alt={altText}
            className="rounded-[2rem] w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export function ValueProposition({ className }: ValuePropositionProps) {
  return (
    <section className={cn("container mx-auto px-4 py-16", className)}>
      <div className="space-y-16">
        <Benefit
          imageUrl={showQrCodeImage}
          altText="Physical therapist showing QR code to patient for easy consultation"
          description="Find relevant questionnaire, show a QR code on your screen, and your patient scans it with their phone. Patient can then easily fill in the questionnaire."
          imagePosition="left"
        />
        <Benefit
          imageUrl={resultsImage}
          altText="Physical therapist reviewing results with patient"
          description="As soon as they're done, you see their results right away. Quickly understand their condition and plan treatment, all in one place."
          imagePosition="right"
        />
      </div>
    </section>
  );
}
