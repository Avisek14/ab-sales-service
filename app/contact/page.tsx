import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-widest text-solar-deep mb-4">
        Contact
      </p>
      <h1 className="font-display text-4xl mb-4">Get a free site assessment</h1>
      <p className="text-ink/65 mb-10">
        Tell us a bit about your home and we&apos;ll schedule a visit. This is
        also how you get set up in our tracker — you&apos;ll be able to follow
        every step from here.
      </p>
      <ContactForm />
    </section>
  );
}
