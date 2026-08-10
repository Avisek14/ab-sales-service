import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="h-10 w-10 overflow-hidden rounded-full flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="AB Sales & Service"
              width={40}
              height={40}
              className="h-full w-full object-cover scale-125"
              priority
            />
          </span>
          <span className="font-display text-lg tracking-tight text-ink">
            AB Sales &amp; Service
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ink/70 hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/track"
          className="rounded-full bg-ink text-paper text-sm px-4 py-2 hover:bg-dusk transition-colors"
        >
          Track my progress
        </Link>
      </div>
    </header>
  );
}
