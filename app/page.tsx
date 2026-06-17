import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { CaseCard } from "@/components/case-card";
import { CaseStatusBadge } from "@/components/case-status-badge";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { EmailSignup } from "@/components/email-signup";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatCallout } from "@/components/stat-callout";
import { TrustStrip } from "@/components/trust-strip";
import { impactStats, supportOptions } from "@/data/site-content";
import { getCases } from "@/lib/db/cases";
import {
  getCampaignStatus,
  getHomeContent,
  getTrustContent,
} from "@/lib/site-content";
import type { CaseStatus, DogCase } from "@/types/site";

export const dynamic = "force-dynamic";

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

function latestUpdate(entry: DogCase) {
  return entry.updates?.[entry.updates.length - 1] ?? null;
}

export default async function Home() {
  const [allCases, campaignStatus, homeContent, trustContent] =
    await Promise.all([
      getCases(),
      getCampaignStatus(),
      getHomeContent(),
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
  const secondaryCases = activeCases
    .filter((entry) => entry.slug !== featuredCase?.slug)
    .slice(0, 2);
  const successStories = allCases
    .filter((entry) => entry.status === "completed")
    .sort(sortByPriority)
    .slice(0, 3);
  const update = featuredCase ? latestUpdate(featuredCase) : null;

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
          <Reveal className="space-y-7">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                Emergency animal rescue, told in real time
              </p>
              <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
                Help one dog through the moment that decides everything.
              </h1>
              <div className="h-1 w-24 rounded-full bg-garnet" aria-hidden="true" />
              <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                {homeContent.heroIntro}
              </p>
              <p className="max-w-2xl text-base leading-8 text-ink-soft">
                Follow the featured emergency case, choose a clear giving path,
                and see updates as care moves from crisis to outcome.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {featuredCase ? (
                <ButtonLink
                  href={`/cases/${featuredCase.slug}`}
                  variant="donate"
                >
                  Follow {featuredCase.name}
                </ButtonLink>
              ) : null}
              <ButtonLink href={generalDonateHref} external variant="secondary">
                Support the LIFELINE Fund
              </ButtonLink>
              <ButtonLink href={monthlyHref} external variant="ghost">
                Join the Wolf Pack
              </ButtonLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Focus
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                  One urgent story at a time
                </p>
              </div>
              <div className="rounded-2xl border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Fund
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                  Deposits, treatment, recovery
                </p>
              </div>
              <div className="rounded-2xl border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Trust
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                  Updates, outcomes, transparency
                </p>
              </div>
            </div>
          </Reveal>

          {featuredCase ? (
            <Reveal delay={120}>
              <article className="overflow-hidden rounded-[2rem] border border-ink/8 bg-white shadow-[0_28px_60px_rgba(17,22,20,0.08)]">
                <div className="relative aspect-[4/3] bg-sand">
                  {featuredCase.heroImage ? (
                    <Image
                      src={featuredCase.heroImage}
                      alt={featuredCase.name}
                      fill
                      priority
                      className="object-cover"
                      sizes="(min-width: 1280px) 48vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl font-bold text-ink-soft/25">
                      {featuredCase.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute left-4 top-4">
                    <CaseStatusBadge status={featuredCase.status as CaseStatus} />
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-garnet-deep">
                    Current featured emergency
                  </p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h2 className="text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
                        {featuredCase.name}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-ink-soft">
                        {[featuredCase.condition, featuredCase.urgencyLabel]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-garnet-deep">
                      {featuredCase.breed} / {featuredCase.age}
                    </p>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    {featuredCase.summary}
                  </p>
                  <div className="mt-5">
                    <DonationProgressBar
                      goalUsd={featuredCase.goalUsd}
                      raisedUsd={featuredCase.raisedUsd ?? 0}
                    />
                  </div>
                  {update ? (
                    <div className="mt-5 rounded-2xl border border-garnet/12 bg-blush p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-garnet-deep">
                        Latest update / {update.date}
                      </p>
                      <h3 className="mt-2 text-base font-semibold text-ink">
                        {update.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-ink-soft">
                        {update.body}
                      </p>
                    </div>
                  ) : null}
                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink
                      href={caseDonateHref(featuredCase)}
                      external
                      variant="donate"
                    >
                      Donate to {featuredCase.name}
                    </ButtonLink>
                    <ButtonLink href={`/cases/${featuredCase.slug}`} variant="secondary">
                      Read the case page
                    </ButtonLink>
                  </div>
                </div>
              </article>
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <Reveal className="rounded-[2rem] bg-forest p-7 text-white shadow-[0_30px_70px_rgba(17,22,20,0.16)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand/80">
              Emergency LIFELINE Fund
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-white">
              Treatment deposits need a fund that is ready before the crisis.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/76">
              The LIFELINE Fund supports urgent treatment deposits, emergency
              care, and the long-term reserve that lets The Wolf Project say yes
              responsibly when time is tight.
            </p>
            <div className="mt-6">
              <DonationProgressBar dark />
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={generalDonateHref} external variant="inverse">
                Give to the LIFELINE Fund
              </ButtonLink>
              <ButtonLink href="/transparency" variant="ghost" className="border-white/16 text-white hover:bg-white/10">
                See transparency
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-[2rem] border border-garnet/15 bg-blush p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
              Join the Wolf Pack
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
              Monthly donors keep emergency help from starting at zero.
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              One-time gifts help today. Monthly giving builds the base that
              keeps deposits, follow-up care, and responsible case commitments
              within reach.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["$10/mo steadies updates", "$25/mo supports meds", "$50/mo builds reserves"].map((item) => (
                <div key={item} className="rounded-2xl border border-ink/8 bg-white/80 p-4 text-sm font-semibold leading-6 text-ink">
                  {item}
                </div>
              ))}
            </div>
            <ButtonLink href={monthlyHref} external variant="donate" className="mt-6">
              Become a monthly donor
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {secondaryCases.length > 0 ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Other Active Emergencies"
              title="A small number of cases stay visible so donors can follow clearly."
              intro="The homepage stays focused: one urgent story leads, and only a limited set of active cases appear beside it."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {secondaryCases.map((entry, index) => (
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

      {successStories.length > 0 ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Success Stories"
              title="Completed cases show donors what their trust made possible."
              intro="Each outcome connects the estimate, the treatment journey, the family update, and the donor impact."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
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
            eyebrow="Impact & Trust"
            title="Urgency only works when accountability is visible."
            intro="Supporters should be able to see what was needed, what was funded, what changed, and how the next case is selected."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {impactStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <StatCallout
                value={stat.value}
                label={stat.label}
                detail={stat.detail}
              />
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <TrustStrip items={trustContent.trustFacts} className="mt-8" />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                Case approval and family partnership
              </p>
              <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
                The Wolf Project funds access, not confusion.
              </h2>
              <p className="mt-4 text-sm leading-7 text-ink-soft">
                Cases are reviewed for urgency, medical viability, owner
                participation, veterinary recommendation, and available funds.
                Families are expected to contribute when possible, stay in
                communication, and help donors follow the story through honest
                updates.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Wednesday",
                  body: "Social campaign push with the current case update and clear next ask.",
                },
                {
                  title: "Friday",
                  body: "Email and community fundraising push with progress and trust notes.",
                },
                {
                  title: "Monthly",
                  body: "Wolf Pack donors and the LIFELINE Fund build long-term readiness.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-ink/8 bg-white/78 p-5">
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="rounded-[2rem] border border-ink/8 bg-white/82 p-7 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                  Choose a clear path
                </p>
                <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
                  Give where your trust feels strongest.
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Every path supports the same promise: when treatment exists,
                  access should not be the reason a dog loses the chance to go
                  home.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    title: featuredCase ? `Donate to ${featuredCase.name}` : "Donate to a case",
                    body: "Help one urgent story move from estimate to treatment.",
                    href: featuredCase ? caseDonateHref(featuredCase) : generalDonateHref,
                    external: true,
                  },
                  {
                    title: "Support LIFELINE",
                    body: "Build the reserve for deposits, urgent care, and follow-up support.",
                    href: generalDonateHref,
                    external: true,
                  },
                  {
                    title: "Join monthly",
                    body: "Become part of the steady base that keeps this work ready.",
                    href: monthlyHref,
                    external: true,
                  },
                ].map((path) => (
                  <article key={path.title} className="rounded-2xl border border-ink/8 bg-cream p-5">
                    <h3 className="text-xl font-semibold text-ink">{path.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-ink-soft">{path.body}</p>
                    <ButtonLink
                      href={path.href}
                      external={path.external}
                      variant="donate"
                      className="mt-5 w-full"
                    >
                      Open path
                    </ButtonLink>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-[2rem] border border-ink/8 bg-white/82 p-8">
            <EmailSignup
              heading={homeContent.emailHeading}
              description="Get Wednesday case pushes, Friday community updates, completed-case outcomes, and LIFELINE Fund transparency notes."
            />
          </div>
        </Reveal>
      </section>

      <section className="section-shell pb-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-xs leading-6 text-ink-soft">
            Current emergency cases are live-style placeholders for Megan review.
            {` ${campaignStatus.summary}`}
          </p>
        </Reveal>
      </section>
    </div>
  );
}
