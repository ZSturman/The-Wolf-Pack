import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";
import Markdoc from "@markdoc/markdoc";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/button-link";
import { BlogCard } from "@/components/blog-card";
import { CaseStatusBadge } from "@/components/case-status-badge";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { getCase, getCases } from "@/lib/db/cases";
import { getPostsByCategory } from "@/lib/get-blog-posts";
import type { CaseStatus } from "@/types/site";

export const dynamic = "force-dynamic";

type Params = { slug: string };

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

  const donateHref =
    entry.donationLink ||
    "https://www.zeffy.com/en-US/donation-form/the-wolf-project-founding-pack-members";

  // Related blog posts (case updates)
  const caseUpdatePosts = await getPostsByCategory("case-updates");
  const relatedPosts = caseUpdatePosts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="section-shell py-20 lg:py-28">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <CaseStatusBadge status={entry.status as CaseStatus} />
            <h1 className="mt-4 text-4xl font-bold text-ink sm:text-5xl">
              {entry.name}
            </h1>
            {(entry.breed || entry.age) && (
              <p className="mt-2 text-sm text-ink-soft">
                {[entry.breed, entry.age].filter(Boolean).join(" · ")}
              </p>
            )}
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
              {entry.summary}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Hero image */}
      {entry.heroImage && (
        <section className="section-shell pb-12">
          <Reveal>
            <div className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-2xl border border-ink/8">
              <Image
                src={entry.heroImage}
                alt={entry.name}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 768px) 768px, 100vw"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Progress + donate */}
      {entry.goalUsd > 0 && (
        <section className="section-shell pb-12">
          <Reveal>
            <div className="panel mx-auto max-w-xl p-8">
              <DonationProgressBar
                goalUsd={entry.goalUsd}
                raisedUsd={entry.raisedUsd ?? 0}
              />
              <div className="mt-6 text-center">
                <ButtonLink href={donateHref} external variant="primary">
                  Donate to {entry.name}&apos;s Care
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Story */}
      <section className="section-shell pb-16">
        <Reveal>
          <div className="prose-tight mx-auto max-w-2xl text-ink-soft">
            {renderable ? Markdoc.renderers.react(renderable, React) : null}
          </div>
        </Reveal>
      </section>

      {/* Gallery */}
      {entry.gallery.length > 0 && (
        <section className="section-shell pb-16">
          <Reveal>
            <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
              Gallery
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {entry.gallery.map(
                (img, i) =>
                  img && (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-2xl border border-ink/8 bg-sand"
                    >
                      <Image
                        src={img}
                        alt={`${entry.name} photo ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  ),
              )}
            </div>
          </Reveal>
        </section>
      )}

      {/* Veterinary partner */}
      {entry.veterinaryPartner && (
        <section className="section-shell pb-12">
          <Reveal>
            <div className="mx-auto max-w-2xl rounded-2xl border border-ink/8 bg-white/75 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                Veterinary Partner
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">
                {entry.veterinaryPartner}
              </p>
            </div>
          </Reveal>
        </section>
      )}

      {/* Updates */}
      {entry.updates.length > 0 && (
        <section className="section-shell pb-20">
          <Reveal>
            <div className="mx-auto max-w-2xl">
              <h2 className="text-2xl font-bold text-ink">Updates</h2>
              <div className="mt-6 space-y-6">
                {entry.updates.map((u, i) => (
                  <div key={i} className="border-l-2 border-sand pl-5">
                    <p className="text-xs font-medium text-ink-soft">{u.date}</p>
                    <h3 className="mt-1 font-semibold text-ink">{u.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{u.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <section className="section-shell pb-12">
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
                Case Updates from the Blog
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="section-shell pb-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <ButtonLink href="/cases" variant="secondary">
              View All Cases
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
