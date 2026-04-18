import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { CaseCard } from "@/components/case-card";
import { EmailSignup } from "@/components/email-signup";
import { supportOptions } from "@/data/site-content";
import { getCases } from "@/lib/db/cases";
import { getDonationContent } from "@/lib/site-content";
import type { CaseStatus } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support The Wolf Project — help families access emergency veterinary care so dogs can stay in the homes where they belong.",
};

export default async function DonatePage() {
  const [allCases, donationContent] = await Promise.all([
    getCases(),
    getDonationContent(),
  ]);
  const activeCases = allCases
    .filter((c) => ["active", "funded", "in-treatment"].includes(c.status));

  const donateOption = supportOptions[0];
  const monthlyOption = supportOptions[1];

  return (
    <>
      {/* Hero */}
      <section className="section-shell py-20 text-center lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Back The Pack"
            title={donationContent.donateHeroTitle}
            intro={donationContent.donateHeroIntro}
            align="center"
          />
        </Reveal>
      </section>

      {/* Progress */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <p className="text-center text-sm font-semibold uppercase tracking-widest text-ink-soft">
              {donationContent.progressLabel}
            </p>
            <div className="mt-4">
              <DonationProgressBar />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Donation options */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                One-Time Gift
              </p>
              <h3 className="mt-3 text-2xl font-bold text-ink">
                {donationContent.oneTimeTitle}
              </h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">
                {donationContent.oneTimeDescription}
              </p>
              <ButtonLink
                href={donateOption.href}
                external
                variant="primary"
                className="mt-6"
              >
                {donationContent.oneTimeButtonLabel}
              </ButtonLink>
            </div>
            <div className="panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                Monthly Commitment
              </p>
              <h3 className="mt-3 text-2xl font-bold text-ink">
                {donationContent.monthlyTitle}
              </h3>
              <p className="mt-2 text-sm leading-7 text-ink-soft">
                {donationContent.monthlyDescription}
              </p>
              <ButtonLink
                href={monthlyOption.href}
                external
                variant="primary"
                className="mt-6"
              >
                {donationContent.monthlyButtonLabel}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Support a specific dog */}
      {activeCases.length > 0 && (
        <section className="section-shell pb-16">
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

      {/* Founding tiers */}
      <section className="section-shell pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="Founding Pack Recognition"
            title={donationContent.tiersTitle}
            intro={donationContent.tiersIntro}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donationContent.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 60}>
              <div className="panel flex h-full flex-col p-6">
                <p className="text-2xl font-bold text-ink">{tier.amount}</p>
                <h3 className="mt-1 text-sm font-semibold uppercase tracking-wider text-ink-soft">
                  {tier.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">
                  {tier.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-8 text-center">
            <ButtonLink
              href={donateOption.href}
              external
              variant="primary"
            >
              {donationContent.tiersButtonLabel}
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Email signup */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading={donationContent.emailHeading}
              description={donationContent.emailDescription}
            />
          </div>
        </Reveal>
      </section>

      {/* Trust */}
      <section className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
              Trust &amp; Transparency
            </p>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              {donationContent.trustText}
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
