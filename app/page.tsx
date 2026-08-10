import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-dusk text-paper">
        <svg
          className="absolute inset-x-0 bottom-0 w-full opacity-40"
          viewBox="0 0 1200 200"
          aria-hidden="true"
        >
          <path
            d="M0 200 L0 120 L150 60 L300 120 L300 40 L450 100 L600 30 L750 110 L900 50 L1050 120 L1200 70 L1200 200 Z"
            fill="var(--color-ink)"
          />
        </svg>
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <p className="font-mono text-xs uppercase tracking-widest text-solar mb-4">
            TATA Power SolaRoof · Authorised Channel Partner
          </p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] max-w-2xl">
            Rooftop solar across Western &amp; Southern Odisha, start to switch-on.
          </h1>
          <p className="mt-6 max-w-xl text-paper/70 text-lg">
            From our Nabarangpur head office and branches in Kalahandi,
            Koraput, Malkangiri &amp; Boudh — we handle your PM Surya Ghar
            application, subsidy paperwork and installation end to end, and
            you can watch every stage happen, in real time.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-solar text-ink px-6 py-3 font-medium hover:bg-solar-deep transition-colors"
            >
              Get a free site assessment
            </Link>
            <Link
              href="/track"
              className="rounded-full border border-paper/30 px-6 py-3 font-medium hover:bg-paper/10 transition-colors"
            >
              Track my progress
            </Link>
          </div>
        </div>
      </section>

      {/* How it works — the pipeline, told as a sequence because it is one */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl sm:text-3xl mb-10">
          From inquiry to switch-on
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              n: "01",
              title: "We assess your roof",
              body:
                "A site visit checks feasibility, load, and shading — the basis for your subsidy application.",
            },
            {
              n: "02",
              title: "We handle the paperwork",
              body:
                "PM Surya Ghar application, bank loan coordination, and subsidy filing — all managed for you.",
            },
            {
              n: "03",
              title: "We install and connect",
              body:
                "Installation, net metering, and the TPSODL consumer update, tracked stage by stage.",
            },
          ].map((s) => (
            <div key={s.n}>
              <p className="font-mono text-solar-deep text-sm mb-2">{s.n}</p>
              <h3 className="font-display text-xl mb-2">{s.title}</h3>
              <p className="text-ink/65 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracker callout */}
      <section className="border-t border-line bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl mb-2">
              No more &quot;any update on my file?&quot; calls.
            </h2>
            <p className="text-ink/65 max-w-lg">
              Log in with your phone number to see exactly where your
              application or installation stands, any time.
            </p>
          </div>
          <Link
            href="/track"
            className="shrink-0 rounded-full bg-ink text-paper px-6 py-3 font-medium hover:bg-dusk transition-colors"
          >
            Check my status
          </Link>
        </div>
      </section>
    </>
  );
}