import { Hero } from "@/components/marketing/Hero";
import { Features } from "@/components/marketing/Features";
import { ValueProposition } from "@/components/marketing/ValueProposition";

export function HomePage() {
  return (
    <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <ValueProposition />
        <Features />
      </div>
    </div>
  );
}
