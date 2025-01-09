// Import necessary UI components from shadcn/ui library and React hooks
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import PlagiocephalyChart from "@/components/features/charts/PlagiocephalyChart";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";

// Define the shape of our measurements data with TypeScript
interface CranialMeasurements {
  age: number | null;
  circumference: number | null;
  length: number | null;
  width: number | null;
  cephalicIndex: number | null;
  diagonal1: number | null;
  diagonal2: number | null;
  cva: number | null; // Cranial Vault Asymmetry
  cvai: number | null; // Cranial Vault Asymmetry Index
}

export default function CranialPage() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  // Initialize state to store all measurements, starting with null values
  const [measurements, setMeasurements] = useState<CranialMeasurements>({
    age: null,
    circumference: null,
    length: null,
    width: null,
    cephalicIndex: null,
    diagonal1: null,
    diagonal2: null,
    cva: null,
    cvai: null,
  });

  // ---------------------------
  // Cephalic Index Calculations
  // Calculate and interpret the ratio between head width and length
  // ---------------------------
  const calculateCephalicIndex = (length: number, width: number): number => {
    return (width / length) * 100;
  };

  const interpretCephalicIndex = (index: number): string => {
    if (index < 75) return "Dolichocephalic (Long-headed)";
    if (index <= 83) return "Mesocephalic (Medium-headed)";
    return "Brachycephalic (Broad-headed)";
  };

  // -----------------------------------
  // Plagiocephaly (CVA & CVAI) Helpers
  // Calculate and interpret skull asymmetry measurements
  // -----------------------------------
  const calculateCVA = (d1: number, d2: number): number => {
    return Math.abs(d1 - d2);
  };

  const calculateCVAI = (d1: number, d2: number): number => {
    const cvaValue = calculateCVA(d1, d2);
    const larger = Math.max(d1, d2);
    return (cvaValue / larger) * 100;
  };

  const interpretCVAI = (cvai: number): string => {
    // Example interpretation thresholds:
    // - < 3.5%: No significant plagiocephaly
    // - 3.5–6.5%: Mild
    // - 6.5–8.75%: Moderate
    // - > 8.75%: Severe
    if (cvai < 3.5) return "No significant plagiocephaly";
    if (cvai < 6.5) return "Mild plagiocephaly";
    if (cvai < 8.75) return "Moderate plagiocephaly";
    return "Severe plagiocephaly";
  };

  // -----------------------------------
  // Handle Input Changes
  // Process user input and update measurements state
  // Automatically calculate derived values when relevant inputs change
  // -----------------------------------
  const handleInputChange = (
    name: keyof CranialMeasurements,
    value: string
  ) => {
    const numValue = value === "" ? null : parseFloat(value);

    setMeasurements((prev) => {
      const newMeasurements = {
        ...prev,
        [name]: numValue,
      };

      // Calculate Cephalic Index if length and width are available
      if (name === "length" || name === "width") {
        const length = name === "length" ? numValue : prev.length;
        const width = name === "width" ? numValue : prev.width;

        if (length && width) {
          newMeasurements.cephalicIndex = calculateCephalicIndex(length, width);
        } else {
          newMeasurements.cephalicIndex = null;
        }
      }

      // Calculate CVA & CVAI if diagonal1 & diagonal2 are available
      if (name === "diagonal1" || name === "diagonal2") {
        const d1 = name === "diagonal1" ? numValue : prev.diagonal1;
        const d2 = name === "diagonal2" ? numValue : prev.diagonal2;

        if (d1 && d2) {
          newMeasurements.cva = calculateCVA(d1, d2);
          newMeasurements.cvai = calculateCVAI(d1, d2);
        } else {
          newMeasurements.cva = null;
          newMeasurements.cvai = null;
        }
      }

      return newMeasurements;
    });
  };

  // Main component render with three sections:
  // 1. Input form for measurements
  // 2. Results display showing calculations
  // 3. Information section explaining the measurements
  return (
    <div
      className={cn(
        // Base container
        "px-4 w-full",
        // Fixed positioning
        "fixed top-[64px] bottom-0 left-0 right-0",
        // Header offset for different screen sizes
        "2xl:top-[80px] 3xl:top-[96px]",
        // Overflow handling
        "overflow-y-auto"
      )}
    >
      <div
        className={cn(
          // Base layout
          "mx-auto w-full space-y-6",
          // Responsive padding
          "py-6 2xl:py-8 3xl:py-10",
          // Responsive max-width
          "max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] 2xl:max-w-[75%]"
        )}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Cranial Measurements</h1>
          <p className="text-lg text-muted-foreground">
            Calculate and analyze cranial measurements including the cephalic
            index and asymmetry indicators.
          </p>
        </div>

        <div
          className={cn(
            // Base grid
            "grid gap-6",
            // Single column on mobile, 30/70 split on desktop
            "grid-cols-1 lg:grid-cols-[30%_70%]",
            // Responsive width
            "w-full"
          )}
        >
          {/* Input Card */}
          <Card className="lg:sticky lg:top-[80px] w-full h-fit">
            <CardHeader>
              <CardTitle>Input Measurements</CardTitle>
              <CardDescription>
                Enter the cranial measurements in centimeters (cm).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Age Input */}
              <div className="space-y-2">
                <Label htmlFor="age">Age (months)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="age"
                    type="number"
                    step="1"
                    min="0"
                    max="18"
                    placeholder="Enter age in months"
                    value={measurements.age ?? ""}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                  <span className="text-sm text-gray-500">months</span>
                </div>
                {measurements.age !== null &&
                  (measurements.age < 0 || measurements.age > 18) && (
                    <p className="text-sm text-red-500">
                      Age must be between 0 and 18 months
                    </p>
                  )}
              </div>

              {/* Head Circumference */}
              <div className="space-y-2">
                <Label htmlFor="circumference">Head Circumference</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="circumference"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter measurement"
                    value={measurements.circumference ?? ""}
                    onChange={(e) =>
                      handleInputChange("circumference", e.target.value)
                    }
                  />
                  <span className="text-sm text-gray-500">cm</span>
                </div>
              </div>

              {/* Head Length */}
              <div className="space-y-2">
                <Label htmlFor="length">Head Length (OFD)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="length"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter measurement"
                    value={measurements.length ?? ""}
                    onChange={(e) =>
                      handleInputChange("length", e.target.value)
                    }
                  />
                  <span className="text-sm text-gray-500">cm</span>
                </div>
              </div>

              {/* Head Width */}
              <div className="space-y-2">
                <Label htmlFor="width">Head Width (BPD)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="width"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Enter measurement"
                    value={measurements.width ?? ""}
                    onChange={(e) => handleInputChange("width", e.target.value)}
                  />
                  <span className="text-sm text-gray-500">cm</span>
                </div>
              </div>

              {/* Diagonal 1 (D1) */}
              <div className="space-y-2">
                <Label htmlFor="diagonal1">Diagonal 1 (D1)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="diagonal1"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Forehead Right → Occiput Left"
                    value={measurements.diagonal1 ?? ""}
                    onChange={(e) =>
                      handleInputChange("diagonal1", e.target.value)
                    }
                  />
                  <span className="text-sm text-gray-500">cm</span>
                </div>
              </div>

              {/* Diagonal 2 (D2) */}
              <div className="space-y-2">
                <Label htmlFor="diagonal2">Diagonal 2 (D2)</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="diagonal2"
                    type="number"
                    step="0.1"
                    min="0"
                    placeholder="Forehead Left → Occiput Right"
                    value={measurements.diagonal2 ?? ""}
                    onChange={(e) =>
                      handleInputChange("diagonal2", e.target.value)
                    }
                  />
                  <span className="text-sm text-gray-500">cm</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Card */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Results</CardTitle>
              <CardDescription>
                Analysis of the cranial measurements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cephalic Index Results */}
              {measurements.cephalicIndex && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Cephalic Index
                    </Label>
                    <p className="text-2xl font-semibold">
                      {measurements.cephalicIndex.toFixed(1)}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Classification
                    </Label>
                    <p className="text-lg">
                      {interpretCephalicIndex(measurements.cephalicIndex)}
                    </p>
                  </div>
                </>
              )}
              {!measurements.cephalicIndex && (
                <p className="text-muted-foreground italic">
                  Enter head length and width to calculate the cephalic index.
                </p>
              )}

              {/* CVA & CVAI Results */}
              {measurements.cva !== null && measurements.cvai !== null && (
                <>
                  <div>
                    <Label className="text-muted-foreground">
                      Cranial Vault Asymmetry (CVA)
                    </Label>
                    <p className="text-2xl font-semibold">
                      {measurements.cva.toFixed(1)} mm
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">
                      Cranial Vault Asymmetry Index (CVAI)
                    </Label>
                    <p className="text-2xl font-semibold">
                      {measurements.cvai.toFixed(2)} %
                    </p>
                  </div>
                  <div className="mt-4">
                    <PlagiocephalyChart
                      cvai={measurements.cvai}
                      age={measurements.age ?? 0}
                    />
                  </div>
                  <div className="mt-4">
                    <Label className="text-muted-foreground">
                      Plagiocephaly Classification
                    </Label>
                    <p className="text-lg">
                      {interpretCVAI(measurements.cvai)}
                    </p>
                  </div>
                </>
              )}
              {(measurements.cva === null || measurements.cvai === null) && (
                <p className="text-muted-foreground italic">
                  Enter both diagonal measurements (D1, D2) to calculate CVA and
                  CVAI.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>About Cranial Measurements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Cephalic Index (CI)</h3>
              <p className="text-muted-foreground">
                The cephalic index is a numerical expression of the ratio
                between the width and length of the skull:
                <br />
                <code>(Head Width / Head Length) × 100</code>
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                <li>Dolichocephalic (Long-headed): &lt; 75</li>
                <li>Mesocephalic (Medium-headed): 75–83</li>
                <li>Brachycephalic (Broad-headed): &gt; 83</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">
                Plagiocephaly (CVA &amp; CVAI)
              </h3>
              <p className="text-muted-foreground mb-2">
                Plagiocephaly involves asymmetrical skull flattening. Two
                diagonal measurements (D1 and D2) quantify the asymmetry.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>
                  <strong>CVA</strong> = |D1 – D2| (in mm)
                </li>
                <li>
                  <strong>CVAI</strong> = (|D1 – D2| / larger of D1 or D2) ×
                  100%
                </li>
              </ul>
              <p className="text-muted-foreground mt-2">
                <strong>Example Severity Ranges (CVAI):</strong>
                <br />
                • &lt; 3.5%: No significant plagiocephaly
                <br />
                • 3.5–6.5%: Mild
                <br />
                • 6.5–8.75%: Moderate
                <br />• &gt; 8.75%: Severe
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
