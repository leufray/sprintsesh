"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Zap, Check, X } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";
import StepIndicator from "../../../../components/ui/StepIndicator";

const agents = [
  { role: "Architect", model: "Claude Opus 4" },
  { role: "Project Manager", model: "Claude Sonnet 4" },
  { role: "Developer Lead", model: "Claude Code" },
  { role: "Developer", model: "Claude Code" },
  { role: "Designer", model: "Claude Sonnet 4" },
  { role: "Content Writer", model: "Claude Sonnet 4" },
  { role: "Tester", model: "Claude Sonnet 4" },
];

export default function ReviewPage() {
  const router = useRouter();

  return (
    <AppShell hideTopbar>
      <div className="onboarding-scroll-area">
        <div className="onboarding-content">
          <h1 className="page-title">Review your order</h1>
        <p className="page-subtitle">Studio Plan &middot; Balanced Sprint</p>

        <div className="review-columns">
          <div className="review-col">
            <div className="review-section">
              <div className="review-section-header">
                <h3 className="review-section-title">APP</h3>
                <button className="review-edit" onClick={() => router.push("/preview")}>Edit</button>
              </div>
              <div className="review-app-row">
                <span className="review-app-name">Sprintimer</span>
                <span className="review-chip">iOS &amp; Android</span>
              </div>
            </div>
            <div className="review-section">
              <div className="review-section-header">
                <h3 className="review-section-title">SPRINT PLAN</h3>
                <button className="review-edit" onClick={() => router.push("/sprint-plan")}>Edit</button>
              </div>
              <div className="review-detail-row"><span>Plan</span><span>Balanced</span></div>
              <div className="review-detail-row"><span>Agents</span><span>7 agents</span></div>
              <div className="review-detail-row"><span>Sprints</span><span>2 sprints</span></div>
              <div className="review-detail-row"><span>Estimated time</span><span>10–14 hours</span></div>
              <div className="review-detail-row"><span>Sprint cost</span><span className="review-amber"><Zap size={14} /> 1,640 credits ($82)</span></div>
            </div>
            <div className="review-section">
              <div className="review-section-header">
                <h3 className="review-section-title">CONNECTIONS</h3>
                <button className="review-edit" onClick={() => router.push("/connections")}>Edit</button>
              </div>
              <div className="review-detail-row"><span>Supabase</span><span className="review-green"><Check size={14} /> Connected</span></div>
              <div className="review-detail-row"><span>Mapbox</span><span className="review-green"><Check size={14} /> Connected</span></div>
              <div className="review-detail-row"><span>Expo</span><span className="review-green"><Check size={14} /> Connected</span></div>
              <div className="review-detail-row"><span>GitHub</span><span className="review-red"><X size={14} /> Not connected</span></div>
            </div>
          </div>
          <div className="review-col">
            <div className="review-section">
              <div className="review-section-header">
                <h3 className="review-section-title">SUBSCRIPTION</h3>
                <button className="review-edit" onClick={() => router.push("/subscription")}>Edit</button>
              </div>
              <div className="review-plan-highlight">
                <span className="review-plan-name">Studio</span>
                <span className="review-plan-price">$150/month</span>
              </div>
              <div className="review-detail-row"><span>Credits included</span><span>3,450/mo</span></div>
              <div className="review-detail-row"><span>Free credits</span><span>450 included</span></div>
              <div className="review-detail-row"><span>Queue priority</span><span>Priority</span></div>
              <div className="review-detail-row"><span>Rollover</span><span>2 months</span></div>
              <div className="review-detail-row"><span>Billing</span><span>Monthly, cancel anytime</span></div>
            </div>
            <div className="review-section">
              <h3 className="review-section-title">CREDIT BREAKDOWN</h3>
              <div className="review-detail-row"><span>Plan credits</span><span>3,450</span></div>
              <div className="review-detail-row"><span>Sprint cost</span><span>−1,640</span></div>
              <div className="review-detail-row review-detail-row--total"><span>Remaining after build</span><span className="review-amber">1,810 credits</span></div>
            </div>
            <div className="review-section">
              <h3 className="review-section-title">AI AGENT TEAM</h3>
              <div className="review-agents">
                {agents.map((a) => (
                  <div key={a.role} className="review-agent">
                    <span className="review-agent-role">{a.role}</span>
                    <span className="review-agent-model">{a.model}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <StepIndicator current={4} />
        <button className="btn-next" onClick={() => router.push("/payment")}>
          Continue to payment <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
