"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, ArrowLeft, ArrowRight } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";
import StepIndicator from "../../../../components/ui/StepIndicator";

const allFeatures = [
  "Sprint start countdown", "Millisecond stopwatch", "GPS distance tracking",
  "Top speed, reaction time", "Calories burned calculation", "Session results screen",
  "History & personal bests", "Audible start/stop cues", "Social sharing",
  "Social leaderboards", "Friend challenges & invites", "Analytics dashboard",
  "Freemium paywall", "Subscription management", "Member accounts",
  "Onboarding flow", "History cloud sync", "iOS & Android build files",
  "App store screenshots", "Push training notifications", "Privacy policy & terms of use",
];

const tierDescriptions: Record<string, string> = {
  try: "Your app's core features working, no accounts or payments. Just enough to see your idea come to life and try it out.",
  share: "A complete, polished app with real user accounts. Ready to send to friends, beta testers, or investors for feedback.",
  launch: "The full product. Every feature built, tested, and packaged for submission to the App Store and Google Play.",
};

const includedCounts: Record<string, number> = { try: 7, share: 14, launch: 21 };

const agentTeams: Record<string, { role: string; model: string }[]> = {
  try: [
    { role: "Architect", model: "NotebookLM" },
    { role: "Developer", model: "Claude Code" },
    { role: "Designer", model: "Claude Sonnet 4" },
    { role: "Tester", model: "Claude Sonnet 4" },
  ],
  share: [
    { role: "Architect", model: "NotebookLM" },
    { role: "Project Manager", model: "Claude Opus 4" },
    { role: "Dev Lead", model: "Claude Sonnet 4" },
    { role: "Developer", model: "Claude Code" },
    { role: "Designer", model: "Claude Sonnet 4" },
    { role: "Content Writer", model: "Gemini 1.5 Pro" },
    { role: "Tester", model: "Claude Sonnet 4" },
  ],
  launch: [
    { role: "Architect", model: "NotebookLM" },
    { role: "Project Manager", model: "Claude Opus 4" },
    { role: "Dev Lead", model: "Claude Sonnet 4" },
    { role: "Frontend Dev", model: "Claude Code" },
    { role: "Backend Dev", model: "Claude Code" },
    { role: "Design Lead", model: "Claude Sonnet 4" },
    { role: "UX Designer", model: "Gemini 1.5 Pro" },
    { role: "UI Designer", model: "Paper MCP" },
    { role: "iOS/Android Specialist", model: "Expo EAS" },
    { role: "Content Writer", model: "Gemini 1.5 Pro" },
    { role: "Art Director", model: "Nano Banana Pro" },
    { role: "Tester", model: "Claude Sonnet 4" },
  ],
};

const plans = [
  { id: "try", name: "Try", sprints: 1, agents: 4, time: "4–6", credits: 740, cost: 37 },
  { id: "share", name: "Share", sprints: 2, agents: 7, time: "10–14", credits: 1640, cost: 82 },
  { id: "launch", name: "Launch", sprints: 4, agents: 12, time: "40–64", credits: 3200, cost: 160 },
];

export default function SprintPlanPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("try");
  const selectedPlan = plans.find((p) => p.id === selected)!;
  const included = includedCounts[selected];
  const agents = agentTeams[selected];

  return (
    <AppShell hideTopbar>
      <div className="onboarding-scroll-area">
        <div className="onboarding-content">
          <h1 className="page-title">Choose your sprint plan</h1>
          <p className="page-subtitle">
            A sprint is a focused build cycle that delivers a working version of
            your app. You can always run another sprint to add features or make changes.
          </p>

          <div className="sprint-plan-tiles">
            {plans.map((plan) => (
              <button
                key={plan.id}
                className={`sprint-plan-tile tier-${plan.id}${selected === plan.id ? " sprint-plan-tile--selected" : ""}`}
                onClick={() => setSelected(plan.id)}
              >
                <span className="sprint-plan-tile-name">{plan.name}</span>
                {selected === plan.id && <span className="sprint-plan-tile-check">&#10003;</span>}
              </button>
            ))}
          </div>

          <div className="sprint-plan-detail">
            <div className="sprint-plan-stats">
              <div className="sprint-plan-stat">
                <div className="sprint-plan-stat-row">
                  <span className="sprint-plan-stat-icon"><Zap size={20} /></span>
                  <span className="sprint-plan-stat-value">{selectedPlan.credits.toLocaleString()}</span>
                </div>
                <span className="sprint-plan-stat-label">Credits Required</span>
              </div>
              <div className="sprint-plan-stat">
                <span className="sprint-plan-stat-value">{selectedPlan.sprints}</span>
                <span className="sprint-plan-stat-label">Total Sprints</span>
              </div>
              <div className="sprint-plan-stat">
                <span className="sprint-plan-stat-value">{selectedPlan.agents}</span>
                <span className="sprint-plan-stat-label">AI Agents</span>
              </div>
              <div className="sprint-plan-stat">
                <span className="sprint-plan-stat-value sprint-plan-stat-value--amber-time">{selectedPlan.time}</span>
                <span className="sprint-plan-stat-label">Hours to Complete</span>
              </div>
            </div>

            <div className="sprint-plan-columns">
              <div className="sprint-plan-col">
                <h3 className="sprint-plan-col-title">APP FEATURES</h3>
                <p className="sprint-plan-tier-desc">{tierDescriptions[selected]}</p>
                <ul className="sprint-plan-features">
                  {allFeatures.map((f, i) => (
                    <li
                      key={f}
                      className={`sprint-plan-feature ${i < included ? "sprint-plan-feature--included" : "sprint-plan-feature--excluded"}`}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="sprint-plan-col">
                <h3 className="sprint-plan-col-title">AI AGENT TEAM</h3>
                <div className="sprint-plan-agents">
                  {agents.map((a) => (
                    <div key={a.role} className="sprint-plan-agent">
                      <span className="sprint-plan-agent-role">{a.role}</span>
                      <span className="sprint-plan-agent-model">{a.model}</span>
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
        <StepIndicator current={1} />
        <button className="btn-next" onClick={() => router.push("/subscription")}>
          Choose a subscription <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
