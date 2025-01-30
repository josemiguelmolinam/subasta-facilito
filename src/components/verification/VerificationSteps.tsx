import { Check, AlertCircle, Clock } from "lucide-react";
import { VerificationStep } from "@/types/verification";

interface VerificationStepsProps {
  steps: VerificationStep[];
  currentStep: number;
}

export const VerificationSteps = ({ steps, currentStep }: VerificationStepsProps) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center space-x-4 p-4 rounded-lg border ${
            index === currentStep
              ? "border-auction-primary bg-auction-soft"
              : "border-gray-200"
          }`}
        >
          <div
            className={`rounded-full p-2 ${
              step.status === "completed"
                ? "bg-green-100 text-green-600"
                : step.status === "error"
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {step.status === "completed" ? (
              <Check className="h-5 w-5" />
            ) : step.status === "error" ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <Clock className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};