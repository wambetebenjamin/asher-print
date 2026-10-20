"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Menu, Printer, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS, WHATSAPP_DISPLAY } from "@/lib/site";
import { useQuoteStore } from "@/lib/quote-store";

/**
 * Zip header rebuilt: 5px primary top border, primary logo block,
 * right aligned nav with primary hover and active colour (preset3).
 */
export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const items = useQuoteStore((s) => s.items);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(items.length);
  }, [items]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="header-zip sticky top-0 z-[900] shadow-sm" role="banner">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between px-4 sm:px-6">
        <Link href="/" className="navbar-brand-zip" aria-label="Asher Print home">
          <Printer size={26} aria-hidden="true" />
          <span className="font-display text-lg uppercase leading-5 tracking-wide">
            Asher Print
            <span className="block text-[11px] normal-case tracking-normal opacity-90">
              Print it. Brand it. Own it.
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`px-3 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                isActive(link.href) ? "text-primary" : "text-heading hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="relative ml-1 inline-flex items-center gap-1 px-2 py-2 text-heading hover:text-primary"
            aria-label={`Quote basket, ${count} items`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {count > 0 ? (
              <span className="absolute -right-1 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white">
                {count}
              </span>
            ) : null}
          </Link>
          {session?.user ? (
            <span className="ml-2 flex items-center gap-2">
              <span className="hidden text-sm text-body xl:inline">
                {session.user.name || session.user.email}
              </span>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="btn-primary-zip"
              >
                Sign Out
              </button>
            </span>
          ) : (
            <Link href="/auth/signin" className="btn-primary-zip solid ml-2">
              Sign In
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="flex items-center bg-primary px-3 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <nav aria-label="Mobile navigation" className="border-t border-hairline bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block py-2.5 text-sm font-bold uppercase tracking-wide ${
                    isActive(link.href) ? "text-primary" : "text-heading"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-wrap items-center gap-3 py-3">
              {session?.user ? (
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn-primary-zip"
                >
                  Sign Out
                </button>
              ) : (
                <Link href="/auth/signin" className="btn-primary-zip solid">
                  Sign In
                </Link>
              )}
              <a href={`tel:${WHATSAPP_DISPLAY}`} className="text-sm font-bold text-heading">
                {WHATSAPP_DISPLAY}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
