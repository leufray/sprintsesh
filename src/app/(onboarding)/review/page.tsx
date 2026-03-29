"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Zap, Activity } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";
import StepIndicator from "../../../../components/ui/StepIndicator";

const agents = [
  { role: "Architect", model: "NotebookLM" },
  { role: "Project Manager", model: "Claude Opus 4" },
  { role: "Dev Lead", model: "Claude Sonnet 4" },
  { role: "Developer", model: "Claude Code" },
  { role: "Designer", model: "Claude Sonnet 4" },
  { role: "Content Writer", model: "Gemini 1.5 Pro" },
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

          {/* Top-left — Sprint Plan */}
          <div className="review-quad">
            <div className="review-section-header">
              <span className="review-section-title">SPRINT PLAN</span>
              <button className="review-edit" onClick={() => router.push("/sprint-plan")}>Edit</button>
            </div>
            <div className="review-app-row">
              <div className="review-app-icon"><Activity size={20} /></div>
              <div className="review-app-info">
                <span className="review-app-name">Sprintimer</span>
                <span className="review-app-sub">iOS &amp; Android &bull; 2 sprints (10&ndash;14 hrs)</span>
              </div>
              <div className="review-app-cost">
                <Zap size={16} />
                <span className="review-app-cost-value">1,640</span>
              </div>
            </div>
            <div className="review-divider" />
            <div className="review-detail-row"><span>Plan</span><span>Balanced</span></div>
            <div className="review-detail-row"><span>AI Team</span><span>7 agents</span></div>
          </div>

          {/* Top-right — Subscription */}
          <div className="review-quad">
            <div className="review-section-header">
              <span className="review-section-title">SUBSCRIPTION</span>
              <button className="review-edit" onClick={() => router.push("/subscription")}>Edit</button>
            </div>
            <div className="review-detail-row"><span>Plan</span><span>Studio</span></div>
            <div className="review-detail-row"><span>Price</span><span>$150 / month</span></div>
            <div className="review-detail-row"><span>Credits</span><span className="review-amber">3,450 / month (incl. 450 free)</span></div>
            <div className="review-detail-row"><span>Remaining</span><span>1,810 credits</span></div>
            <div className="review-detail-row"><span>Billing</span><span>Monthly &bull; cancel anytime</span></div>
          </div>

          {/* Bottom-left — Connected Services */}
          <div className="review-quad">
            <div className="review-section-header">
              <span className="review-section-title">CONNECTED SERVICES</span>
              <button className="review-edit" onClick={() => router.push("/connections")}>Edit</button>
            </div>
            <div className="review-detail-row"><span>Sprintsesh Engine</span><span className="review-green">Connected</span></div>
            <div className="review-detail-row"><span>Code Repository (GitHub)</span><span className="review-green">Connected</span></div>
            <div className="review-detail-row"><span>Analytics (Mixpanel)</span><span className="review-muted">Not connected</span></div>
            <div className="review-detail-row"><span>Subscriptions (RevenueCat)</span><span className="review-muted">Not connected</span></div>
            <div className="review-detail-row"><span>User Emails (Resend)</span><span className="review-muted">Not connected</span></div>
          </div>

          {/* Bottom-right — AI Agent Team */}
          <div className="review-quad">
            <span className="review-section-title">AI AGENT TEAM</span>
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
