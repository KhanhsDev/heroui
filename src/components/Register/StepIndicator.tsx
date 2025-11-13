import { CheckIcon } from "../icons";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center relative">
      {/* Vertical connecting line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[2rem] bottom-[2rem] w-[0.1rem] bg-[var(--border-secondary)]" />

      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={index}
            className="relative flex items-center justify-center"
            style={{ marginTop: index === 0 ? 0 : "4.8rem" }}
          >
            <div
              className={`size-[4rem] rounded-[1.6rem] flex items-center justify-center relative z-10 ${
                isCompleted
                  ? "bg-[var(--bg-success)] border-[var(--border-success)]"
                  : isActive
                    ? "bg-[var(--bg-secondary)] border-[var(--border-active)]"
                    : "bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card)] via-[var(--bg-tertiary)] border-[var(--border-secondary)]"
              } border`}
            >
              {isCompleted ? (
                <CheckIcon />
              ) : (
                <p
                  className={`text-[1.8rem] ${isActive ? "text-[var(--text-brand-name)]" : "text-[var(--text-tertiary)]"}`}
                >
                  {stepNumber}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
