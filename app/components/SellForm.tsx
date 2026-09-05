 "use client";

import { FormEvent, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  inventory: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  inventory: ""
};

export default function SellForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your inquiry.");
      }

      setStatus("success");
      setMessage("Your inventory inquiry has been sent. We'll be in touch.");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <form className="sell-form" onSubmit={handleSubmit}>
      <div className="form-head">
        <div>
          <span className="form-kicker">INVENTORY INQUIRY</span>
          <h3>Tell us what you have.</h3>
        </div>
        <span className="form-count">01 / 01</span>
      </div>

      <div className="form-grid">
        <label>
          <span>Full name</span>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="John Smith"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="john@company.com"
          />
        </label>

        <label className="full">
          <span>Phone number</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </label>

        <label className="full">
          <span>What are you looking to sell?</span>
          <textarea
            required
            value={form.inventory}
            onChange={(e) => update("inventory", e.target.value)}
            placeholder="Product type, quantity, condition, location, brands, or anything else that helps us understand the inventory."
            rows={6}
          />
        </label>
      </div>

      {message && (
        <div className={`form-status ${status}`} role="status">
          {message}
        </div>
      )}

      <button className="form-submit" type="submit" disabled={status === "sending"}>
        <span>{status === "sending" ? "Sending inquiry..." : "Send inventory inquiry"}</span>
        <span className="button-arrow">↗</span>
      </button>

      <p className="form-footnote">
        By submitting this form, you agree that SellMyInventory may contact you about your inventory.
      </p>
    </form>
  );
}