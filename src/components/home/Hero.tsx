import Image from "next/image";
import { Container } from "../Container";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[460px] flex-col overflow-hidden bg-ink sm:min-h-[640px]">
      <Image
        src="/images/hero/hero.png"
        alt="Aerial view of the V Car Removal wrecking yard"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/80 to-ink/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

      <Container className="relative flex flex-1 flex-col py-8 sm:py-10">
        <HeroContent />
      </Container>
    </section>
  );
}
