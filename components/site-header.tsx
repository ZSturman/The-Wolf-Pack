"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, supportOptions } from "@/data/site-content";
import { cn } from "@/lib/cn";
import { ButtonLink } from "./button-link";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/6 bg-cream/82 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-ink/8 bg-white">
            <Image
              src="/assets/brand/ydcs-logo.png"
              alt="The Wolf Project / Your Dog Can Stay logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
              The Wolf Project
            </p>
            <p className="text-lg font-bold text-ink sm:text-xl">
              Your Dog Can Stay
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition hover:bg-white/70 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  active && "bg-white text-ink shadow-[0_12px_24px_rgba(15,20,18,0.06)]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={supportOptions[0].href} external variant="primary">
            Donate Now
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white/75 text-ink lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="space-y-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
            <span className="block h-0.5 w-5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-ink/6 bg-cream/95 px-5 py-5 shadow-[0_20px_40px_rgba(17,22,20,0.08)] lg:hidden">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-3xl px-4 py-3 text-base font-medium text-ink-soft transition hover:bg-white/70 hover:text-ink",
                  active && "bg-white text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <ButtonLink
            href={supportOptions[0].href}
            external
            variant="primary"
            className="mt-5 w-full"
          >
            Donate Now
          </ButtonLink>
        </div>
      ) : null}
    </header>
  );
}
