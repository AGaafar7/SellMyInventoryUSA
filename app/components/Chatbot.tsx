"use client";

import { useState, useRef, useEffect } from "react";

type Message = {
  role: "bot" | "user";
  content: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  inventory: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  inventory: "",
};

// Steps: each has a field key and the question to ask
const steps: { field: keyof FormData; question: string }[] = [
  { field: "name", question: "What is your full name?" },
  { field: "email", question: "What is your email address?" },
  { field: "phone", question: "And your phone number?" },
  {
    field: "inventory",
    question:
      "Great! Now, please describe the inventory you'd like to sell (product type, quantity, condition, etc.).",
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi there! I can help you submit an inventory inquiry. I'll ask you a few questions. Let's start – what is your full name?",
    },
  ]);
  const [input, setInput] = useState("");
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);

    // Check for casual greetings / small talk
    const lower = trimmed.toLowerCase();
    if (
      lower.includes("how are you") ||
      lower.includes("how are ya") ||
      lower.includes("how's it going")
    ) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "I'm just a bot, but I'm doing great! Thanks for asking. Now, back to your inquiry…",
        },
      ]);
      return;
    }

    // If the conversation is already finished, reset or ignore
    if (done) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "We've already sent your inquiry. If you need to start over, please refresh the page.",
        },
      ]);
      return;
    }

    // Process the current step
    const currentStep = steps[currentStepIndex];
    if (!currentStep) {
      // Should not happen, but fallback
      return;
    }

    // Store the answer
    setFormData((prev) => ({
      ...prev,
      [currentStep.field]: trimmed,
    }));

    // Move to next step or submit
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStepIndex(nextIndex);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: steps[nextIndex].question },
      ]);
    } else {
      // All fields collected – submit
      setIsSubmitting(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Thank you! I'm submitting your inquiry now…",
        },
      ]);

      try {
        const response = await fetch("/api/inventory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            inventory: formData.inventory,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Submission failed.");
        }

        setDone(true);
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "✅ Your inventory inquiry has been sent! The SellMyInventory team will be in touch shortly.",
          },
        ]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            content:
              "❌ Sorry, we couldn't send your inquiry right now. Please try again later or use the form on this page.",
          },
        ]);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleChat = () => setIsOpen((prev) => !prev);

  return (
    <>
      {/* Floating button */}
      <button
        className="chatbot-toggle"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>SellMyInventory Assistant</span>
            <button onClick={toggleChat} className="chatbot-close">
              ✕
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.role === "bot" ? "bot" : "user"}`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isSubmitting && handleSend()}
              placeholder="Type your reply…"
              disabled={isSubmitting || done}
            />
            <button
              onClick={handleSend}
              disabled={isSubmitting || done}
              className="chatbot-send"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}