import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { DonationProgressBar } from "@/components/donation-progress-bar";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatusCard } from "@/components/status-card";
import { supportOptions } from "@/data/site-content";
import { getCampaignStatus, getDonationContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Join The Wolf Pack",
  description:
    "Become a monthly donor and help The Wolf Project keep emergency animal rescue support ready before the next deposit is due.",
};

const generalDonateHref = supportOptions[0].href;
const monthlyHref = supportOptions[1].href;

export default async function JoinThePackPage() {
  const [campaignStatus, donationContent] = await Promise.all([
    getCampaignStatus(),
    getDonationContent(),
  ]);

  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
          <Reveal className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-garnet-deep">
              Join the Wolf Pack
            </p>
            <h1 className="max-w-4xl text-5xl font-bold uppercase leading-none tracking-wide text-ink text-balance sm:text-6xl lg:text-7xl">
              Monthly donors make emergency help possible before the emergency.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-ink-soft sm:text-xl">
              {donationContent.monthlySupportIntro}
            </p>
            <p className="max-w-2xl text-base leading-8 text-ink-soft">
              A steady donor base lets The Wolf Project plan treatment deposits,
              owner co-pay gaps, follow-up care, and transparent updates without
              rebuilding momentum from scratch each time a dog needs help.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={monthlyHref} external variant="donate">
                Become a monthly donor
              </ButtonLink>
              <ButtonLink href={generalDonateHref} external variant="secondary">
                Give once instead
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <StatusCard status={campaignStatus} />
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal className="rounded-[2rem] bg-forest p-7 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sand/80">
              Long-term focus
            </p>
            <h2 className="mt-3 text-4xl font-bold uppercase leading-tight tracking-wide text-white">
              The Wolf Pack is the base beneath every urgent case.
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/76">
              Emergency fundraising works best when the foundation is already
              there. Monthly giving helps cover the quiet work: readiness,
              relationship-building, case review, updates, and reserves.
            </p>
            <div className="mt-6">
              <DonationProgressBar dark />
            </div>
          </Reveal>

          <Reveal delay={100} className="rounded-[2rem] border border-garnet/15 bg-blush p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
              Why monthly giving matters
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Keeps deposit support from starting at zero",
                "Lets the team approve cases responsibly",
                "Funds updates, transparency, and follow-up",
                "Creates stability between Wednesday and Friday pushes",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-ink/8 bg-white/82 p-4 text-sm font-semibold leading-6 text-ink">
                  {item}
                </div>
              ))}
            </div>
            <ButtonLink href={monthlyHref} external variant="donate" className="mt-6">
              Join monthly
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Monthly impact"
            title="Small recurring gifts become emergency readiness."
            intro="Use these as review placeholders for Megan: the exact tiers can be adjusted, but the donor logic should stay simple."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              amount: "$10/mo",
              title: "Update Keeper",
              body: "Helps support donor communication, case updates, and transparency notes.",
            },
            {
              amount: "$25/mo",
              title: "Care Builder",
              body: "Helps cover medications, recheck support, and the smaller pieces that keep recovery on track.",
            },
            {
              amount: "$50/mo",
              title: "Deposit Builder",
              body: "Builds the reserve that makes urgent treatment deposits easier to meet.",
            },
          ].map((tier) => (
            <Reveal key={tier.amount}>
              <article className="panel flex h-full flex-col p-6">
                <p className="text-3xl font-bold text-garnet-deep">{tier.amount}</p>
                <h2 className="mt-3 text-2xl font-semibold text-ink">{tier.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">
                  {tier.body}
                </p>
                <ButtonLink href={monthlyHref} external variant="donate" className="mt-6">
                  Start monthly
                </ButtonLink>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Fundraising rhythm"
            title="Monthly donors make the weekly pushes stronger."
            intro="The public campaigns create momentum. The Wolf Pack creates the base that makes that momentum reliable."
          />
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Wednesday social push",
              body: "A focused case update, a clear funding gap, and a direct ask followers can share.",
            },
            {
              title: "Friday community email",
              body: "A steadier update with progress, medical context, donor impact, and the next step.",
            },
            {
              title: "Monthly Wolf Pack base",
              body: "Recurring support keeps the LIFELINE Fund growing between urgent campaigns.",
            },
          ].map((item) => (
            <Reveal key={item.title}>
              <article className="rounded-2xl border border-ink/8 bg-white/78 p-5">
                <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal>
          <div className="rounded-[2rem] border border-ink/8 bg-white/82 p-7 text-center sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-garnet-deep">
              Choose your role
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold uppercase leading-tight tracking-wide text-ink">
              Be the donor who keeps help ready.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ink-soft">
              Monthly donors do not replace emergency fundraising. They make it
              more trustworthy, more focused, and more sustainable.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href={monthlyHref} external variant="donate">
                Join the Wolf Pack
              </ButtonLink>
              <ButtonLink href="/donate" variant="secondary">
                Compare giving paths
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
