import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ProductGallery } from "@/components/product-gallery";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { merchProduct } from "@/data/site-content";

export const metadata: Metadata = {
  title: "Access Long Sleeve",
  description:
    "The Wolf Project long sleeve tee inspired by Wolf's story and created to support access to emergency veterinary care.",
};

const purchaseReasons = [
  "This is more than a shirt. It's a statement.",
  "Every purchase supports our mission to expand access to emergency veterinary care and prevent financial euthanasia.",
  "Wear the mission. Be part of the movement. Back the pack.",
];

export default function AccessLongSleevePage() {
  return (
    <div className="pb-20 sm:pb-24">
      <section className="section-shell py-10 sm:py-14 lg:py-18">
        <Reveal className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ember/80">
            Drop 001 - Access
          </p>
          <h1 className="max-w-4xl font-display text-5xl leading-none text-ink text-balance sm:text-6xl">
            {merchProduct.name}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-ink-soft">
            This is more than a shirt. It&apos;s a statement.
          </p>
          <p className="max-w-2xl text-base leading-8 text-ink-soft">
            Wolf&apos;s story changed everything. But access to care gave him a
            second chance. And not every dog gets that.
          </p>
        </Reveal>
      </section>

      <section className="section-shell py-2 sm:py-4">
        <Reveal delay={100}>
          <ProductGallery product={merchProduct} />
        </Reveal>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Product story"
              title="This piece represents something bigger."
              intro="A movement to ensure families don&apos;t have to choose between their dog&apos;s life and the cost of care."
            />
            <div className="prose-tight mt-6 max-w-2xl text-base leading-8 text-ink-soft">
              {merchProduct.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="panel p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember/80">
              Care + fit notes
            </p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-ink-soft">
              {merchProduct.care.map((detail) => (
                <li
                  key={detail}
                  className="rounded-[1.4rem] border border-ink/8 bg-white/78 px-4 py-3"
                >
                  {detail}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-ink-soft">
              Live availability and checkout stay on the current storefront.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        <Reveal className="panel p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ember/80">
            Every purchase has a purpose
          </p>
          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {purchaseReasons.map((reason) => (
              <article
                key={reason}
                className="rounded-[1.75rem] border border-ink/8 bg-white/78 p-5"
              >
                <p className="text-sm leading-7 text-ink-soft">{reason}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={merchProduct.liveHref} external>
              View Live Availability
            </ButtonLink>
            <ButtonLink href="/shop" variant="secondary">
              Return to Shop
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
