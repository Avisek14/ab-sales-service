"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-20 flex items-center justify-between gap-3 md:justify-start">
        {/* Hamburger — mobile only, left side */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden shrink-0 h-9 w-9 flex items-center justify-center rounded-md hover:bg-ink/5"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 6h16M3 11h16M3 16h16" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="AB Sales & Service — Authorised Channel Partner of TATA Power SolaRoof"
            width={1280}
            height={248}
            className="h-14 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm ml-auto mr-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-ink/70 hover:text-ink transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/track"
          className="hidden md:inline-block rounded-full bg-ink text-paper text-sm px-4 py-2 hover:bg-dusk transition-colors shrink-0"
        >
          Track my progress
        </Link>

        <span className="md:hidden h-9 w-9 shrink-0" aria-hidden="true" />
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-line bg-paper px-4 py-4 space-y-1">
          <Link
            href="/track"
            onClick={() => setOpen(false)}
            className="block rounded-lg bg-ink text-paper text-sm px-4 py-2.5 mb-2 text-center"
          >
            Track my progress
          </Link>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-2 py-2.5 text-sm text-ink/80 hover:text-ink border-b border-line last:border-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/dashboard/login"
            onClick={() => setOpen(false)}
            className="block px-2 py-2.5 text-xs text-ink/40 hover:text-ink/70 mt-2"
          >
            Staff Login
          </Link>
        </div>
      )}
    </header>
  );
}