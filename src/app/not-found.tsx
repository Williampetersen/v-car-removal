import { Container } from "@/components/Container";
import { PrimaryButton, CallButton } from "@/components/Buttons";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink">
      <Container className="flex flex-col items-center py-24 text-center">
        <p className="heading-xl text-8xl leading-none text-brand">404</p>
        <h1 className="heading-xl mt-4 text-4xl text-white">
          This page has driven off
        </h1>
        <p className="mt-4 max-w-md text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get
          you back on the road.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <PrimaryButton href="/">Back To Home</PrimaryButton>
          <CallButton />
        </div>
      </Container>
    </section>
  );
}
