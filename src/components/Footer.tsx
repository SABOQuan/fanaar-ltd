import Image from "next/image";

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.5-1.46h1.6V4.32C16.3 4.22 15.36 4 14.26 4 11.96 4 10.4 5.4 10.4 8.1v2.4H8v3h2.4V21h3.1Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.68 1.68 0 1 0 0 3.36A1.68 1.68 0 0 0 5.5 4ZM20 20v-6.4c0-3.06-1.63-4.48-3.8-4.48-1.75 0-2.53 1-2.97 1.66V8.5H10.4c.04.83 0 11.5 0 11.5h2.83v-6.42c0-.34.02-.69.12-.94.27-.68.9-1.4 1.94-1.4 1.37 0 1.92 1.05 1.92 2.58V20H20Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-fanaar-brown text-fanaar-cream px-6 sm:px-10 py-5 sm:py-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10">
        {/* Logo + location */}
        <div className="flex items-center gap-3">
          <Image src="/logo2-icon.png" alt="FANAAR" width={64} height={64} className="shrink-0 w-14 h-14 sm:w-16 sm:h-16" />
          <div>
            <p className="font-bold text-lg leading-tight">FANAAR</p>
            {/* TODO: confirm this is the address you want public before launch */}
            <p className="text-sm text-fanaar-cream/70 leading-tight">Lahore, Pakistan</p>
          </div>
        </div>

        {/* Numbers / policy links / socials — side by side even on mobile (flex-row here),
            not stacked in one long column. lg:contents removes this wrapper from the layout
            at desktop size, so lg:flex-row lg:justify-between on the parent above still
            arranges these three groups exactly as it did before. */}
        <div className="flex flex-row flex-wrap justify-between gap-x-6 gap-y-6 lg:contents">
          {/* Phone + email */}
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-fanaar-orange font-bold shrink-0">M</span>
              <span className="text-fanaar-cream/90 flex flex-col">
                <a href="tel:+923354210202" className="hover:text-fanaar-orange transition-colors">+92 335 4210202</a>
                <a href="tel:+923001419541" className="hover:text-fanaar-orange transition-colors">+92 300 1419541</a>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-fanaar-orange font-bold shrink-0">E</span>
              <a href="mailto:fanaarltd@gmail.com" className="text-fanaar-cream/90 hover:text-fanaar-orange transition-colors">
                fanaarltd@gmail.com
              </a>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-1 text-sm">
            <a href="/policies/terms-of-use.html" className="hover:text-fanaar-orange transition-colors">
              Terms &amp; Conditions
            </a>
            <a href="/policies/privacy-policy.html" className="hover:text-fanaar-orange transition-colors">
              Privacy Policy
            </a>
          </div>

          {/* Social icons — replaces the reference's "Portfolio" button */}
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="text-fanaar-cream hover:text-fanaar-orange transition-colors"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-fanaar-cream/20 mt-6 pt-3 text-left lg:text-center text-xs text-fanaar-cream/70">
        © 2026 FANAAR
      </div>
    </footer>
  );
}
