import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { CaseCard } from "@/components/case-card";
import { EmailSignup } from "@/components/email-signup";
import { StatCallout } from "@/components/stat-callout";
import { TrustStrip } from "@/components/trust-strip";
import { assetIndex } from "@/data/assets";
import { impactStats, storyStats, supportOptions } from "@/data/site-content";
import { getCases } from "@/lib/db/cases";
import {
  getDonationContent,
  getTrustContent,
} from "@/lib/site-content";
import type { CaseStatus } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support The Wolf Project — fund the moment that matters so families don't have to choose between their dog's life and the cost of care.",
};

// Real-impact story snippets surfaced on the Donate page until full case pages
// are gathered. Stakeholder-supplied placeholder copy.
const impactStoriesPlaceholder = [
  {
    name: "Wolf",
    summary:
      "The dog whose story started this work — emergency exploratory surgery at $13,000 due upfront, given a 0–10% chance to survive.",
    href: "/our-story",
  },
  {
    name: "Diesel",
    summary:
      "A family facing impossible numbers for treatable trauma care. Story details to be added — stakeholder content pending.",
    href: "/cases",
  },
  {
    name: "Rocky",
    summary:
      "Time-sensitive emergency where access to care was the only barrier between Rocky and recovery. Story details pending.",
    href: "/cases",
  },
];

export default async function DonatePage() {
  const [allCases, donationContent, trustContent] = await Promise.all([
    getCases(),
    getDonationContent(),
    getTrustContent(),
  ]);
  const activeCases = allCases.filter((c) =>
    ["active", "funded", "in-treatment"].includes(c.status),
  );

  const donateOption = supportOptions[0];
  const monthlyOption = supportOptions[1];

  return (
    <>
      {/* Hero — emotional opener + progress + primary CTA */}
      <section className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
              Back The Pack
            </p>
            <h1 className="mt-4 text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl">
              {donationContent.donateHeroTitle}
            </h1>
            <div className="mt-6 h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
              {donationContent.donateHeroIntro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={donateOption.href} external variant="donate">
                Donate Now
              </ButtonLink>
              <ButtonLink href="#ways-to-give" variant="secondary">
                See all ways to give
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="panel p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
              {donationContent.progressLabel}
            </p>
            <div className="mt-4">
              <DonationProgressBar />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why we exist — Wolf's story in short */}
      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="relative aspect-4/5 overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white shadow-[0_24px_54px_rgba(17,22,20,0.08)]">
            <Image
              src={assetIndex["wolf-hero-1"].localSrc}
              alt={assetIndex["wolf-hero-1"].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionHeading
              eyebrow="This is why we exist"
              title="Wolf's story changed everything."
              intro="Wolf wasn't a rescue. He wasn't neglected. He was a beloved family member. And when emergency came, the only thing standing between him and survival was the cost of trying."
            />
            <div className="mt-8">
              <ButtonLink href="/our-story" variant="secondary">
                Read Wolf&apos;s full story
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The problem — financial euthanasia explainer with stat callouts */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Quiet Crisis"
            title="What financial euthanasia really means."
            intro="When emergency veterinary care arrives without warning and costs thousands upfront, families are forced into a decision no one should have to make — not whether to try, but whether they can afford to. Treatable dogs are lost not to medicine, but to access."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {storyStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <StatCallout value={stat.value} label={stat.label} detail={stat.note} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* The solution — we fund the moment that matters */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal className="rounded-[2.4rem] border border-garnet/15 bg-blush p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
            Our Solution
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight tracking-wide text-ink sm:text-5xl">
            We fund the moment that matters.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink-soft">
            We focus on the moment where diagnosis becomes a decision. When a life can be saved
            and the only barrier is upfront cost, we step in — so families can keep fighting
            and dogs can stay where they belong.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { step: "1", title: "Vet identifies the case", body: "A treatable, time-sensitive emergency where cost is the barrier." },
              { step: "2", title: "We review fast", body: "Medical viability, urgency, and resources — every case is evaluated with care." },
              { step: "3", title: "We fund the deposit", body: "Direct payment to the hospital so care can begin immediately." },
            ].map((s) => (
              <article key={s.step} className="rounded-2xl border border-ink/8 bg-white/85 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-garnet-deep">
                  Step {s.step}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{s.body}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Real impact — featured story snippets */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Real Impact"
            title="Dogs who got their chance."
            intro="Every dollar you give shows up here — in real families, real diagnoses, real outcomes."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactStoriesPlaceholder.map((story, index) => (
            <Reveal key={story.name} delay={index * 70}>
              <article className="panel flex h-full flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                  Impact story
                </p>
                <h3 className="mt-3 text-3xl font-bold text-ink">{story.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{story.summary}</p>
                <ButtonLink href={story.href} variant="ghost" className="mt-6 self-start">
                  Read more
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 text-center">
            <ButtonLink href={donateOption.href} external variant="donate">
              Help the next dog
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Active cases */}
      {activeCases.length > 0 && (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Support a Specific Dog"
              title={donationContent.activeCasesTitle}
              intro={donationContent.activeCasesIntro}
            />
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCases.map((c) => (
              <Reveal key={c!.slug} delay={40}>
                <CaseCard
                  slug={c!.slug}
                  name={c!.name}
                  summary={c!.summary}
                  heroImage={c!.heroImage}
                  status={c!.status as CaseStatus}
                  goalUsd={c!.goalUsd}
                  raisedUsd={c!.raisedUsd ?? 0}
                />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-6 text-center">
              <ButtonLink href="/cases" variant="secondary">
                View All Cases
              </ButtonLink>
            </div>
          </Reveal>
        </section>
      )}

      {/* Impact tiers — visual stat callouts */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="What Your Gift Builds"
            title="Every gift becomes a moment we can say yes."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {impactStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <StatCallout value={stat.value} label={stat.label} detail={stat.detail} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ways to give — three options including Membership */}
      <section id="ways-to-give" className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Ways to Give"
            title={donationContent.tiersTitle}
            intro={donationContent.tiersIntro}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Reveal>
            <article className="panel flex h-full flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                One-Time
              </p>
              <h3 className="mt-3 text-2xl font-bold text-ink">{donationContent.oneTimeTitle}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                {donationContent.oneTimeDescription}
              </p>
              <ButtonLink href={donateOption.href} external variant="donate" className="mt-6">
                {donationContent.oneTimeButtonLabel}
              </ButtonLink>
            </article>
          </Reveal>
          <Reveal delay={70}>
            <article className="panel flex h-full flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                Monthly
              </p>
              <h3 className="mt-3 text-2xl font-bold text-ink">{donationContent.monthlyTitle}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                {donationContent.monthlyDescription}
              </p>
              <ButtonLink href={monthlyOption.href} external variant="donate" className="mt-6">
                {donationContent.monthlyButtonLabel}
              </ButtonLink>
            </article>
          </Reveal>
          <Reveal delay={140}>
            <article className="panel flex h-full flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                Membership
              </p>
              <h3 className="mt-3 text-2xl font-bold text-ink">Become a Wolf Project Member</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                A developing concept where families support the project monthly or annually and
                may receive instant access for life-saving care plus annual wellness through
                partner vets.
              </p>
              <ButtonLink href="/membership" variant="primary" className="mt-6">
                Join the waitlist
              </ButtonLink>
            </article>
          </Reveal>
        </div>

        {/* Founding tier recognition list */}
        <Reveal>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {donationContent.tiers.map((tier, i) => (
              <article
                key={tier.name}
                className="rounded-2xl border border-ink/8 bg-white/78 p-5"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <p className="text-2xl font-semibold text-garnet-deep">{tier.amount}</p>
                <h3 className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink">
                  {tier.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{tier.note}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Trust block */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Trust & Transparency"
            title="Where every dollar goes."
            intro={donationContent.trustText}
          />
        </Reveal>
        <Reveal delay={80}>
          <TrustStrip items={trustContent.trustFacts} className="mt-8" />
        </Reveal>
        <Reveal>
          <div className="mt-8 text-center">
            <ButtonLink href="/transparency" variant="secondary">
              See full transparency report
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Email signup */}
      <section className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading={donationContent.emailHeading}
              description={donationContent.emailDescription}
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-8 text-center">
            <ButtonLink href={donateOption.href} external variant="donate">
              Donate Now
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
