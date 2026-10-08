import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Container } from "@/components/Container";
import { PrimaryButton, CallButton } from "@/components/Buttons";
import { NapBlock } from "@/components/NapBlock";
import { ConversionEvent } from "@/components/ConversionEvent";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thanks, your quote request was received",
  description: `Thanks for contacting ${site.name}. We will reply with your cash offer shortly.`,
  alternates: { canonical: `${site.url}/thanks` },
  robots: { index: false, follow: true },
};

export default function ThanksPage() {
  return (
    <>
      <ConversionEvent />
      <PageHero
        eyebrow="Request received"
        title="Thank you, we have your request"
        description={`Our team at ${site.name} will contact you shortly with your cash offer. If you do not hear from us within business hours, please call us.`}
      >
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <CallButton variant="onLight" />
          <PrimaryButton href="/">Back to home</PrimaryButton>
        </div>
      </PageHero>
      <section className="pb-20">
        <Container className="max-w-xl">
          <div className="rounded-3xl border border-ink/8 bg-zinc-50 p-7">
            <NapBlock />
          </div>
        </Container>
      </section>
    </>
  );
}
