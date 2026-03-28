"use client";

import { useState } from "react";
import { Pause, Zap, Smartphone } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";

const tabs = ["Preview", "Status", "Tasks", "Files"];

const screens = [
  { name: "Timer Screen", status: "complete" },
  { name: "Session Results", status: "complete" },
  { name: "History List", status: "building" },
  { name: "Personal Bests", status: "building" },
  { name: "Session Detail", status: "queued" },
  { name: "Settings", status: "queued" },
];

const activityFeed = [
  { agent: "Designer", dept: "blue", text: "Building the History List screen layout" },
  { agent: "Developer", dept: "purple", text: "Implementing GPS distance tracking module" },
  { agent: "Designer", dept: "blue", text: "Completed Timer Screen — all components rendered" },
  { agent: "Architect", dept: "amber", text: "Sprint plan finalized — 12 tasks across 4 agents" },
  { agent: "Developer", dept: "purple", text: "Setting up Expo project scaffold" },
  { agent: "Tester", dept: "red", text: "Test suite initialized — 0 tests passing" },
];

const statusAgents = [
  { role: "Architect", dept: "amber", credits: 84, task: "Sprint plan finalized" },
  { role: "Project Manager", dept: "amber", credits: 48, task: "Monitoring progress" },
  { role: "Developer Lead", dept: "purple", credits: 96, task: "GPS distance tracking" },
  { role: "Developer", dept: "purple", credits: 48, task: "Accelerometer step counter" },
  { role: "Designer", dept: "blue", credits: 112, task: "History List screen" },
  { role: "Content Writer", dept: "green", credits: 12, task: "Waiting for tasks" },
  { role: "Tester", dept: "red", credits: 22, task: "Test suite setup" },
];

const kanbanColumns = [
  {
    name: "To Do", count: 4, color: "var(--t2)", tasks: [
      { title: "Device QA — Test on iOS and Android", agent: "Tester", dept: "red" },
      { title: "Session results screen with UI metrics", agent: "Designer", dept: "blue" },
      { title: "Audible start/stop cues", agent: "Developer", dept: "purple" },
    ],
  },
  {
    name: "Building", count: 3, color: "var(--amber)", tasks: [
      { title: "GPS distance tracker", agent: "Developer Lead", dept: "purple" },
      { title: "Accelerometer step counter", agent: "Developer", dept: "purple" },
      { title: "History List screen", agent: "Designer", dept: "blue" },
    ],
  },
  {
    name: "In Review", count: 1, color: "var(--blue)", tasks: [
      { title: "Millisecond stopwatch with split timing", agent: "Developer Lead", dept: "purple" },
    ],
  },
  {
    name: "Done", count: 3, color: "var(--green)", tasks: [
      { title: "Sprint 1 task breakdown", agent: "Architect", dept: "amber" },
      { title: "Project scaffold and Expo setup", agent: "Developer Lead", dept: "purple" },
      { title: "Timer Screen design", agent: "Designer", dept: "blue" },
    ],
  },
];

const fileTree = [
  { name: "Project Docs", type: "folder", children: ["product-brief.md", "design-brief.md", "technical-spec.md", "sprint-1-plan.md"] },
  { name: "Design System", type: "folder", children: ["design-system.html", "tokens.json"] },
  { name: "Source Code", type: "folder", children: ["gps.ts", "TimerScreen.tsx", "ResultsScreen.tsx", "HistoryScreen.tsx", "storage.ts", "types.ts", "package.json"] },
];

export default function BuildPage() {
  const [activeTab, setActiveTab] = useState("Preview");

  return (
    <AppShell
      topbarLeft={
        <div className="build-topbar-left">
          <span className="build-version">v1 &middot; Sprint 1 &middot; Setting up project</span>
          <span className="build-badge build-badge--active">Active</span>
        </div>
      }
      topbarRight={
        <div className="build-topbar-right">
          <div className="build-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`build-tab${activeTab === tab ? " build-tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <span className="build-timer">09:08:55 Remaining</span>
          <button className="build-pause">
            <Pause size={16} />
          </button>
          <span className="build-credit-counter">
            <Zap size={14} />
            392 / 1,640
          </span>
        </div>
      }
    >
      {/* Preview Tab */}
      {activeTab === "Preview" && (
        <div className="build-preview">
          <div className="build-preview-screens">
            <h3 className="build-preview-screens-title">Screens</h3>
            {screens.map((s) => (
              <div key={s.name} className={`build-screen-item build-screen-item--${s.status}`}>
                <span className={`build-screen-dot build-screen-dot--${s.status}`} />
                {s.name}
              </div>
            ))}
            <h3 className="build-preview-screens-title build-preview-feed-title">Activity</h3>
            {activityFeed.map((item, i) => (
              <div key={i} className={`build-feed-item build-feed-item--${item.dept}`}>
                <span className="build-feed-agent">{item.agent}</span>
                <span className="build-feed-text">{item.text}</span>
              </div>
            ))}
          </div>
          <div className="build-preview-device">
            <div className="preview-phone">
              <div className="preview-phone-notch">
                <span className="preview-phone-time">9:41</span>
                <span className="preview-phone-icons">&#x25CF;&#x25CF;&#x25CF;</span>
              </div>
              <div className="preview-phone-screen">
                <div className="preview-screen-header">SPRINTIMER</div>
                <div className="preview-screen-sprint-label">SPRINT 1</div>
                <div className="preview-screen-timer">00:00</div>
                <div className="preview-screen-timer-sub">SECONDS</div>
                <div className="preview-screen-stats">
                  <div className="preview-screen-stat">
                    <span className="preview-screen-stat-val">0.000</span>
                    <span className="preview-screen-stat-label">REACTION TIME</span>
                  </div>
                  <div className="preview-screen-stat">
                    <span className="preview-screen-stat-val">0.00</span>
                    <span className="preview-screen-stat-label">TOP SPEED</span>
                  </div>
                </div>
                <div className="preview-screen-cta">START</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Tab */}
      {activeTab === "Status" && (
        <div className="build-status">
          <div className="build-status-header">
            <h2 className="build-status-title">
              <span className="build-status-dot" />
              Sprint 1 is on track
            </h2>
          </div>
          <div className="build-status-stats">
            <div className="build-stat-card">
              <span className="build-stat-value build-stat-value--amber">390</span>
              <span className="build-stat-label">Credits Used</span>
            </div>
            <div className="build-stat-card">
              <span className="build-stat-value">3</span>
              <span className="build-stat-label">Tasks Completed</span>
            </div>
            <div className="build-stat-card">
              <span className="build-stat-value">0</span>
              <span className="build-stat-label">Critical Bugs</span>
            </div>
            <div className="build-stat-card">
              <span className="build-stat-value">3h 13m</span>
              <span className="build-stat-label">Time Elapsed</span>
            </div>
          </div>
          <div className="build-status-agents">
            <h3 className="build-status-section-title">AGENT TEAM</h3>
            <div className="build-agents-grid">
              {statusAgents.map((a) => (
                <div key={a.role} className={`build-agent-card build-agent-card--${a.dept}`}>
                  <div className="build-agent-top">
                    <span className="build-agent-role">{a.role}</span>
                    <span className="build-agent-credits">{a.credits} cr</span>
                  </div>
                  <span className="build-agent-task">{a.task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "Tasks" && (
        <div className="build-tasks">
          <div className="build-kanban">
            {kanbanColumns.map((col) => (
              <div key={col.name} className="build-kanban-col">
                <div className="build-kanban-header">
                  <span className="build-kanban-title">{col.name}</span>
                  <span className="build-kanban-count" style={{ background: col.color }}>{col.count}</span>
                </div>
                <div className="build-kanban-cards">
                  {col.tasks.map((task) => (
                    <div key={task.title} className={`build-kanban-card build-kanban-card--${task.dept}`}>
                      <span className="build-kanban-card-title">{task.title}</span>
                      <span className="build-kanban-card-agent">{task.agent}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Files Tab */}
      {activeTab === "Files" && (
        <div className="build-files">
          <div className="build-files-tree">
            {fileTree.map((folder) => (
              <div key={folder.name} className="build-files-folder">
                <span className="build-files-folder-name">{folder.name}</span>
                <div className="build-files-list">
                  {folder.children.map((file) => (
                    <div key={file} className="build-files-file">
                      <span className="build-files-ext">
                        {file.split(".").pop()?.toUpperCase()}
                      </span>
                      {file}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="build-files-preview">
            <div className="build-files-preview-header">
              <span className="build-files-preview-name">product-brief.md</span>
              <span className="build-files-preview-size">2.4 KB</span>
            </div>
            <div className="build-files-preview-content">
              <p className="build-files-preview-section">Summary</p>
              <p className="build-files-preview-text">
                A mobile sprint training app that tracks reaction time, speed,
                distance, steps, and calories. Built for serious athletes who
                want precision data without a coach or specialized equipment.
              </p>
              <p className="build-files-preview-section">Core Features</p>
              <p className="build-files-preview-text">
                &bull; Sprint start countdown with reaction time tracking<br />
                &bull; Millisecond stopwatch with split timing<br />
                &bull; GPS distance and speed tracking<br />
                &bull; Top speed and pace analytics<br />
                &bull; Calories burned calculation
              </p>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
