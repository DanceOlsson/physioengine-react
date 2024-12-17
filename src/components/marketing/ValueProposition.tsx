import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import showQrCodeImage from "@/assets/images/marketing/physical-therapy-qr-code-consultation-side-view.webp";
import resultsImage from "@/assets/images/marketing/physical-therapy-results-doctor-patient-table.webp";
import { useEffect, useRef, useState } from "react";

interface ValuePropositionProps {
  className?: string;
}

interface BenefitProps {
  imageUrl: string;
  altText: string;
  description: string;
  imagePosition: "left" | "right";
}

const Benefit = ({
  imageUrl,
  altText,
  description,
  imagePosition,
}: BenefitProps) => {
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

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 py-12">
      {imagePosition === "left" && (
        <div
          ref={imageRef}
          className="w-full md:w-1/2 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          <img
            src={imageUrl}
            alt={altText}
            className="rounded-lg shadow-lg w-full h-auto"
            loading="lazy"
          />
        </div>
      )}
      <div className="w-full md:w-1/2 space-y-4">
        <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        <Button variant="default" size="lg" className="w-full md:w-auto">
          Explore All Tools
        </Button>
      </div>
      {imagePosition === "right" && (
        <div
          ref={imageRef}
          className="w-full md:w-1/2 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${translateX}px)` }}
        >
          <img
            src={imageUrl}
            alt={altText}
            className="rounded-lg shadow-lg w-full h-auto"
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
