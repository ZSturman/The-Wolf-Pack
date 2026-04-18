import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { assetIndex } from "@/data/assets";
import { storyChapters, storyStats } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Wolf's story changed everything, revealing how often access to care disappears between diagnosis and a bill.",
};

export default function OurStoryPage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="hero-grid">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember/80">
              Our Story
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-none text-ink text-balance sm:text-6xl lg:text-7xl">
              Why We Exist
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              There were moments where, without CareCredit approval, Wolf&apos;s
              treatment would have stopped. Moments where his life depended not
              on medicine, but on whether a deposit went through.
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              After days of diagnostics, imaging, and bloodwork, Wolf required
              emergency exploratory surgery. The estimate came in at $13,000
              due upfront. Wolf wasn&apos;t a dying dog - he was a dog with a
              severe condition. The only thing standing between him and
              survival was the cost of trying.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/join-the-pack">Back The Pack</ButtonLink>
              <ButtonLink href="/how-it-works" variant="secondary">
                Access to Care
              </ButtonLink>
            </div>
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
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {storyStats.map((stat) => (
              <article key={stat.label} className="panel p-5">
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
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Wolf's Story"
            title="From one emergency to a bigger mission."
            intro="If funding hadn&apos;t come through in time, Wolf would not be here. Not because he couldn&apos;t be saved - but because he couldn&apos;t be afforded."
          />
        </Reveal>
        <div className="mt-10 space-y-12">
          {storyChapters.map((chapter, index) => {
            const image = assetIndex[chapter.assetId];

            return (
              <Reveal
                key={chapter.title}
                delay={index * 80}
                className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
              >
                <div
                  className={`relative aspect-[4/5] overflow-hidden rounded-[2.2rem] border border-ink/8 bg-white shadow-[0_24px_54px_rgba(17,22,20,0.08)] ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={image.localSrc}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </div>
                <article className="panel p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember/80">
                    Chapter {index + 1}
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-tight text-ink">
                    {chapter.title}
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-forest">
                    {chapter.lead}
                  </p>
                  <div className="prose-tight mt-6 text-base leading-8 text-ink-soft">
                    {chapter.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="panel p-7 sm:p-9">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember/80">
            What it led to
          </p>
          <blockquote className="mt-4 max-w-4xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            If a life can be saved, access should exist.
          </blockquote>
          <p className="mt-6 max-w-3xl text-base leading-8 text-ink-soft">
            Wolf should have been one of the dogs who disappear quietly between
            diagnosis and a bill. He wasn&apos;t. And once you see that, you
            can&apos;t ignore it. Because this isn&apos;t about one dog. It&apos;s
            about a system where money is deciding who gets to live.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/how-it-works" variant="secondary">
              Access to Care
            </ButtonLink>
            <ButtonLink href="/join-the-pack">Back The Pack</ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
