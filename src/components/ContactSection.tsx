import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen bg-fanaar-orange flex flex-col items-center px-6 md:px-16 py-16 sm:py-24">
      <div className="max-w-4xl w-full">
        <span className="text-xs font-semibold text-fanaar-cream/70 tracking-widest uppercase mb-6 sm:mb-8 block">
          ✦ Contact
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-fanaar-cream leading-tight mb-10 sm:mb-16">
          Let&apos;s talk about your growth
        </h2>
        <ContactForm />

        <p className="text-xs text-fanaar-cream/60 mt-12 leading-relaxed">
          By submitting this form, you agree to our{" "}
          <a href="/policies/privacy-policy.html" className="underline hover:text-fanaar-cream transition-colors">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/policies/terms-of-use.html" className="underline hover:text-fanaar-cream transition-colors">
            Terms of Use
          </a>
          . See our full{" "}
          <a href="/policies/policy-center.html" className="underline hover:text-fanaar-cream transition-colors">
            Policy Center
          </a>
          .
        </p>
      </div>
    </section>
  );
}
