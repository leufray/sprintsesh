"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Share2, ArrowRight, RefreshCw } from "lucide-react";
import AppShell from "../../../../components/layout/AppShell";
import ChatInput from "../../../../components/ui/ChatInput";

interface Message {
  role: "user" | "architect";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "architect",
    text: "I understand — you want to build a mobile app that tracks sprints.\n\nBased on what you've described, here are the core features I'd include:\n\n• Sprint start countdown with reaction time tracking\n• Millisecond stopwatch with split timing\n• GPS distance and speed tracking\n• Top speed, reaction time, and pace analytics\n• Calories burned calculation\n• Session history with personal bests",
  },
  { role: "user", text: "A serious athlete" },
  {
    role: "architect",
    text: "Got it — a dedicated athlete who needs precision. What matters most to you: raw performance data like split times and speed, or the training insights and trends over time?",
  },
  { role: "user", text: "Both equally" },
  {
    role: "architect",
    text: "The full package — love it. Final question: mobile only, or do you want a companion web dashboard too?",
  },
  { role: "user", text: "Mobile only" },
  {
    role: "architect",
    text: "Here's your interactive preview for Sprintimer. The app includes sprint countdown with reaction time, millisecond stopwatch, GPS tracking, speed analytics, calorie calculation, and session history with personal bests.\n\nThe design uses a high-contrast dark theme with Olympic yellow accents to capture the energy and speed of athletic training.\n\nYou can remix the design or start building when you're ready.",
  },
];

const mockedResponses = [
  "Got it — updating your preview with those changes.",
  "I've adjusted the design to reflect that. Take a look at the updated preview.",
  "Good call. The preview now includes that update.",
  "Done — the preview has been refreshed with your feedback.",
];

export default function PreviewPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseIndexRef = useRef(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function handleSubmit(text: string) {
    setMessages((prev) => [...prev, { role: "user", text }]);
    setIsTyping(true);
    const response = mockedResponses[responseIndexRef.current % mockedResponses.length];
    responseIndexRef.current++;

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "architect", text: response }]);
      setIsTyping(false);
    }, 1500);
  }

  return (
    <AppShell hideTopbar>
      <div className="preview-layout">
        {/* Left panel — conversation + input */}
        <div className="preview-info">
          <div className="preview-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`arch-msg${msg.role === "user" ? " arch-msg--user" : " arch-msg--architect"}`}
              >
                <div
                  className={
                    msg.role === "user"
                      ? "arch-msg-bubble--user"
                      : "arch-msg-bubble--architect"
                  }
                >
                  {msg.text.split("\n").map((line, j) => (
                    <span key={j}>
                      {line}
                      {j < msg.text.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="arch-msg arch-msg--architect">
                <div className="arch-typing">
                  <span className="arch-typing-dot" />
                  <span className="arch-typing-dot" />
                  <span className="arch-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-outer">
            <ChatInput onSubmit={handleSubmit} />
          </div>
        </div>

        {/* Right panel — topbar + mockup + bottom bar */}
        <div className="preview-mockup-area">
          <div className="preview-topbar">
            <div className="preview-breadcrumb">
              <span className="preview-breadcrumb-primary">Preview</span>
              <span className="preview-breadcrumb-sep">&middot;</span>
              <span className="preview-breadcrumb-secondary">Sprintimer</span>
            </div>
            <button className="preview-amber-btn">
              <Share2 size={16} />
              Share
            </button>
          </div>

          <div className="preview-mockup-center">
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
                <div className="preview-screen-stats">
                  <div className="preview-screen-stat">
                    <span className="preview-screen-stat-val">0.0</span>
                    <span className="preview-screen-stat-label">STEPS</span>
                  </div>
                  <div className="preview-screen-stat">
                    <span className="preview-screen-stat-val">00.0</span>
                    <span className="preview-screen-stat-label">CALORIES</span>
                  </div>
                </div>
                <div className="preview-screen-cta">START</div>
              </div>
            </div>
          </div>

          <div className="preview-bottom-bar">
            <button className="preview-amber-btn">
              <RefreshCw size={16} />
              Remix
            </button>
            <button
              className="preview-build-btn"
              onClick={() => router.push("/sprint-plan")}
            >
              Start building
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
