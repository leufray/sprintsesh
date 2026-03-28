"use client";

import { useState } from "react";
import Image from "next/image";
import {
  PanelLeftClose,
  PanelLeftOpen,
  Clock,
  FileText,
  Link2,
  Search,
  Bell,
  Settings,
  Zap,
  Plus,
} from "lucide-react";

const navGroup1 = [
  { icon: Clock, label: "Sprint History" },
  { icon: FileText, label: "Project Briefs" },
  { icon: Link2, label: "Connections" },
];

const navGroup2 = [
  { icon: Search, label: "Search" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

interface AppShellProps {
  children: React.ReactNode;
  hideTopbar?: boolean;
  topbarLeft?: React.ReactNode;
  topbarRight?: React.ReactNode;
}

export default function AppShell({
  children,
  hideTopbar = false,
  topbarLeft,
  topbarRight,
}: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="shell">
      {/* ── Sidebar ────────────────────────── */}
      <aside className={`shell-sidebar${collapsed ? " shell-sidebar--collapsed" : ""}`}>
        <div className="shell-sidebar-top">
          <div className="shell-sidebar-header">
            <Image
              src="/ss-logo.png"
              alt="Sprintsesh"
              width={0}
              height={28}
              sizes="100vw"
              className="shell-sidebar-logo"
            />
            <button
              className="shell-sidebar-toggle"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
          </div>

          {/* Projects */}
          <div className="shell-sidebar-section">
            {!collapsed && (
              <span className="shell-sidebar-label">PROJECTS</span>
            )}
            <div className="shell-sidebar-project shell-sidebar-project--active">
              <span className="shell-sidebar-project-dot" />
              {!collapsed && <span>Untitled Project</span>}
            </div>
            <button className="shell-sidebar-new">
              <Plus size={16} />
              {!collapsed && <span>New Project</span>}
            </button>
          </div>

          {/* Nav Group 1 */}
          <nav className="shell-sidebar-nav shell-sidebar-nav-group">
            {navGroup1.map((item) => (
              <button key={item.label} className="shell-sidebar-nav-item">
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Nav Group 2 */}
          <nav className="shell-sidebar-nav shell-sidebar-nav-group">
            {navGroup2.map((item) => (
              <button key={item.label} className="shell-sidebar-nav-item">
                <item.icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Credits group */}
          <div className="shell-sidebar-nav shell-sidebar-nav-group">
            <button className="shell-sidebar-credits-btn">
              <div className="shell-sidebar-credits-top">
                <Zap size={18} />
                {!collapsed && <span>Credits</span>}
              </div>
              {!collapsed && (
                <div className="shell-sidebar-credits">
                  <div className="shell-sidebar-credits-bar">
                    <div
                      className="shell-sidebar-credits-fill"
                      style={{ width: "10%" }}
                    />
                  </div>
                  <span className="shell-sidebar-credits-label">
                    4 of 10 used
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Bottom: User only */}
        <div className="shell-sidebar-bottom">
          <div className="shell-sidebar-user">
            <div className="shell-sidebar-avatar">J</div>
            {!collapsed && (
              <div className="shell-sidebar-user-info">
                <span className="shell-sidebar-user-name">John</span>
                <span className="shell-sidebar-user-plan">Free plan</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Mobile bottom nav ──────────────── */}
      <nav className="shell-mobile-nav">
        {[...navGroup1, ...navGroup2].slice(0, 5).map((item) => (
          <button key={item.label} className="shell-mobile-nav-item">
            <item.icon size={20} />
          </button>
        ))}
      </nav>

      {/* ── Main ───────────────────────────── */}
      <div className={`shell-main${collapsed ? " shell-main--collapsed" : ""}`}>
        {!hideTopbar && (
          <header className="shell-topbar">
            <div className="shell-topbar-left">
              {topbarLeft || <span className="shell-topbar-breadcrumb">Untitled</span>}
            </div>
            <div className="shell-topbar-right">{topbarRight}</div>
          </header>
        )}
        <main className="shell-content">{children}</main>
      </div>
    </div>
  );
}
