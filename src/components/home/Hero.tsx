import Image from "next/image";
import { Container } from "../Container";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[520px] flex-col overflow-hidden bg-white sm:min-h-[640px]">
      <Image
        src="/images/hero/hero.webp"
        alt="Aerial view of the V Car Removal wrecking yard"
        fill
        priority
        fetchPriority="high"
        quality={50}
        className="object-cover"
        sizes="100vw"
      />

      <Container className="relative flex flex-1 flex-col py-8 sm:py-10">
        <HeroContent />
      </Container>
    </section>
  );
}
