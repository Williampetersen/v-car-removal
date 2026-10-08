import { Container } from "../Container";
import { SectionHeading } from "../SectionHeading";

const steps = [
  {
    number: "01",
    title: "Tell us about your car",
    description:
      "Call or send the quote form with the make, model, year and your suburb.",
  },
  {
    number: "02",
    title: "Get your cash offer",
    description:
      "We reply with a price before we send a truck. The quoted price is what you receive.",
  },
  {
    number: "03",
    title: "We tow it for free",
    description:
      "Pick a time that suits you. Our tow truck comes to your home, work or roadside.",
  },
  {
    number: "04",
    title: "Get paid",
    description:
      "You are paid when we collect the vehicle, in cash or by bank transfer.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Cash in hand in four steps"
          align="center"
        />
        <ol className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white p-7"
            >
              <span className="heading-xl relative text-5xl text-link">
                {step.number}
              </span>
              <h3 className="heading-xl relative mt-3 text-3xl text-ink">
                {step.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-zinc-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
