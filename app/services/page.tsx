const services = [
  {
    title: "Site feasibility assessment",
    body: "Roof survey, load estimate, and shading check to size the right system for your home.",
  },
  {
    title: "PM Surya Ghar application",
    body: "We file your application under the Muft Bijli Yojana scheme and track it through to approval.",
  },
  {
    title: "Bank loan coordination",
    body: "We liaise with partner banks on your solar loan so financing doesn't hold up your install.",
  },
  {
    title: "Installation",
    body: "TATA Power SolaRoof panels and inverters, installed and commissioned by our trained technicians.",
  },
  {
    title: "Net metering & TPSODL paperwork",
    body: "We handle net metering setup and any TPSODL consumer name-change or connection paperwork.",
  },
  {
    title: "Subsidy disbursement follow-up",
    body: "We track your subsidy through to disbursement and keep you posted at every step.",
  },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-solar-deep mb-4">
        Services
      </p>
      <h1 className="font-display text-4xl mb-12 max-w-xl">
        Everything between &quot;I&apos;m interested&quot; and &quot;it&apos;s switched on.&quot;
      </h1>
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="border-t border-line pt-5">
            <h2 className="font-display text-xl mb-2">{s.title}</h2>
            <p className="text-ink/65 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
