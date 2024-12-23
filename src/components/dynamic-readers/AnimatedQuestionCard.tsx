import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuestionOption {
  value: string | number;
  text: string;
}

interface AnimatedQuestionCardProps {
  question: {
    id: string;
    text: string;
    options?: QuestionOption[];
    type?: "text";
  };
  onResponse: (value: string | number) => void;
  onConfirm: () => void;
}

export function AnimatedQuestionCard({
  question,
  onResponse,
  onConfirm,
}: AnimatedQuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | number | null>(
    null
  );
  const [confirmedOption, setConfirmedOption] = useState<
    string | number | null
  >(null);

  const handleOptionClick = (value: string | number) => {
    if (selectedOption === value) {
      // Confirm the selection
      setConfirmedOption(value);
      onResponse(value);
      onConfirm();
    } else {
      // First click - select the option
      setSelectedOption(value);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <h2 className="text-xl font-medium mb-6 text-foreground">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = selectedOption === option.value;
          const isConfirmed = confirmedOption === option.value;

          return (
            <motion.button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-lg border text-left transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isSelected && !isConfirmed && "border-primary",
                isConfirmed && "bg-primary text-primary-foreground",
                !isSelected && !isConfirmed && "border-input"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-base">{option.text}</span>

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      isConfirmed ? "bg-primary-foreground" : "bg-primary"
                    )}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        isConfirmed ? "text-primary" : "text-primary-foreground"
                      )}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {isSelected && !isConfirmed && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      "0 0 0px rgba(0,0,0,0)",
                      "0 0 15px rgba(var(--primary),0.3)",
                      "0 0 0px rgba(0,0,0,0)",
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
