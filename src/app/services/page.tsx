import { services } from "@/lib/services";

export default function ServicesPage() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      {services.map((service) => (
        <section key={service.slug} className="mb-12">
          <h2 className="text-2xl font-semibold">{service.title}</h2>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {service.tiers.map((tier) => (
              <div key={tier.name} className="border rounded p-4">
                <h3 className="font-semibold">{tier.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{tier.summary}</p>
                <ul className="text-sm list-disc list-inside">
                  {tier.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
