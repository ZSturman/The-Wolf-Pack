import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { CaseCard } from "@/components/case-card";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { EmailSignup } from "@/components/email-signup";
import { BlogCard } from "@/components/blog-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { TrustStrip } from "@/components/trust-strip";
import { assetIndex } from "@/data/assets";
import {
  merchProduct,
  supportOptions,
} from "@/data/site-content";
import { getCases } from "@/lib/db/cases";
import { getRecentPosts } from "@/lib/get-blog-posts";
import {
  getCampaignStatus,
  getHomeContent,
  getProcessContent,
  getStoryContent,
  getTrustContent,
} from "@/lib/site-content";
import type { CaseStatus } from "@/types/site";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [allCases, recentPosts, campaignStatus, homeContent, storyContent, processContent, trustContent] = await Promise.all([
    getCases(),
    getRecentPosts(3),
    getCampaignStatus(),
    getHomeContent(),
    getStoryContent(),
    getProcessContent(),
    getTrustContent(),
  ]);
  const featuredCases = allCases.filter((c) => c.featured);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="hero-grid">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
                {homeContent.heroEyebrow}
              </p>
              <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
                {homeContent.heroTitle}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                {homeContent.heroIntro}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={supportOptions[0].href} external>
                {supportOptions[0].label}
              </ButtonLink>
              <ButtonLink href="/our-story" variant="secondary">
                Our Story
              </ButtonLink>
              <ButtonLink href="/shop" variant="ghost">
                Wear the Mission
              </ButtonLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                  Current status
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {campaignStatus.phaseLabel}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                  Applications
                </p>
                <p className="mt-2 text-lg font-semibold text-ink">
                  {campaignStatus.acceptingApplications ? "Open" : "Not yet open"}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                  Structure
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                  Initiative under SGT Canines
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-7 text-ink-soft">
              {homeContent.heroSummary}
            </p>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-[2.4rem] border border-ink/8 bg-white shadow-[0_28px_60px_rgba(17,22,20,0.08)]">
              <Image
                src={assetIndex["wolf-hero-1"].localSrc}
                alt={assetIndex["wolf-hero-1"].alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-transparent" />
            </div>
            <div className="panel -mt-20 ml-auto max-w-md p-5 sm:-mt-24 sm:mr-6 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                This work exists because of one dog: Wolf.
              </p>
              <h2 className="mt-3 text-3xl font-bold text-ink">
                {homeContent.storyPanelTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                {homeContent.storyPanelBody}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="How You Can Help"
            title="Back the pack, learn about access to care, or wear the mission."
            intro="Your support helps create access to care when it&apos;s needed most."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {homeContent.pathways.map((pathway, index) => (
            <Reveal key={pathway.title} delay={index * 80}>
              <article className="panel flex h-full flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink-soft">
                  {pathway.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl font-bold text-ink">
                  {pathway.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">
                  {pathway.description}
                </p>
                <ButtonLink
                  href={pathway.href}
                  variant="secondary"
                  className="mt-6 self-start"
                >
                  Explore
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal className="relative aspect-4/5 overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white shadow-[0_24px_54px_rgba(17,22,20,0.08)]">
            <Image
              src={assetIndex["wolf-hero-2"].localSrc}
              alt={assetIndex["wolf-hero-2"].alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 38vw, 100vw"
            />
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="The Wolf Project"
              title={homeContent.missionTitle}
              intro={homeContent.missionIntro}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {storyContent.stats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {stat.note}
                  </p>
                </article>
              ))}
            </div>
            <div className="prose-tight mt-8 max-w-3xl text-base leading-8 text-ink-soft">
              {homeContent.missionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/our-story" variant="secondary">
                Read Wolf&apos;s Story
              </ButtonLink>
              <ButtonLink href="/our-promise">Our Promise</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="How The Wolf Project Helps"
            title={homeContent.helpTitle}
            intro={homeContent.helpIntro}
          />
        </Reveal>
        <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {processContent.steps.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <article className="panel p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                    Focus {index + 1}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processContent.conditions.map((condition, index) => (
              <Reveal key={condition.title} delay={index * 80}>
                <article className="panel p-5">
                  <h3 className="text-xl font-semibold text-ink">
                    {condition.title}
                  </h3>
                  <p className="mt-3 text-3xl font-semibold text-forest">
                    {condition.description}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ink-soft">
                    {condition.outcome}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured cases */}
      {featuredCases.length > 0 && (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Dogs We&apos;re Helping"
              title="Featured Cases"
              intro="These are the dogs counting on us right now. Every case represents a family fighting for their dog's life."
            />
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCases.map((c, i) => (
              <Reveal key={c!.slug} delay={i * 60}>
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

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Promise We Keep"
            title={homeContent.promiseTitle}
            intro={homeContent.promiseIntro}
          />
        </Reveal>
        <Reveal delay={80}>
          <TrustStrip items={trustContent.trustFacts} className="mt-8" />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="panel overflow-hidden">
            <div className="relative aspect-4/5 border-b border-ink/8 bg-white">
              <Image
                src={assetIndex["merch-black-front"].localSrc}
                alt={assetIndex["merch-black-front"].alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 36vw, 100vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 p-4">
              {[
                assetIndex["merch-black-detail-1"],
                assetIndex["merch-white-front"],
                assetIndex["merch-white-detail-2"],
              ].map((asset) => (
                <div
                  key={asset.id}
                  className="relative aspect-square overflow-hidden rounded-[1.4rem] border border-ink/8 bg-white"
                >
                  <Image
                    src={asset.localSrc}
                    alt={asset.alt}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Wear the Mission"
              title={homeContent.shopTitle}
              intro={homeContent.shopIntro}
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              {merchProduct.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/shop" variant="secondary">
                Visit the Shop
              </ButtonLink>
              <ButtonLink href="/shop/access-long-sleeve">
                View Full Details
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Wolf on the Dodo"
              title={homeContent.videoTitle}
              intro={homeContent.videoIntro}
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              <p>{homeContent.videoBody}</p>
            </div>
            <div className="mt-8">
              <ButtonLink href="/our-story" variant="secondary">
                Read Wolf&apos;s Story
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="panel overflow-hidden p-3">
            <div className="relative aspect-video overflow-hidden rounded-[1.8rem] bg-ink">
              <iframe
                title="Wolf on YouTube"
                src={homeContent.videoEmbedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Email signup */}
      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            <EmailSignup
              heading={homeContent.emailHeading}
              description={homeContent.emailDescription}
            />
          </div>
        </Reveal>
      </section>

      {/* Latest from the Pack */}
      {recentPosts.length > 0 && (
        <section className="section-shell py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="From the Pack"
              title={homeContent.blogTitle}
              align="center"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <ButtonLink href="/blog" variant="ghost">
                View All Posts →
              </ButtonLink>
            </div>
          </Reveal>
        </section>
      )}

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="rounded-[2.6rem] bg-forest px-6 py-8 text-white shadow-[0_30px_70px_rgba(17,22,20,0.18)] sm:px-8 sm:py-10">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand/76">
                Back The Pack
              </p>
              <h2 className="max-w-3xl text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
                {homeContent.ctaTitle}
              </h2>
              {homeContent.ctaParagraphs.map((paragraph) => (
                <p key={paragraph} className="max-w-2xl text-base leading-8 text-white/78">
                  {paragraph}
                </p>
              ))}
              <div className="grid gap-4 sm:grid-cols-2">
                {supportOptions
                  .filter((option) => option.kind !== "learn")
                  .map((option) => (
                    <article
                      key={option.label}
                      className="rounded-[1.75rem] border border-white/12 bg-white/8 p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sand/76">
                        {option.amount ?? "Support path"}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold text-white">
                        {option.label}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/72">
                        {option.description}
                      </p>
                      <ButtonLink
                        href={option.href}
                        external={option.external}
                        variant="inverse"
                        className="mt-5"
                      >
                        Open Path
                      </ButtonLink>
                    </article>
                  ))}
              </div>

              {/* Lifeline progress */}
              <div className="rounded-[1.75rem] border border-white/12 bg-white/8 p-5">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-sand/76">
                  Lifeline Progress
                </p>
                <DonationProgressBar dark />
              </div>
            </div>

            <StatusCard status={campaignStatus} className="bg-white text-ink" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
