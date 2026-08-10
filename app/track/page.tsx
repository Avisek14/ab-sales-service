import TrackLogin from "./TrackLogin";

export default function Track() {
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-solar-deep mb-4">
        Track your progress
      </p>
      <h1 className="font-display text-3xl mb-4">
        Where&apos;s my installation at?
      </h1>
      <p className="text-ink/65 mb-10 text-sm">
        Log in with the phone number you gave us to see your current stage.
      </p>
      <TrackLogin />
    </section>
  );
}
