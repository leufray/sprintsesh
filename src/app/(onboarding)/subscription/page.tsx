"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";
import StepIndicator from "../../../../components/ui/StepIndicator";

const SPRINT_COST = 1640;

const plans = [
  {
    id: "builder", name: "Builder", price: 50, credits: 1100, baseCredits: 1000,
    bullets: ["100 free credits included", "Standard queue", "2-month rollover"],
    disabled: false,
  },
  {
    id: "studio", name: "Studio", price: 150, credits: 3450, baseCredits: 3000,
    bullets: ["450 free credits included", "Priority queue", "2-month rollover"],
    disabled: false,
  },
  {
    id: "max", name: "Max", price: 250, credits: 6000, baseCredits: 5000,
    bullets: ["1,000 free credits included", "Dedicated support", "2-month rollover"],
    disabled: false,
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("studio");

  return (
    <AppShell hideTopbar>
      <div className="onboarding-scroll-area">
        <div className="onboarding-content">
          <h1 className="page-title">Choose a subscription</h1>
          <p className="page-subtitle">
            Your subscription is your monthly credit budget. Credits are consumed
            as your agents build. Plans that can cover your sprint are highlighted
            below.
          </p>

          <div className="sub-requirement">
            <div className="sub-requirement-left">
              <span className="sub-requirement-tier">Share</span>
              <span className="sub-requirement-sep">&middot;</span>
              <span className="sub-requirement-app">Sprintimer</span>
            </div>
            <div className="sub-requirement-right">
              <Zap size={16} className="sub-requirement-icon" />
              <span className="sub-requirement-amount">{SPRINT_COST.toLocaleString()}</span>
              <span className="sub-requirement-label">credits</span>
            </div>
          </div>

          <div className="sub-plans">
            {plans.map((plan) => {
              const isCovered = plan.credits >= SPRINT_COST;
              const remaining = plan.credits - SPRINT_COST;
              const fillPct = isCovered ? Math.round((SPRINT_COST / plan.credits) * 100) : 0;
              const isSelected = selected === plan.id;

              return (
                <button
                  key={plan.id}
                  className={`sub-plan-card${isSelected ? " sub-plan-card--selected" : ""}${isCovered && !plan.disabled ? " sub-plan-card--covered" : ""}${plan.disabled ? " sub-plan-card--disabled" : ""}`}
                  onClick={() => !plan.disabled && setSelected(plan.id)}
                  disabled={plan.disabled}
                >
                  <div className="sub-plan-header">
                    <span className="sub-plan-name">{plan.name}</span>
                    {isSelected && <Check size={16} className="sub-plan-check" />}
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

                  {!plan.disabled && (
                    <>
                      <div className="sub-plan-credits-row">
                        <span className="sub-plan-credits-base">
                          <s>{plan.baseCredits.toLocaleString()}</s>
                        </span>
                        <span className="sub-plan-credits-actual">
                          {plan.credits.toLocaleString()}
                        </span>
                      </div>

                      <div className="sub-plan-meter">
                        <div className="sub-plan-meter-track">
                          <div
                            className="sub-plan-meter-fill"
                            style={{ width: `${fillPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="sub-plan-meter-info">
                        <span className={remaining >= 0 ? "sub-plan-remaining--positive" : "sub-plan-remaining--negative"}>
                          {remaining >= 0 ? remaining.toLocaleString() : remaining.toLocaleString()}
                          <span className="sub-plan-remaining-label"> credits left</span>
                        </span>
                        {isCovered ? (
                          <span className="sub-plan-covered">
                            <Check size={14} /> Covered
                          </span>
                        ) : (
                          <span className="sub-plan-not-covered">
                            <X size={14} /> Not covered
                          </span>
                        )}
                      </div>

                      <ul className="sub-plan-bullets">
                        {plan.bullets.map((b) => (
                          <li key={b} className="sub-plan-bullet">{b}</li>
                        ))}
                      </ul>

                      <div className="sub-plan-total">
                        <span className="sub-plan-total-label">Total this month</span>
                        {isCovered ? (
                          <span className="sub-plan-total-price">${plan.price}</span>
                        ) : (
                          <span className="sub-plan-total-price--struck"><s>${plan.price}</s></span>
                        )}
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          <p className="sub-topup-note">
            <span className="sub-topup-highlight">Need more credits?</span>
            {" "}Top up at any time at{" "}
            <strong>$5 per 100 credits</strong>
            {" "}no plan change needed. Credits never expire.
          </p>
        </div>
      </div>

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <StepIndicator current={2} />
        <button className="btn-next" onClick={() => router.push("/connections")}>
          Set up connections <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
