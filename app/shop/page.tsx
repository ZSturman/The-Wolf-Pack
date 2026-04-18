import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { assetIndex } from "@/data/assets";
import { conditionCards, merchProduct } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Wear the mission with Drop 001 - ACCESS, inspired by Wolf's story and built to support emergency veterinary care.",
};

export default function ShopPage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="hero-grid">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember/80">
              Wear the Mission
            </p>
            <h1 className="max-w-4xl font-display text-5xl leading-none text-ink text-balance sm:text-6xl lg:text-7xl">
              DROP 001 - ACCESS
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              This is more than a shirt. It&apos;s a statement.
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              A statement inspired by Wolf&apos;s survival story. Every purchase
              supports access to emergency veterinary care and helps build the
              lifeline.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/shop/access-long-sleeve">
                View Full Details
              </ButtonLink>
              <ButtonLink href={merchProduct.collectionHref} external variant="secondary">
                Shop Drop 001
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="panel overflow-hidden">
            <div className="grid gap-3 p-3 sm:grid-cols-2">
              {[
                assetIndex["merch-black-front"],
                assetIndex["merch-white-front"],
                assetIndex["merch-black-detail-2"],
                assetIndex["merch-white-detail-3"],
              ].map((asset, index) => (
                <div
                  key={asset.id}
                  className={`relative overflow-hidden rounded-[1.7rem] bg-white ${
                    index === 0 || index === 3 ? "aspect-[4/5]" : "aspect-square"
                  }`}
                >
                  <Image
                    src={asset.localSrc}
                    alt={asset.alt}
                    fill
                    priority={index === 0}
                    className="object-cover"
                    sizes="(min-width: 1024px) 20vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Why This Matters"
              title="Wolf&apos;s story changed everything."
              intro="Not every family gets that opportunity for their dog."
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              {merchProduct.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/shop/access-long-sleeve">
                View Full Details
              </ButtonLink>
              <ButtonLink href={merchProduct.liveHref} external variant="secondary">
                View Live Product
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={120} className="panel p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white">
              <Image
                src={assetIndex["merch-black-front"].localSrc}
                alt={assetIndex["merch-black-front"].alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 38vw, 100vw"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                assetIndex["merch-black-detail-1"],
                assetIndex["merch-white-front"],
                assetIndex["merch-white-detail-2"],
              ].map((asset) => (
                <div
                  key={asset.id}
                  className="relative aspect-square overflow-hidden rounded-[1.3rem] border border-ink/8 bg-white"
                >
                  <Image
                    src={asset.localSrc}
                    alt={asset.alt}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="panel p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember/80">
            Every Purchase Has A Purpose
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            <article className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5">
              <h2 className="text-xl font-semibold text-ink">
                Expand access to emergency veterinary care
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Every piece supports our mission to expand access to emergency
                veterinary care.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5">
              <h2 className="text-xl font-semibold text-ink">
                Prevent financial euthanasia or surrender
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                This work exists to help families keep their dogs at home when
                the cost of care creates crisis.
              </p>
            </article>
            <article className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5">
              <h2 className="text-xl font-semibold text-ink">
                Keep dogs where they belong - home
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                You&apos;re not just wearing something. You&apos;re backing
                something bigger.
              </p>
            </article>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="The Reality of Emergency Care"
            title="Emergency care isn&apos;t just urgent - it&apos;s expensive."
            intro="Treatment often requires at least 75% upfront payment before care can begin."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {conditionCards.map((condition, index) => (
            <Reveal key={condition.title} delay={index * 70}>
              <article className="panel p-6">
                <h3 className="text-2xl font-semibold text-ink">
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
      </section>
    </div>
  );
}
