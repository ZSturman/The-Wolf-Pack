import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { CaseStatusBadge } from "@/components/case-status-badge";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { supportOptions } from "@/data/site-content";
import { getCase } from "@/lib/db/cases";
import type { CaseStatus, CaseUpdate } from "@/types/site";

export const dynamic = "force-dynamic";

type Params = { slug: string };

const generalDonateHref = supportOptions[0].href;
const monthlyHref = supportOptions[1].href;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCase(slug);
  if (!entry) return {};
  return {
    title: entry.name,
    description: entry.summary,
  };
}

function caseDonateHref(entry: { donationLink: string }) {
  return entry.donationLink || generalDonateHref;
}

function pct(raised: number, goal: number) {
  return goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
}

function TimelineList({ items }: { items: CaseUpdate[] }) {
  return (
    <div className="space-y-5">
      {items.map((item, index) => (
        <article key={`${item.date}-${item.title}-${index}`} className="border-l-2 border-garnet/25 pl-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            {item.date}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-sm leading-7 text-ink-soft">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

export default async function CasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const entry = await getCase(slug);
  if (!entry) notFound();

  const storyContent = entry.story || undefined;
  const renderable = storyContent
    ? Markdoc.transform(Markdoc.parse(storyContent))
    : null;
  const donateHref = caseDonateHref(entry);
  const updates = entry.updates ?? [];
  const medicalNotes = entry.medicalNotes ?? [];
  const timeline = entry.timeline?.length ? entry.timeline : updates;
  const gallery = [entry.heroImage, ...(entry.gallery ?? [])].filter(Boolean) as string[];
  const fundingPct = pct(entry.raisedUsd ?? 0, entry.goalUsd);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <CaseStatusBadge status={entry.status as CaseStatus} />
              {entry.urgencyLabel ? (
                <span className="rounded-full bg-garnet-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-garnet-deep">
                  {entry.urgencyLabel}
                </span>
              ) : null}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                Emergency case story
              </p>
              <h1 className="mt-3 text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
                {entry.name}
              </h1>
              <p className="mt-3 text-sm font-medium text-ink-soft">
                {[entry.breed, entry.age, entry.condition].filter(Boolean).join(" / ")}
              </p>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft">
              {entry.summary}
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Raised
                </p>
                <p className="mt-2 text-2xl font-semibold text-ink">
                  ${(entry.raisedUsd ?? 0).toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Goal
                </p>
                <p className="mt-2 text-2xl font-semibold text-ink">
                  ${entry.goalUsd.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                  Funded
                </p>
                <p className="mt-2 text-2xl font-semibold text-ink">
                  {fundingPct}%
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={donateHref} external variant="donate">
                Donate to {entry.name}
              </ButtonLink>
              <ButtonLink href={generalDonateHref} external variant="secondary">
                Support LIFELINE
              </ButtonLink>
              <ButtonLink href={monthlyHref} external variant="ghost">
                Join monthly
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-[2rem] border border-ink/8 bg-white shadow-[0_28px_60px_rgba(17,22,20,0.08)]">
              <div className="relative aspect-[4/3] bg-sand">
                {entry.heroImage ? (
                  <Image
                    src={entry.heroImage}
                    alt={entry.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1280px) 44vw, 100vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-6xl font-bold text-ink-soft/25">
                    {entry.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-6">
                <DonationProgressBar
                  goalUsd={entry.goalUsd}
                  raisedUsd={entry.raisedUsd ?? 0}
                />
                {entry.fundingNeed ? (
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    {entry.fundingNeed}
                  </p>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="rounded-[2rem] border border-garnet/15 bg-blush p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
              Treatment need
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase leading-tight tracking-wide text-ink">
              What care is being funded
            </h2>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              {entry.treatmentNeed ||
                "Emergency diagnostics, treatment, hospitalization, medication, and follow-up care for this approved case."}
            </p>
          </Reveal>

          <Reveal delay={100} className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-ink/8 bg-white/78 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                Owner relationship
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {entry.ownerCommitment ||
                  "Families are expected to participate in the plan, contribute when possible, stay in communication, and share updates donors can trust."}
              </p>
            </article>
            <article className="rounded-2xl border border-ink/8 bg-white/78 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                Case approval
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {entry.approvalCriteriaNote ||
                  "Cases are reviewed for urgency, medical viability, owner participation, veterinary recommendation, and available resources."}
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      {renderable ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <div className="prose-tight mx-auto max-w-3xl text-base leading-8 text-ink-soft">
              {Markdoc.renderers.react(renderable, React)}
            </div>
          </Reveal>
        </section>
      ) : null}

      {updates.length > 0 ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                  Real-time updates
                </p>
                <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
                  Follow the story as it changes.
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink-soft">
                  Updates keep donors close to the care decision, the treatment
                  journey, and the outcome without crowding the page.
                </p>
              </div>
              <TimelineList items={updates} />
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {medicalNotes.length > 0 ? (
            <Reveal>
              <div className="rounded-[2rem] border border-ink/8 bg-white/78 p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                  Medical notes
                </p>
                <h2 className="mt-3 text-3xl font-bold uppercase leading-tight tracking-wide text-ink">
                  What the care team is watching
                </h2>
                <div className="mt-6">
                  <TimelineList items={medicalNotes} />
                </div>
              </div>
            </Reveal>
          ) : null}

          {timeline.length > 0 ? (
            <Reveal delay={100}>
              <div className="rounded-[2rem] border border-ink/8 bg-white/78 p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
                  Case timeline
                </p>
                <h2 className="mt-3 text-3xl font-bold uppercase leading-tight tracking-wide text-ink">
                  From emergency to outcome
                </h2>
                <div className="mt-6">
                  <TimelineList items={timeline} />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </section>

      {(gallery.length > 0 || entry.videoUrl) ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
              Photos and video
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
              Donors should be able to see the journey.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img, index) => (
              <Reveal key={`${img}-${index}`} delay={index * 60}>
                <div className="relative aspect-square overflow-hidden rounded-2xl border border-ink/8 bg-sand">
                  <Image
                    src={img}
                    alt={`${entry.name} photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </Reveal>
            ))}
            {entry.videoUrl ? (
              <Reveal delay={gallery.length * 60}>
                <div className="aspect-video overflow-hidden rounded-2xl border border-ink/8 bg-ink">
                  <iframe
                    title={`${entry.name} video`}
                    src={entry.videoUrl}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
          <Reveal className="rounded-[2rem] bg-forest p-7 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand/80">
              Donor impact
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-white">
              {entry.status === "completed" ? "What support made possible" : "What your gift changes now"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/76">
              {entry.donorImpactNote ||
                "Your gift helps close the access-to-care gap so treatment can begin, continue, or finish with clarity."}
            </p>
          </Reveal>

          <Reveal delay={100} className="rounded-[2rem] border border-ink/8 bg-white/82 p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
              Giving options
            </p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: `Give to ${entry.name}`,
                  body: "Support this specific case and follow the outcome.",
                  href: donateHref,
                  external: true,
                },
                {
                  title: "LIFELINE Fund",
                  body: "Help the next urgent deposit happen faster.",
                  href: generalDonateHref,
                  external: true,
                },
                {
                  title: "Wolf Pack",
                  body: "Monthly support keeps the work sustainable.",
                  href: monthlyHref,
                  external: true,
                },
              ].map((option) => (
                <article key={option.title} className="rounded-2xl border border-ink/8 bg-cream p-5">
                  <h3 className="text-lg font-semibold text-ink">{option.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{option.body}</p>
                  <ButtonLink
                    href={option.href}
                    external={option.external}
                    variant="donate"
                    className="mt-5 w-full"
                  >
                    Open path
                  </ButtonLink>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {entry.veterinaryPartner ? (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <div className="mx-auto max-w-3xl rounded-2xl border border-ink/8 bg-white/75 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                Veterinary partner
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                {entry.veterinaryPartner}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                The Wolf Project supports access to care. Licensed veterinary
                professionals make the medical recommendations and provide care.
              </p>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="section-shell pb-20">
        <Reveal>
          <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center sm:flex-row sm:justify-center">
            <ButtonLink href="/cases" variant="secondary">
              View all cases
            </ButtonLink>
            <ButtonLink href="/donate" variant="ghost">
              See all ways to give
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
