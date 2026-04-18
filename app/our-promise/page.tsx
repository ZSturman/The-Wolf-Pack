import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { FAQList } from "@/components/faq-list";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { TrustStrip } from "@/components/trust-strip";
import {
  campaignStatus,
  faqItems,
  promiseCommitments,
  supportOptions,
  trustFacts,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Our Promise",
  description:
    "The Promise We Keep: clarity, accountability, and a commitment to access when a life can still be saved.",
};

export default function OurPromisePage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember/80">
              Our Promise
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-none text-ink text-balance sm:text-6xl lg:text-7xl">
              The Promise We Keep
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              We saw what happens when money decides who lives. We refuse to
              accept that as normal.
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              This is the promise we make - to every dog, every family, and
              every moment where time is running out: if a life can be saved,
              access should exist.
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
            eyebrow="What That Promise Means"
            title="We are building this with intention - and that means clarity in how we show up."
            intro="Because survival should never depend on how fast help arrives."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {promiseCommitments.map((commitment, index) => (
            <Reveal key={commitment} delay={index * 60}>
              <article className="panel h-full p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember/80">
                  Commitment {index + 1}
                </p>
                <p className="mt-4 text-lg leading-8 text-ink">{commitment}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <TrustStrip items={trustFacts} />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Transparency & Accountability"
              title="Trust is not assumed. It is built."
              intro="The clearest questions deserve direct answers."
            />
            <div className="mt-8">
              <FAQList items={faqItems} />
            </div>
          </Reveal>

          <Reveal delay={120} className="panel p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember/80">
              Where We Are Now
            </p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-ink">
              We are actively building the funding, structure, and partnerships
              needed to support emergency cases responsibly and sustainably.
            </h2>
            <div className="prose-tight mt-6 text-base leading-8 text-ink-soft">
              <p>
                At this time, the Access to Care Lifeline is not yet fully
                operational.
              </p>
              <p>
                Our priority is to ensure that when we say yes - we can fully
                stand behind it.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={supportOptions[0].href} external>
                {supportOptions[0].label}
              </ButtonLink>
              <ButtonLink href="/impact" variant="secondary">
                Where We Are Now
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
