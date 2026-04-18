import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import {
  campaignStatus,
  impactMilestones,
  reportingFramework,
  supportOptions,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Where We Are Now",
  description:
    "See where The Wolf Project stands today as it builds the funding, structure, and partnerships needed to support emergency cases responsibly.",
};

const statusStyles = {
  current: "border-forest/18 bg-forest/8 text-forest",
  next: "border-ink/18 bg-ink/8 text-ink",
  future: "border-ink/10 bg-white/80 text-ink-soft",
} as const;

export default function ImpactPage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
              Where We Are Now
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              We are actively building the funding, structure, and partnerships
              needed to support emergency cases responsibly and sustainably.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              At this time, the Access to Care Lifeline is not yet fully
              operational.
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              Our priority is to ensure that when we say yes - we can fully
              stand behind it.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <StatusCard status={campaignStatus} />
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Current focus"
            title="Building the lifeline with care and clarity."
            intro="The work is early, intentional, and grounded in what the project can responsibly stand behind."
          />
        </Reveal>
        <div className="mt-8 space-y-4">
          {impactMilestones.map((milestone, index) => (
            <Reveal key={milestone.title} delay={index * 70}>
              <article className="panel p-6 sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                      Focus {index + 1}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold text-ink">
                      {milestone.title}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-ink-soft">
                      {milestone.description}
                    </p>
                  </div>
                  <div
                    className={`w-fit rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] ${statusStyles[milestone.status]}`}
                  >
                    {milestone.status}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              eyebrow="What guides the work"
              title="If treatment exists, it deserves the chance."
              intro="A dog&apos;s life should not depend on a wallet. Survival should not be a luxury."
            />
            <div className="mt-8 grid gap-4">
              {reportingFramework.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                    Belief {index + 1}
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-ink">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="panel p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
              Be Part of the Promise
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
              <li className="rounded-[1.4rem] border border-ink/8 bg-white/78 px-4 py-3">
                This only works if people choose to stand in that space.
              </li>
              <li className="rounded-[1.4rem] border border-ink/8 bg-white/78 px-4 py-3">
                Every family deserves the chance to say yes.
              </li>
              <li className="rounded-[1.4rem] border border-ink/8 bg-white/78 px-4 py-3">
                The Wolf Project exists so more dogs can stay where they belong
                - at home.
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={supportOptions[0].href} external>
                {supportOptions[0].label}
              </ButtonLink>
              <ButtonLink href="/our-promise" variant="secondary">
                Our Promise
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
