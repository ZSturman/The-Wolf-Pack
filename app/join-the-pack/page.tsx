import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { assetIndex } from "@/data/assets";
import {
  merchProduct,
  supportOptions,
} from "@/data/site-content";
import { getCampaignStatus, getDonationContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Join The Pack",
  description:
    "Back the Pack, be part of the promise, and help create access to care when it's needed most.",
};

export default async function JoinThePackPage() {
  const [campaignStatus, donationContent] = await Promise.all([
    getCampaignStatus(),
    getDonationContent(),
  ]);
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
              {donationContent.joinHeroTitle}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {donationContent.joinHeroIntro}
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              {donationContent.joinHeroBody}
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
                {donationContent.joinBannerTitle}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-ink-soft">
                {donationContent.joinBannerDescription}
              </p>
            </div>
            <div className="rounded-[1.8rem] border border-ink/12 bg-ink/4 p-5 text-sm leading-7 text-ink">
              {donationContent.joinBannerNote}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Ways to Help"
            title={donationContent.joinWaysTitle}
            intro={donationContent.joinWaysIntro}
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
              {donationContent.monthlySupportTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-ink-soft">
              {donationContent.monthlySupportIntro}
            </p>
            <p className="mt-4 text-sm leading-7 text-ink-soft">
              {donationContent.monthlySupportNote}
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
              title={donationContent.merchTitle}
              intro={donationContent.merchIntro}
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              <p>{donationContent.merchBody}</p>
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
