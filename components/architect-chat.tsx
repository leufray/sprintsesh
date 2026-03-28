"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ChatInput from "./ui/ChatInput";

interface Option {
  label: string;
  subtitle: string;
}

interface Exchange {
  architectMessage: string;
  options: Option[];
  responses: Record<string, string>;
}

function buildFirstResponse(prompt: string): string {
  return `I understand — you want to build ${prompt.toLowerCase().replace(/^create\s+/i, "").replace(/\.{2,}$/, "").trim()}.\n\nBased on what you've described, here are the core features I'd include:\n\n• Sprint start countdown with reaction time tracking\n• Millisecond stopwatch with split timing\n• GPS distance and speed tracking\n• Top speed, reaction time, and pace analytics\n• Calories burned calculation\n• Session history with personal bests\n\nI have 3 clarifying questions before proceeding.\n\nWho is the primary user?`;
}

const conversation: Exchange[] = [
  {
    architectMessage: "",
    options: [
      { label: "A serious athlete", subtitle: "High school/college track, club runner" },
      { label: "A casual runner", subtitle: "Fitness enthusiast wanting to track sprints" },
      { label: "A coach or trainer", subtitle: "Managing multiple athletes and their data" },
    ],
    responses: {
      "A serious athlete":
        "Got it — a dedicated athlete who needs precision. What matters most to you: raw performance data like split times and speed, or the training insights and trends over time?",
      "A casual runner":
        "Nice — keeping it simple and motivating. Would you want social features like leaderboards and sharing, or is this more of a personal tracking tool?",
      "A coach or trainer":
        "Understood — you need a multi-athlete view. Should each athlete have their own login to input data, or do you want to manage everything from one account?",
    },
  },
  {
    architectMessage: "",
    options: [
      { label: "Performance data", subtitle: "Splits, speed, reaction time, top speed" },
      { label: "Training insights", subtitle: "Trends, progress charts, personal bests" },
      { label: "Both equally", subtitle: "Full picture — data and insights together" },
    ],
    responses: {
      "Performance data":
        "Perfect — a data-first approach. One more question: do you want this on mobile only, or do you also need a web dashboard to review your stats on a bigger screen?",
      "Training insights":
        "Smart — the insights are what drive improvement. Last question: do you want this on mobile only, or also a web dashboard?",
      "Both equally":
        "The full package — love it. Final question: mobile only, or do you want a companion web dashboard too?",
    },
  },
  {
    architectMessage: "",
    options: [
      { label: "Mobile only", subtitle: "Track and review everything on my phone" },
      { label: "Mobile + Web", subtitle: "Track on phone, review on desktop" },
    ],
    responses: {
      "Mobile only":
        "That's everything I need. I'm going to put together your app preview now — a sprint tracking app for serious athletes, focused on performance data, mobile-first. Give me a moment to generate your preview.",
      "Mobile + Web":
        "That's everything I need. I'm going to put together your app preview now — a sprint tracking app with both mobile and web, full data and insights. Give me a moment to generate your preview.",
    },
  },
];

interface Message {
  role: "user" | "architect";
  text: string;
}

export default function ArchitectChat({ initialPrompt }: { initialPrompt: string }) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [exchangeIndex, setExchangeIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0) return;

    const msgs: Message[] = [];
    if (initialPrompt) {
      msgs.push({ role: "user", text: initialPrompt });
    }

    setMessages(msgs);
    setIsTyping(true);

    const firstResponse = initialPrompt
      ? buildFirstResponse(initialPrompt)
      : "Tell me about the app you want to build. What problem does it solve?";

    const timer = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "architect", text: firstResponse },
      ]);
      setIsTyping(false);
      setShowOptions(true);
    }, 1500);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isGenerating]);

  const handleOption = (option: Option) => {
    const exchange = conversation[exchangeIndex];
    const response = exchange.responses[option.label] || Object.values(exchange.responses)[0];

    setShowOptions(false);
    setMessages((prev) => [...prev, { role: "user", text: option.label }]);
    setIsTyping(true);

    setTimeout(() => {
      const nextIndex = exchangeIndex + 1;

      if (nextIndex >= conversation.length) {
        setMessages((prev) => [...prev, { role: "architect", text: response }]);
        setIsTyping(false);
        setTimeout(() => setIsGenerating(true), 1200);
        setTimeout(() => router.push("/preview"), 4000);
      } else {
        const nextExchange = conversation[nextIndex];
        const architectText = nextExchange.architectMessage || response;

        if (!nextExchange.architectMessage) {
          nextExchange.architectMessage = response;
        }

        setMessages((prev) => [...prev, { role: "architect", text: architectText }]);
        setIsTyping(false);
        setExchangeIndex(nextIndex);
        setShowOptions(true);
      }
    }, 1500);
  };

  const currentExchange = exchangeIndex < conversation.length ? conversation[exchangeIndex] : null;

  return (
    <div className="arch-chat">
      <div className="arch-chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`arch-msg${msg.role === "user" ? " arch-msg--user" : " arch-msg--architect"}`}
          >
            <div
              className={
                msg.role === "user" ? "arch-msg-bubble--user" : "arch-msg-bubble--architect"
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

        {showOptions && currentExchange && !isTyping && (
          <div className="arch-options">
            <p className="arch-options-label">
              Question {exchangeIndex + 1} of {conversation.length}
            </p>
            <div className="arch-options-grid">
              {currentExchange.options.map((opt) => (
                <button
                  key={opt.label}
                  className="arch-option-tile"
                  onClick={() => handleOption(opt)}
                >
                  <span className="arch-option-tile-label">{opt.label}</span>
                  <span className="arch-option-tile-sub">{opt.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="arch-generating">
            <div className="arch-generating-pulse" />
            <span className="arch-generating-text">Generating your preview…</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-outer">
        <ChatInput onSubmit={() => {}} />
      </div>
    </div>
  );
}
