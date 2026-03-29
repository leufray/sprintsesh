const TOTAL_STEPS = 4;

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const step = i + 1;
        let cls = "step-dot";
        if (step < current) cls += " complete";
        else if (step === current) cls += " active";
        return <div key={step} className={cls} />;
      })}
    </div>
  );
}
