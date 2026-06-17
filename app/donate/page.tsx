import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { CaseCard } from "@/components/case-card";
import { EmailSignup } from "@/components/email-signup";
import { StatCallout } from "@/components/stat-callout";
import { TrustStrip } from "@/components/trust-strip";
import { impactStats, supportOptions } from "@/data/site-content";
import { getCases } from "@/lib/db/cases";
import {
  getDonationContent,
  getTrustContent,
} from "@/lib/site-content";
import type { CaseStatus, DogCase } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support The Wolf Project through a case gift, the Emergency LIFELINE Fund, or monthly Wolf Pack giving.",
};

const activeStatuses: CaseStatus[] = ["active", "funded", "in-treatment"];
const generalDonateHref = supportOptions[0].href;
const monthlyHref = supportOptions[1].href;

function caseDonateHref(entry: DogCase) {
  return entry.donationLink || generalDonateHref;
}

function sortByPriority(a: DogCase, b: DogCase) {
  const priorityA = a.featuredPriority ?? 999;
  const priorityB = b.featuredPriority ?? 999;
  if (priorityA !== priorityB) return priorityA - priorityB;
  return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
}

export default async function DonatePage() {
  const [allCases, donationContent, trustContent] = await Promise.all([
    getCases(),
    getDonationContent(),
    getTrustContent(),
  ]);
  const activeCases = allCases
    .filter((entry) => activeStatuses.includes(entry.status as CaseStatus))
    .sort(sortByPriority);
  const featuredCase =
    activeCases.find((entry) => entry.slug === "azu") ??
    activeCases.find((entry) => entry.featured) ??
    activeCases[0] ??
    null;
  const successStories = allCases
    .filter((entry) => entry.status === "completed")
    .sort(sortByPriority)
    .slice(0, 3);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
              Give with clarity
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              Choose the path that matches the moment.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft">
              {donationContent.donateHeroIntro}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#primary-paths" variant="donate">
                See giving paths
              </ButtonLink>
              <ButtonLink href="/transparency" variant="secondary">
                Review transparency
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-[2rem] bg-forest p-7 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sand/80">
              {donationContent.progressLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase leading-tight tracking-wide text-white">
              The Emergency LIFELINE Fund keeps treatment deposits within reach.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/76">
              This fund supports urgent deposits, immediate care, follow-up, and
              the reserve that lets the project stand behind each yes.
            </p>
            <div className="mt-6">
              <DonationProgressBar dark />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="primary-paths" className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Primary donation paths"
            title="One mission. Three simple ways to help."
            intro="Donors should not have to decode where to give. Pick a case, strengthen the LIFELINE Fund, or become part of the monthly base."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {[
            {
              eyebrow: "Case gift",
              title: featuredCase ? `Help ${featuredCase.name} now` : "Help an active case",
              body: featuredCase
                ? featuredCase.summary
                : "Support a specific emergency case and follow updates from treatment to outcome.",
              href: featuredCase ? caseDonateHref(featuredCase) : generalDonateHref,
              label: featuredCase ? `Donate to ${featuredCase.name}` : "Donate to a case",
            },
            {
              eyebrow: "Emergency reserve",
              title: "Support the LIFELINE Fund",
              body:
                "Help cover treatment deposits, urgent care, and follow-up support so the next case does not start from zero.",
              href: generalDonateHref,
              label: "Give to LIFELINE",
            },
            {
              eyebrow: "Monthly giving",
              title: "Join the Wolf Pack",
              body:
                "Recurring donors build the steady base that makes responsible approvals and long-term sustainability possible.",
              href: monthlyHref,
              label: "Join monthly",
            },
          ].map((path) => (
            <Reveal key={path.eyebrow}>
              <article className="panel flex h-full flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                  {path.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-bold text-ink">{path.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">
                  {path.body}
                </p>
                <ButtonLink href={path.href} external variant="donate" className="mt-6">
                  {path.label}
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {activeCases.length > 0 ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Active emergencies"
              title={donationContent.activeCasesTitle}
              intro="Donate directly to a dog in need. Each case page shows updates, medical context, funding progress, and the outcome donors helped create."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeCases.slice(0, 3).map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 70}>
                <CaseCard
                  slug={entry.slug}
                  name={entry.name}
                  summary={entry.summary}
                  heroImage={entry.heroImage}
                  status={entry.status as CaseStatus}
                  goalUsd={entry.goalUsd}
                  raisedUsd={entry.raisedUsd ?? 0}
                />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-7 text-center">
              <ButtonLink href="/cases" variant="secondary">
                View all cases
              </ButtonLink>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Other ways to fund the work"
            title="Sponsors, matches, and grants help the LIFELINE grow faster."
            intro="These options are built for donors, companies, and funders who want to increase the reach of urgent care support."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Case sponsorship",
              body: "Underwrite a specific approved case and receive outcome reporting tied to that dog's journey.",
            },
            {
              title: "Corporate sponsor",
              body: "Fund a month of emergency readiness, community updates, or a named LIFELINE reserve push.",
            },
            {
              title: "Donor match",
              body: "Create a match challenge for Wednesday social pushes or Friday community fundraising emails.",
            },
            {
              title: "Grants",
              body: "Support emergency deposits, owner co-pay assistance, veterinary partnerships, or transparency reporting.",
            },
          ].map((option) => (
            <Reveal key={option.title}>
              <article className="rounded-2xl border border-ink/8 bg-white/78 p-5">
                <h3 className="text-xl font-semibold text-ink">{option.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{option.body}</p>
                <ButtonLink href="/contact" variant="ghost" className="mt-5">
                  Start a conversation
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {successStories.length > 0 ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Donor impact"
              title="Completed cases show what giving made possible."
              intro="Success stories connect the before, the treatment journey, the final outcome, and the donor impact."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map((entry, index) => (
              <Reveal key={entry.slug} delay={index * 70}>
                <CaseCard
                  slug={entry.slug}
                  name={entry.name}
                  summary={entry.donorImpactNote || entry.summary}
                  heroImage={entry.heroImage}
                  status={entry.status as CaseStatus}
                  goalUsd={entry.goalUsd}
                  raisedUsd={entry.raisedUsd ?? 0}
                />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="What your gift builds"
            title="Every dollar has a job."
            intro="Emergency care is urgent, but donor trust comes from seeing the structure behind the urgency."
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

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Trust and transparency"
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

      <section className="section-shell pb-20">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-ink/8 bg-white/82 p-8">
            <EmailSignup
              heading={donationContent.emailHeading}
              description="Get case updates, Wednesday social pushes, Friday community fundraising notes, and completed-case outcomes."
            />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
