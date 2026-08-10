// Placeholder gallery — swap the `items` array for real installation
// photos (e.g. uploaded via Cloudinary) once you have them.
const items = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  caption: `Installation ${i + 1}`,
}));

export default function Gallery() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-solar-deep mb-4">
        Gallery
      </p>
      <h1 className="font-display text-4xl mb-12">Recent installations</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="group">
            <div className="aspect-[4/3] rounded-xl bg-dusk/10 border border-line flex items-center justify-center text-ink/30 font-mono text-xs">
              photo placeholder
            </div>
            <p className="mt-2 text-sm text-ink/60">{item.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
