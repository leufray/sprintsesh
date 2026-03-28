"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Zap, ArrowLeft, ArrowRight, Check } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";

const plans = [
  { id: "free", name: "Free", price: 0, credits: 10, features: ["10 credits included", "Preview only", "No agent execution", "No code output"], disabled: true },
  { id: "builder", name: "Builder", price: 50, credits: 1100, features: ["1,100 credits/mo", "100 free credits included", "Standard queue", "2-month rollover"], disabled: false },
  { id: "studio", name: "Studio", price: 150, credits: 3450, features: ["3,450 credits/mo", "450 free credits included", "Priority queue", "2-month rollover"], disabled: false },
  { id: "max", name: "Max", price: 250, credits: 6000, features: ["6,000 credits/mo", "1,000 free credits included", "Dedicated queue", "2-month rollover"], disabled: false },
];

const sprintCost = 1640;

export default function SubscriptionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("studio");
  const selectedPlan = plans.find((p) => p.id === selected)!;
  const isCovered = selectedPlan.credits >= sprintCost;
  const deficit = sprintCost - selectedPlan.credits;

  return (
    <AppShell hideTopbar>
      <div className="onboarding-content">
        <h1 className="page-title">Choose a subscription</h1>
        <p className="page-subtitle">
          Pick the plan that fits your build. You can upgrade or add credits anytime.
        </p>

        <div className="sub-requirement">
          <Zap size={16} />
          <span>Balanced &middot; Sprintimer</span>
          <span className="sub-requirement-credits">{sprintCost.toLocaleString()} credits</span>
        </div>

        <div className="sub-plans">
          {plans.map((plan) => (
            <button
              key={plan.id}
              className={`sub-plan-card${selected === plan.id ? " sub-plan-card--selected" : ""}${plan.disabled ? " sub-plan-card--disabled" : ""}`}
              onClick={() => !plan.disabled && setSelected(plan.id)}
              disabled={plan.disabled}
            >
              <div className="sub-plan-header">
                <span className="sub-plan-name">{plan.name}</span>
                {selected === plan.id && <Check size={16} className="sub-plan-check" />}
              </div>
              <div className="sub-plan-price">
                {plan.price === 0 ? (
                  <span className="sub-plan-price-amount">Free</span>
                ) : (
                  <>
                    <span className="sub-plan-price-amount">${plan.price}</span>
                    <span className="sub-plan-price-period">/mo</span>
                  </>
                )}
              </div>
              <div className="sub-plan-credits"><Zap size={14} />{plan.credits.toLocaleString()} credits</div>
              <ul className="sub-plan-features">
                {plan.features.map((f) => (<li key={f} className="sub-plan-feature">{f}</li>))}
              </ul>
              {!plan.disabled && <div className="sub-plan-total">${plan.price}/month</div>}
            </button>
          ))}
        </div>

        <div className={`sub-coverage${isCovered ? " sub-coverage--covered" : " sub-coverage--short"}`}>
          {isCovered ? (<><Check size={16} />Your {selectedPlan.name} plan covers this build</>) : (<>You need {deficit.toLocaleString()} more credits — upgrade to cover this build</>)}
        </div>
      </div>

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <Image src="/step-2.png" alt="Step 2 of 4" width={240} height={8} className="onboarding-step" />
        <button className="btn-next" onClick={() => router.push("/connections")}>
          Set up connections <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
