"use client";
import React, { useState } from "react";
import BackgroundGradient from "@/components/Register/BackgroundGradient";
import BrandPanel from "@/components/Register/BrandPanel";
import Header from "@/components/Register/Header";
import Step1Content from "@/components/Register/Step1Content";
import Step2Content from "@/components/Register/Step2Content";
import StepIndicator from "@/components/Register/StepIndicator";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@/components/icons";
import Step3Content from "@/components/Register/Step3Content";
import Step4Content from "@/components/Register/Step4Content";

const RegisterComponent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen relative overflow-hidden">
      <div className="flex gap-[2.4rem] px-[2.4rem] relative">
        <BackgroundGradient />
        <div className="w-full flex flex-col">
          <Header />
          <div className="flex flex-row justify-center items-center">
            {/* Left Panel - Branding */}
            <div className="w-[36%] overflow-hidden">
              <BrandPanel />
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex flex-col relative min-w-[110.4rem] h-full">
              {/* Back Button */}
              <div
                onClick={() => {
                  if (currentStep === 1) {
                    router.push("/login");
                  } else {
                    setCurrentStep(currentStep - 1);
                  }
                }}
                className="flex items-center gap-[0.8rem] cursor-pointer pl-[6.3rem] pt-[6.3rem]"
              >
                <div className="flex items-center justify-center size-[4rem] rounded-[1.6rem] bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-tertiary)] to-[var(--bg-primary)]">
                  <ArrowBackIcon />
                </div>
                <p className="text-[1.8rem] text-[var(--text-tertiary)]">
                  Trở lại
                </p>
              </div>
              <div className="flex gap-[12.1rem] flex-1 pt-[7.6rem]">
                {/* Step Indicator */}
                <div className="flex-shrink-0 pl-[6.3rem]">
                  <StepIndicator
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                  />
                </div>

                {/* Form Content */}
                <div className="flex-1 flex justify-start pr-[6.3rem]">
                  <div className="w-full max-w-[55.8rem]">
                    {currentStep === 1 && <Step1Content onNext={handleNext} />}
                    {currentStep === 2 && <Step2Content onNext={handleNext} />}
                    {currentStep === 3 && <Step3Content onNext={handleNext} />}
                    {currentStep === 4 && <Step4Content />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
