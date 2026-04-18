import Link from "next/link";
import { campaignStatus, navigation, socialLinks, supportOptions } from "@/data/site-content";
import { ButtonLink } from "./button-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/6 bg-forest text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.3fr_0.8fr_0.8fr] lg:px-10">
        <div className="space-y-5">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand/80">
            The Wolf Project
          </p>
          <h2 className="font-display text-4xl leading-tight text-white sm:text-5xl">
            When treatment exists, families deserve the chance to say yes.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/76">
            The Wolf Project is an initiative under SGT Canines dedicated to
            breaking the financial barriers that stand between dogs and the
            life-saving veterinary care.
          </p>
          <p className="max-w-2xl text-sm leading-7 text-white/76">
            SGT Canines is a 501c3 non-profit organization in the state of
            Florida. All donations are tax deductible. EIN:{" "}
            <span className="font-semibold text-white">99-4415153</span>.
          </p>
          <p className="max-w-2xl text-sm leading-7 text-white/76">
            {campaignStatus.operationalState} {campaignStatus.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={supportOptions[0].href} external variant="inverse">
              Donate Now
            </ButtonLink>
            <ButtonLink href="/our-promise" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/16 hover:text-white">
              Our Promise
            </ButtonLink>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-sand/80">
            Explore
          </h3>
          <ul className="mt-4 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/78 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-sand/80">
            Follow the mission
          </h3>
          <ul className="mt-4 space-y-3">
            {socialLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/78 transition hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs leading-6 text-white/56">
            Join the Wolf Pack community and follow along as we build the
            lifeline.
          </p>
        </div>
      </div>
    </footer>
  );
}
