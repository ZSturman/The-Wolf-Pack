import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { assetIndex } from "@/data/assets";
import {
  campaignStatus,
  merchProduct,
  monthlySupportNote,
  supportOptions,
} from "@/data/site-content";

export const metadata: Metadata = {
  title: "Join The Pack",
  description:
    "Back the Pack, be part of the promise, and help create access to care when it's needed most.",
};

export default function JoinThePackPage() {
  const monthlySupport = supportOptions[1];

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
              Join The Pack
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              Be Part of the Promise
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              When emergency veterinary costs stand between a dog and the
              treatment that could save them, families are often forced into
              devastating decisions.
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              Your support helps create access to care when it&apos;s needed
              most. Together, we can give more dogs the chance to go home.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={supportOptions[0].href} external>
                {supportOptions[0].label}
              </ButtonLink>
              <ButtonLink href={monthlySupport.href} external variant="secondary">
                {monthlySupport.label}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <StatusCard status={campaignStatus} />
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="panel p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
            Back The Pack
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="text-5xl font-bold uppercase leading-tight tracking-wide text-ink sm:text-6xl">
                Because every family deserves the chance to hear: your dog can
                stay.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-ink-soft">
                This only works if people choose to stand in that space -
                because every family deserves the chance to say yes.
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-ink/12 bg-ink/4 p-5 text-sm leading-7 text-ink">
              The Wolf Project stands with families in the moments that decide
              everything, so they can hear the words: your dog can stay.
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Ways to Help"
            title="Choose the path that feels right for you."
            intro="Give now, support monthly, learn about access to care, or wear the mission."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {supportOptions.map((option, index) => (
            <Reveal key={option.label} delay={index * 60}>
              <article className="panel flex h-full flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                  {option.amount ?? "Support path"}
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">
                  {option.label}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">
                  {option.description}
                </p>
                <ButtonLink
                  href={option.href}
                  external={option.external}
                  className="mt-6 self-start"
                >
                  Open Path
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="panel p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
              Monthly support
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
              Help keep the lifeline growing month after month.
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              {monthlySupportNote}
            </p>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              Some supporters step in once. Others help make sure the work
              keeps moving with steady support.
            </p>
            <ButtonLink href={monthlySupport.href} external className="mt-8">
              {monthlySupport.label}
            </ButtonLink>
          </Reveal>

          <Reveal delay={120} className="panel overflow-hidden">
            <div className="relative aspect-[4/5] bg-white">
              <Image
                src={assetIndex["wolf-hero-1"].localSrc}
                alt={assetIndex["wolf-hero-1"].alt}
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 38vw, 100vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
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
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink-soft">
                Wear the Mission
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                {merchProduct.name}
              </h2>
              <p className="mt-3 text-sm leading-7 text-ink-soft">
                Every purchase supports access to emergency veterinary care and
                helps build the lifeline.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SectionHeading
              eyebrow="Wear the Mission"
              title="This is more than a shirt. It&apos;s a statement."
              intro="Wolf&apos;s story changed everything. But access to care gave him a second chance."
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              <p>
                This piece represents something bigger - a movement to ensure
                families don&apos;t have to choose between their dog&apos;s life
                and the cost of care.
              </p>
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
    </div>
  );
}
