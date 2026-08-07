// Two-step "fill in the blank" contact form.
// Validates client-side with the shared Zod schema, then POSTs to the
// AWS Lambda endpoint (see lambda/contact.mjs) which emails it via SES.
//
// Environment Variables Required:
//   - NEXT_PUBLIC_CONTACT_ENDPOINT: URL of the deployed API Gateway endpoint

"use client";

import { useEffect, useRef, useState } from "react";
import { contactSchema } from "@/lib/validation";

const ENDPOINT = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

const SERVICE_OPTIONS = [
  "Commercial Growth Consulting",
  "Business Strategy & Development",
  "Market Research & Insights",
  "Branding & Creative Solutions",
  "Marketing & Performance Growth",
  "Sales Enablement & CRM",
  "Technology & AI Solutions",
  "Analytics & Executive Advisory",
].map((s) => ({ value: s, label: s }));

const COUNTRY_CODE_OPTIONS = [
  { code: "+92", label: "PK +92" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+91", label: "IN +91" },
  { code: "+971", label: "AE +971" },
  { code: "+61", label: "AU +61" },
].map((c) => ({ value: c.code, label: c.label }));

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  service: string;
  budget: string;
  projectDescription: string;
  requestNDA: boolean;
  website: string; // honeypot
}

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+92",
  phone: "",
  service: "",
  budget: "",
  projectDescription: "",
  requestNDA: false,
  website: "",
};

const blankClass =
  "bg-transparent border-b border-fanaar-cream/50 focus:border-fanaar-brown outline-none px-1 py-0.5 text-fanaar-brown placeholder-fanaar-cream/50 transition-colors";

function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <span ref={rootRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${blankClass} w-full flex items-center justify-between gap-2 cursor-pointer text-left`}
      >
        <span className={`whitespace-nowrap ${selected ? "" : "text-fanaar-cream/50"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="text-sm text-fanaar-cream/60">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-full sm:min-w-max max-w-[90vw] max-h-64 overflow-y-auto rounded-xl bg-fanaar-cream border border-fanaar-brown/10 shadow-xl py-2 z-50">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-base transition-colors ${
                o.value === value ? "bg-fanaar-orange/15 text-fanaar-brown font-semibold" : "text-fanaar-brown"
              } hover:bg-fanaar-teal hover:text-fanaar-cream`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

function AutoWidthInput({
  value,
  placeholder,
  onChange,
  type = "text",
  minCh = 8,
}: {
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  type?: string;
  minCh?: number;
}) {
  const width = Math.max(minCh, (value || placeholder).length + 1);
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: `${width}ch` }}
      className={blankClass}
    />
  );
}

export default function ContactForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const step1Valid =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.trim() !== "";

  const step2Valid = form.service !== "" && form.projectDescription.trim() !== "";

  async function handleSubmit() {
    if (!step2Valid) return;
    setError("");

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the form.");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div>
        <h3 className="text-2xl font-bold text-fanaar-cream mb-2">Thank you.</h3>
        <p className="text-fanaar-cream/70">
          We&apos;ve got your details and will be in touch shortly to schedule your discovery call.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-fanaar-cream/70 max-w-xl mb-10 leading-relaxed">
        Have a business need or a project to discuss? Interested in exploring what we can build together?
        Share your details and we&apos;ll put you in touch with the right expert.
      </p>

      <div className="text-xs font-bold tracking-widest uppercase text-fanaar-cream/50 mb-8">
        Questions {step} of 2
      </div>

      {step === 1 && (
        <div className="flex flex-col gap-8 sm:gap-10 text-xl sm:text-2xl md:text-3xl leading-relaxed text-fanaar-cream">
          <div>
            <span className="mr-3">Hey, my name is  </span>
            <AutoWidthInput value={form.firstName} placeholder="First Name*" onChange={(v) => update("firstName", v)} />
            <span className="mx-3">
              <AutoWidthInput value={form.lastName} placeholder="Last Name*" onChange={(v) => update("lastName", v)} />
            </span>
            <span>.</span>
          </div>

          <div>
            <div>
              <span className="mr-3">You can reach me at</span>
              <AutoWidthInput
                value={form.email}
                placeholder="Email*"
                type="email"
                minCh={16}
                onChange={(v) => update("email", v)}
              />
              <span>.</span>
            </div>
            <div className="mt-4 sm:mt-5">
              <span className="mr-3">Or by phone at</span>
              <CustomSelect
                value={form.countryCode}
                onChange={(v) => update("countryCode", v)}
                options={COUNTRY_CODE_OPTIONS}
                placeholder="Code*"
                className="mr-3 w-28 sm:w-32"
              />
              <AutoWidthInput
                value={form.phone}
                placeholder="Phone Number*"
                type="tel"
                onChange={(v) => update("phone", v)}
              />
              <span>.</span>
            </div>
          </div>

          <div className="mt-4">
            <button
              type="button"
              disabled={!step1Valid}
              onClick={() => setStep(2)}
              className="bg-fanaar-brown text-fanaar-cream px-6 sm:px-8 py-3 rounded font-bold text-base sm:text-lg hover:bg-fanaar-cream hover:text-fanaar-brown disabled:opacity-40 transition-colors duration-300"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col gap-8 sm:gap-10 text-xl sm:text-2xl md:text-3xl leading-relaxed text-fanaar-cream">
          <div>
            <span className="mr-3">I&apos;m looking for help with</span>
            <CustomSelect
              value={form.service}
              onChange={(v) => update("service", v)}
              options={SERVICE_OPTIONS}
              placeholder="Service*"
              className="mr-3 w-full sm:w-72 md:w-[22rem]"
            />
            <span className="mr-3">, and my estimated budget is around</span>
            <AutoWidthInput
              value={form.budget}
              placeholder="Budget (optional)"
              onChange={(v) => update("budget", v)}
            />
            <span>.</span>
          </div>

          <div>
            <span className="block mb-3">Here&apos;s a bit about my project:</span>
            <textarea
              value={form.projectDescription}
              onChange={(e) => update("projectDescription", e.target.value)}
              placeholder="Please describe your project*"
              rows={2}
              className={`${blankClass} block w-full max-w-xl text-lg resize-y`}
            />
          </div>

          <label className="flex items-center gap-2 text-base text-fanaar-cream/70 cursor-pointer">
            <input
              type="checkbox"
              checked={form.requestNDA}
              onChange={(e) => update("requestNDA", e.target.checked)}
              className="w-4 h-4 accent-fanaar-brown cursor-pointer"
            />
            <span>Please treat this as confidential (request an NDA)</span>
          </label>

          {/* Honeypot — hidden from users, catches bots that auto-fill every field */}
          <input
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          {error && <p className="text-base text-fanaar-brown font-semibold">{error}</p>}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 mt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="border border-fanaar-cream/50 text-fanaar-cream px-6 sm:px-8 py-3 rounded font-bold text-base sm:text-lg hover:border-fanaar-cream transition-colors duration-300"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!step2Valid || status === "sending"}
              onClick={handleSubmit}
              className="bg-fanaar-brown text-fanaar-cream px-6 sm:px-8 py-3 rounded font-bold text-base sm:text-lg hover:bg-fanaar-cream hover:text-fanaar-brown disabled:opacity-40 transition-colors duration-300"
            >
              {status === "sending" ? "Sending…" : "Book a Free Discovery Call"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
