"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Zap, ArrowLeft, ArrowRight } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";

const plans = [
  { id: "express", name: "Express", sprints: 1, agents: 4, time: "4–6", credits: 740, cost: 37 },
  { id: "balanced", name: "Balanced", sprints: 1, agents: 7, time: "10–14", credits: 1640, cost: 82 },
  { id: "production", name: "Production", sprints: 4, agents: 12, time: "4–6 days", credits: 3200, cost: 160 },
];

const expressFeatures = [
  "Sprint start countdown", "Millisecond stopwatch", "GPS distance tracking",
  "Top speed, reaction time", "Calories burned calculation", "Session results screen",
  "History & personal bests", "Audible start/stop cues",
];

const expressExtras = [
  "Social sharing", "Social leaderboards", "Friend challenges & invites",
  "Analytics dashboard", "Freemium paywall", "Subscription management",
  "Member accounts", "Onboarding flow", "History cloud sync",
  "iOS & Android build files", "App store screenshots",
  "Push training notifications", "Privacy policy & terms of use",
];

const agentTeam = [
  { role: "Architect", model: "Anthropic Cl" },
  { role: "Developer", model: "Claude Code" },
  { role: "Designer", model: "Claude Sonnet 4" },
  { role: "Tester", model: "Claude Sonnet 4" },
];

export default function SprintPlanPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("express");
  const selectedPlan = plans.find((p) => p.id === selected)!;

  return (
    <AppShell hideTopbar>
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
              className={`sprint-plan-tile${selected === plan.id ? " sprint-plan-tile--selected" : ""}`}
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
              <span className="sprint-plan-stat-icon"><Zap size={20} /></span>
              <span className="sprint-plan-stat-value sprint-plan-stat-value--amber">{selectedPlan.credits}</span>
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
              <span className="sprint-plan-stat-value">{selectedPlan.time}</span>
              <span className="sprint-plan-stat-label">Hours to Complete</span>
            </div>
          </div>

          <div className="sprint-plan-columns">
            <div className="sprint-plan-col">
              <h3 className="sprint-plan-col-title">APP FEATURES</h3>
              <p className="sprint-plan-col-desc">
                Get started with a basic functional app to test the idea and verify
                sensor activity before committing to accounts, social, or billing.
              </p>
              <ul className="sprint-plan-features">
                {expressFeatures.map((f) => (
                  <li key={f} className="sprint-plan-feature sprint-plan-feature--included">{f}</li>
                ))}
              </ul>
              <ul className="sprint-plan-features">
                {expressExtras.map((f) => (
                  <li key={f} className="sprint-plan-feature sprint-plan-feature--excluded">{f}</li>
                ))}
              </ul>
            </div>
            <div className="sprint-plan-col">
              <h3 className="sprint-plan-col-title">AI AGENT TEAM</h3>
              <div className="sprint-plan-agents">
                {agentTeam.map((a) => (
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

      <div className="onboarding-bottom">
        <button className="btn-back" onClick={() => router.back()}>
          <ArrowLeft size={16} /> Go back
        </button>
        <Image src="/step-1.png" alt="Step 1 of 4" width={240} height={8} className="onboarding-step" />
        <button className="btn-next" onClick={() => router.push("/subscription")}>
          Choose a subscription <ArrowRight size={16} />
        </button>
      </div>
    </AppShell>
  );
}
