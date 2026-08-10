import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-dusk text-paper/80">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-display text-lg text-paper">AB Sales &amp; Service</p>
          <p className="mt-2 text-paper/60">
            TATA Power SolaRoof Authorised Channel Partner
          </p>
        </div>
        <div>
          <p className="text-paper/60 mb-2">Scheme</p>
          <p>PM Surya Ghar: Muft Bijli Yojana</p>
        </div>
        <div>
          <p className="text-paper/60 mb-2">Service area</p>
          <p>Nabarangpur (HO) · Kalahandi · Koraput · Malkangiri · Boudh</p>
        </div>
      </div>
      <div className="border-t border-paper/10 py-4 flex items-center justify-center gap-4 text-xs text-paper/40">
        <span>© {new Date().getFullYear()} AB Sales &amp; Service. All rights reserved.</span>
        <span aria-hidden="true">·</span>
        <Link href="/dashboard/login" className="hover:text-paper/70 transition-colors">
          Staff Login
        </Link>
      </div>
    </footer>
  );
}