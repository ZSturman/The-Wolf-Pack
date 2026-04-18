import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ButtonLink } from "@/components/button-link";
import { EmailSignup } from "@/components/email-signup";
import { getSingleton } from "@/lib/db/singletons";
import type { ApplicationConfig } from "@/types/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Submit a case to The Wolf Project — help your dog access emergency veterinary care.",
};

export default async function ApplyPage() {
  const config = await getSingleton<ApplicationConfig>("applicationConfig");
  const accepting = config?.accepting ?? false;

  return (
    <>
      <section className="section-shell py-20 text-center lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Apply for Assistance"
            title={
              accepting
                ? (config?.openTitle ?? "Submit a Case")
                : (config?.closedTitle ?? "Applications Are Not Yet Open")
            }
            intro={
              accepting
                ? (config?.openIntro ?? undefined)
                : (config?.closedIntro ?? "We're building the lifeline responsibly. When we open applications, we want to ensure we can fully stand behind every case we accept.")
            }
            align="center"
          />
        </Reveal>
      </section>

      <section className="section-shell pb-20">
        <Reveal>
          <div className="panel mx-auto max-w-2xl p-8">
            {accepting && config?.formUrl ? (
              <div className="text-center">
                <p className="text-ink-soft">
                  {config?.openIntro ?? "If your dog is facing an emergency and you need help accessing veterinary care, you can submit a case for review."}
                </p>
                <ButtonLink
                  href={config.formUrl}
                  external
                  variant="primary"
                  className="mt-6"
                >
                  Start Application
                </ButtonLink>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="text-center">
                  <p className="text-sm leading-7 text-ink-soft">
                    {config?.message ??
                      "The Access to Care Lifeline is not yet accepting applications. We are building the funding, structure, and partnerships needed to support emergency cases responsibly and sustainably."}
                  </p>
                </div>

                <div className="border-t border-ink/8 pt-8">
                  <EmailSignup
                    heading={config?.notifyHeading ?? "Be the First to Know"}
                    description={config?.notifyDescription ?? "Sign up to be notified when applications open."}
                  />
                </div>

                <div className="border-t border-ink/8 pt-8 text-center">
                  <p className="text-sm text-ink-soft">
                    {config?.supportPrompt ?? "In the meantime, you can help us reach our goal:"}
                  </p>
                  <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <ButtonLink href="/donate" variant="primary">
                      Support the Lifeline
                    </ButtonLink>
                    <ButtonLink href="/cases" variant="secondary">
                      View Cases
                    </ButtonLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}
