import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { TrustStrip } from "@/components/trust-strip";
import { assetIndex } from "@/data/assets";
import {
  campaignStatus,
  conditionCards,
  homePathways,
  howItWorksSteps,
  merchProduct,
  storyStats,
  supportOptions,
  trustFacts,
  videoEmbedUrl,
} from "@/data/site-content";

export default function Home() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="hero-grid">
          <Reveal className="space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember/80">
                Access to Care Lifeline Initiative under SGT Canines
              </p>
              <h1 className="max-w-4xl font-display text-5xl leading-none text-ink text-balance sm:text-6xl lg:text-7xl">
                When Treatment Exists But Access To Care Doesn&apos;t
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
                The Wolf Project helps families access emergency veterinary care
                so dogs can stay in the homes where they belong.
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
                  Not yet open
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
              {campaignStatus.summary}
            </p>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem] border border-ink/8 bg-white shadow-[0_28px_60px_rgba(17,22,20,0.08)]">
              <Image
                src={assetIndex["wolf-hero-1"].localSrc}
                alt={assetIndex["wolf-hero-1"].alt}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
            </div>
            <div className="panel -mt-20 ml-auto max-w-md p-5 sm:-mt-24 sm:mr-6 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember/80">
                This work exists because of one dog: Wolf.
              </p>
              <h2 className="mt-3 font-display text-3xl text-ink">
                The Problem No One Talks About
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                As we fought for Wolf, we realized this wasn&apos;t just our
                story. His fight for survival revealed a painful reality - too
                many dogs are lost not because treatment doesn&apos;t exist, but
                because access to care doesn&apos;t.
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
          {homePathways.map((pathway, index) => (
            <Reveal key={pathway.title} delay={index * 80}>
              <article className="panel flex h-full flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ember/80">
                  {pathway.eyebrow}
                </p>
                <h3 className="mt-4 font-display text-3xl text-ink">
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
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white shadow-[0_24px_54px_rgba(17,22,20,0.08)]">
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
              title="When treatment exists, families deserve the chance to say yes."
              intro="Our mission centers on one powerful idea: your dog can stay."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {storyStats.map((stat) => (
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
              <p>
                The Wolf Project, an access to care lifeline, is an initiative
                under the non profit organization, SGT Canines, to provide
                financial assistance when families can not afford the upfront
                required deposits to move forward with lifesaving treatment at
                an emergency vet.
              </p>
              <p>
                By helping families access emergency veterinary care when
                financial barriers appear, we work to keep dogs where they
                belong - at home with the people who love them.
              </p>
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
            title="A lifeline when treatment exists - but access to care does not."
            intro="Financial support for dogs requiring urgent veterinary treatment, help for families facing crisis situations, and partnerships that expand access to lifesaving care."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4">
            {howItWorksSteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 70}>
                <article className="panel p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember/80">
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
            {conditionCards.map((condition, index) => (
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

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Promise We Keep"
            title="Trust is not assumed. It is built."
            intro="This is the promise we make - to every dog, every family, and every moment where time is running out."
          />
        </Reveal>
        <Reveal delay={80}>
          <TrustStrip items={trustFacts} className="mt-8" />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="panel overflow-hidden">
            <div className="relative aspect-[4/5] border-b border-ink/8 bg-white">
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
              title="DROP 001 - ACCESS"
              intro="A statement inspired by Wolf&apos;s survival story. Every purchase supports access to emergency veterinary care and helps build the lifeline."
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
              title="How one dog inspired this entire mission."
              intro="Meet Wolf. Given 0-10% chance of survival."
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              <p>
                Want to read more on Wolf&apos;s story? Read Wolf&apos;s Story
                and see how one emergency revealed the need for something
                bigger.
              </p>
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
                src={videoEmbedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="rounded-[2.6rem] bg-forest px-6 py-8 text-white shadow-[0_30px_70px_rgba(17,22,20,0.18)] sm:px-8 sm:py-10">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
            <div className="space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand/76">
                Back The Pack
              </p>
              <h2 className="max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl">
                Because every family deserves the chance to hear: your dog can
                stay.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/78">
                When emergency veterinary costs stand between a dog and the
                treatment that could save them, families are often forced into
                devastating decisions.
              </p>
              <p className="max-w-2xl text-base leading-8 text-white/78">
                Your support helps create access to care when it&apos;s needed
                most. Together, we can give more dogs the chance to go home.
              </p>
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
            </div>

            <StatusCard status={campaignStatus} className="bg-white text-ink" />
          </div>
        </Reveal>
      </section>
    </div>
  );
}
