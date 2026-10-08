export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "How much will I get for my scrap car in Brisbane?",
    answer:
      "The price depends on your car's make, model, age, condition and current scrap metal value. We pay up to $9,999 for the best vehicles. Heavier cars with more recoverable metal and parts, and newer cars in good condition, are worth more. We give you a price before we send a truck, and the quoted price is the amount you receive: there are no hidden fees.",
  },
  {
    question: "Do you buy cars that are not running or are damaged?",
    answer:
      "Yes. We buy old, damaged, scrap, unwanted, accident-damaged and non-running cars, as well as vans, utes, SUVs and 4WDs. We use professional towing equipment, so the car does not need to start or drive. Condition affects the offer, but we will still make one.",
  },
  {
    question: "Is towing and car removal really free?",
    answer:
      "Yes. Towing is free when we buy your vehicle, anywhere in our service area. There are no callout fees or hidden charges: the quoted price is the amount you receive.",
  },
  {
    question: "Do you offer same-day car removal?",
    answer:
      "In most cases yes. Once you accept the quote, we book the earliest pickup time that suits you. Areas close to our Sherwood depot, such as Brisbane, Ipswich, Logan and Redlands, are often possible the same day; more distant areas such as the Gold Coast, Sunshine Coast and Toowoomba are booked into a scheduled run, and we confirm the time with you.",
  },
  {
    question: "What documents do I need to sell my car?",
    answer:
      "You typically need a valid photo ID and proof of ownership. Our team will guide you through the simple paperwork needed to complete the sale legally. After the sale you should also notify Queensland's Department of Transport and Main Roads that you have disposed of the vehicle.",
  },
  {
    question: "How quickly will I get paid?",
    answer:
      "You are paid when we collect the vehicle, once you have accepted the offer and the paperwork is confirmed. You can choose cash or bank transfer.",
  },
  {
    question: "Which areas do you service?",
    answer:
      "We cover Brisbane, Ipswich, Caboolture, the Gold Coast, Logan, Moreton Bay, Redlands, the Sunshine Coast and Toowoomba, plus the suburbs around them. If you are unsure whether we cover your suburb, call 0422 360 534.",
  },
  {
    question: "What happens to my car after it is collected?",
    answer:
      "After pickup, the vehicle is taken to a licensed dismantling and recycling facility, where usable parts are recovered and the remaining materials are recycled responsibly.",
  },
  {
    question: "How does selling my car to V Car Removal Brisbane work?",
    answer:
      "Call 0422 360 534 or send the quote form with your car's make, model, year and suburb. We reply with a cash offer. If you accept, we book a pickup time, tow the car for free and pay you when we collect it.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Friday 6:30 AM to 5:00 PM and Saturday 7:00 AM to 2:00 PM. We are closed on Sundays. You can send a quote request at any time and we will reply in business hours.",
  },
];

/** Questions shown on a city page: the standard answers, localised, plus the area-specific ones. */
export function cityFaqs(
  city: string,
  extra: Faq[]
): Faq[] {
  return [
    {
      question: `How much cash can I get for my car in ${city}?`,
      answer: `The amount depends on your car's make, model, age, condition and current scrap metal value. We pay up to $9,999 for the best vehicles. Send us your car's details or call 0422 360 534 and we will quote you a price for ${city} before we send a truck. The quoted price is the amount you receive.`,
    },
    ...extra,
    {
      question: `Do you offer same-day car removal in ${city}?`,
      answer: `In most cases we can arrange pickup quickly: once you accept the quote, we book the earliest time that suits you. Exact timing depends on tow truck availability and how far ${city} is from our Sherwood depot, and we confirm it when we quote.`,
    },
    {
      question: `What types of vehicles do you buy in ${city}?`,
      answer: `Cars, SUVs, 4WDs, utes, vans, light trucks and motorbikes, running or not. That includes old, damaged, scrap, unwanted and accident-damaged vehicles.`,
    },
    {
      question: `Is towing free in ${city}?`,
      answer: `Yes. Towing and removal in ${city} is free when we buy your vehicle. There are no hidden fees: the quoted price is the cash you receive.`,
    },
    {
      question: `What documents do I need to sell my car in ${city}?`,
      answer: `Typically a valid photo ID and proof of ownership. We will guide you through the simple paperwork. After the sale, notify Queensland's Department of Transport and Main Roads that you have disposed of the vehicle.`,
    },
    {
      question: `How quickly will I get paid in ${city}?`,
      answer: `You are paid when we collect the vehicle, once you have accepted the offer and the paperwork is confirmed. You can choose cash or bank transfer.`,
    },
    {
      question: `What happens to my car after you collect it in ${city}?`,
      answer: `It is taken to a licensed dismantling and recycling facility, where usable parts are recovered and the remaining materials are recycled responsibly.`,
    },
  ];
}
