import Hero from "@/components/Hero";
import MissionStatement from "@/components/MissionStatement";
import WhatWeDo from "@/components/WhatWeDo";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <MissionStatement />
      <WhatWeDo />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
