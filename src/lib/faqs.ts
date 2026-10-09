import type { Location } from "./locations";

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
      "Our core area is Brisbane, Ipswich, Caboolture, the Gold Coast, Logan, Moreton Bay, Redlands, the Sunshine Coast and Toowoomba, plus the suburbs around them. We also collect by arrangement from 30 larger regions, including the Scenic Rim, Noosa, Gympie, Fraser Coast, Bundaberg, Gladstone, Rockhampton, the Tweed, Byron, Lismore, the Clarence Valley and Armidale. Each has its own page on our locations page. If you are unsure whether we cover your suburb, call 0422 360 534.",
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
    question: "Do you buy vehicles in northern New South Wales, and what paperwork applies?",
    answer:
      "Yes. We collect by arrangement from the Tweed, Byron, Ballina, Lismore, Richmond Valley, Kyogle, Clarence Valley, Tenterfield, Glen Innes Severn, Inverell, Coffs Harbour and Armidale areas. In New South Wales you typically need a valid photo ID and proof of ownership, and afterwards you should tell Service NSW that you have sold or disposed of the vehicle. We will explain what you need once we have the vehicle details.",
  },
  {
    question: "What are your opening hours?",
    answer:
      "We are open Monday to Friday 6:30 AM to 5:00 PM and Saturday 7:00 AM to 2:00 PM. We are closed on Sundays. You can send a quote request at any time and we will reply in business hours.",
  },
];

/**
 * Questions shown on an area page. A few shared answers (price, documents, payment) plus questions
 * answered from that area's own data, so each page carries distinct, citable facts.
 */
export function cityFaqs(
  loc: Pick<
    Location,
    "name" | "council" | "suburbs" | "access" | "vehicles" | "pickup" | "distanceKm" | "faqs" | "tier" | "state"
  >
): Faq[] {
  const city = loc.name;
  return [
    {
      question: `How much cash can I get for my car in ${city}?`,
      answer: `It depends on the make, model, age, condition and current scrap metal value. We pay up to $9,999 for the best vehicles. Send your car's details or call 0422 360 534 and we will quote you a price for ${city} before we send a truck. The quoted price is the amount you receive.`,
    },
    ...loc.faqs,
    {
      question: `Which suburbs and towns do you collect from around ${city}?`,
      answer: `In the ${loc.council} area we collect from ${loc.suburbs.slice(0, -1).join(", ")} and ${loc.suburbs[loc.suburbs.length - 1]}. If your address is nearby but not listed, call 0422 360 534 and we will confirm.`,
    },
    {
      question: `How do you get to ${city} and how long does pickup take?`,
      answer: `${loc.access} It is about ${loc.distanceKm} km from our Sherwood depot. ${loc.pickup}`,
    },
    {
      question: `What kinds of vehicles do you usually collect in ${city}?`,
      answer: `${loc.vehicles} We buy cars, SUVs, 4WDs, utes, vans, light trucks and motorbikes in any condition, and towing is free when we buy.`,
    },
  ];
}
