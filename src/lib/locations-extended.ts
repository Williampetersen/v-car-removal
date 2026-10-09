import type { Location } from "./locations";

/**
 * Extended regions: large areas further out from the Sherwood depot.
 * Pickups here are arranged in advance (no same-day promise), so the copy says so.
 */
export const extendedLocationData: Omit<Location, "heroImage">[] = [
  {
    slug: "scenic-rim",
    name: "Scenic Rim",
    region: "South East Queensland",
    tier: "extended",
    council: "Scenic Rim Regional Council",
    distanceKm: "60–100",
    geo: { latitude: -27.9886, longitude: 152.9985 },
    suburbs: [
      "Beaudesert",
      "Boonah",
      "Canungra",
      "Tamborine Mountain",
      "Kooralbyn",
      "Rathdowney",
      "Kalbar",
      "Aratula",
      "Harrisville",
      "Mount Alford",
      "Veresdale",
      "Josephville",
    ],
    access:
      "The Scenic Rim is reached from Sherwood via the Mount Lindesay Highway to Beaudesert, or through Ipswich and the Cunningham Highway to Aratula and Boonah.",
    vehicles:
      "Farm and work utes, 4WDs, older family cars and trucks that have been parked on acreage for years.",
    pickup:
      "Scenic Rim pickups are booked into a scheduled run once you accept the quote, and we confirm the day with you.",
    about: [
      "The Scenic Rim is a large rural council area on the southern edge of South East Queensland, running from the Tamborine Mountain plateau and the Beaudesert plains to the Boonah district and the border ranges. It is mostly acreage, farms and small towns rather than dense suburbs.",
      "That means a different kind of vehicle. We regularly hear about farm utes, 4WDs, old work trucks and cars that have sat on a block for years. We are used to properties with long gravel driveways, gates and paddocks, and we buy vehicles that are flat, bogged or not running.",
      "Because the Scenic Rim is spread out, we do not promise a time on the day. Tell us the town and the access when you ask for a quote and we will confirm a collection day.",
    ],
    faqs: [
      {
        question: "Do you collect from Tamborine Mountain, Canungra and Boonah?",
        answer:
          "Yes. Tamborine Mountain, Canungra, Boonah, Beaudesert, Kooralbyn, Rathdowney, Kalbar and the surrounding Scenic Rim towns are in our extended service area. Pickups are arranged in advance, so call 0422 360 534 or send the form and we will confirm a day.",
      },
      {
        question: "Can you remove a car from a paddock or a bush track in the Scenic Rim?",
        answer:
          "Often yes. Tell us how the car is parked and what the ground is like (gravel, soft ground, a gate or a creek crossing) when you request the quote. If it needs a different recovery setup we will say so before we book.",
      },
    ],
    nearby: ["logan", "ipswich", "gold-coast", "lockyer-valley"],
  },
  {
    slug: "lockyer-valley",
    name: "Lockyer Valley",
    region: "South East Queensland",
    tier: "extended",
    council: "Lockyer Valley Regional Council",
    distanceKm: "70–100",
    geo: { latitude: -27.554, longitude: 152.279 },
    suburbs: [
      "Gatton",
      "Laidley",
      "Forest Hill",
      "Plainland",
      "Withcott",
      "Helidon",
      "Grantham",
      "Murphys Creek",
      "Lockyer Waters",
      "Glenore Grove",
      "Ropeley",
      "Mulgowie",
    ],
    access:
      "The Lockyer Valley is on the Warrego Highway between Ipswich and Toowoomba, about an hour and a quarter from our Sherwood depot.",
    vehicles:
      "Farm utes, light tip trucks, 4WDs, older work vehicles and flood-affected cars.",
    pickup:
      "Lockyer Valley pickups are booked in advance, often together with other collections along the Warrego Highway.",
    about: [
      "The Lockyer Valley, centred on Gatton and Laidley, is one of Queensland's major vegetable-growing districts. It sits on the Warrego Highway between Ipswich and Toowoomba, which is also the route our trucks take from Sherwood.",
      "Farms mean utes, light trucks and older working vehicles, and a lot of them end up parked behind a shed once they are no longer worth repairing. We buy them in any condition and tow them out, including from paddocks and farm tracks.",
      "The valley has seen flooding in past years, and flood-affected vehicles are among those we are asked about. We quote them like any other car: running or not, we make an offer before we send a truck.",
    ],
    faqs: [
      {
        question: "Do you collect from Gatton and Laidley?",
        answer:
          "Yes. Gatton, Laidley, Forest Hill, Plainland, Withcott, Helidon, Grantham and the rest of the Lockyer Valley are in our extended service area. Call 0422 360 534 and we will confirm a collection day.",
      },
      {
        question: "Do you buy flood-damaged vehicles in the Lockyer Valley?",
        answer:
          "Yes. We buy vehicles in any condition, including flood-affected cars, utes and trucks. Condition changes the offer, but you still get a price before we send a truck.",
      },
    ],
    nearby: ["ipswich", "toowoomba", "somerset", "scenic-rim"],
  },
  {
    slug: "somerset",
    name: "Somerset",
    region: "South East Queensland",
    tier: "extended",
    council: "Somerset Regional Council",
    distanceKm: "70–110",
    geo: { latitude: -27.2439, longitude: 152.4228 },
    suburbs: [
      "Esk",
      "Toogoolawah",
      "Kilcoy",
      "Lowood",
      "Fernvale",
      "Coominya",
      "Linville",
      "Harlin",
      "Moore",
      "Villeneuve",
      "Biarra",
      "Cressbrook",
    ],
    access:
      "The Somerset region is reached through Ipswich and the Brisbane Valley Highway to Lowood, Esk and Toogoolawah, or up the D'Aguilar Highway to Kilcoy.",
    vehicles:
      "Utes, 4WDs and older cars from rural properties, small acreage blocks and lakeside holiday homes.",
    pickup:
      "Somerset pickups are scheduled in advance and often grouped with Ipswich and Moreton Bay runs.",
    about: [
      "The Somerset region covers the Brisbane Valley from Fernvale and Lowood up to Esk, Toogoolawah and Kilcoy, around Lake Wivenhoe and Lake Somerset. It is a mix of small towns, farms and lifestyle acreage.",
      "Rural properties tend to collect vehicles: a ute that stopped working, a second car nobody drives, an old 4WD parked under a tree. We buy them in any condition and tow them out, and we are used to gates, dirt tracks and long driveways.",
      "Because Somerset is spread along a valley, we plan the route before we confirm a day. Give us the town, the address and what the access is like when you request your quote.",
    ],
    faqs: [
      {
        question: "Do you collect from Esk, Toogoolawah and Kilcoy?",
        answer:
          "Yes. Esk, Toogoolawah, Kilcoy, Lowood, Fernvale, Coominya, Linville and nearby Somerset towns are in our extended service area. Pickups are booked in advance, so call 0422 360 534 and we will confirm a day.",
      },
      {
        question: "Is towing free from the Somerset region?",
        answer:
          "Yes. Towing is free whenever we agree to buy the vehicle, including from the Somerset region. There is no callout or distance fee.",
      },
    ],
    nearby: ["lockyer-valley", "ipswich", "moreton-bay", "caboolture"],
  },
  {
    slug: "noosa",
    name: "Noosa",
    region: "Sunshine Coast",
    tier: "extended",
    council: "Noosa Shire Council",
    distanceKm: "140–165",
    geo: { latitude: -26.3917, longitude: 153.0377 },
    suburbs: [
      "Noosa Heads",
      "Noosaville",
      "Tewantin",
      "Noosa Junction",
      "Sunshine Beach",
      "Sunrise Beach",
      "Marcus Beach",
      "Castaways Beach",
      "Cooroy",
      "Pomona",
      "Cooran",
      "Kin Kin",
    ],
    access:
      "Noosa is reached from Sherwood by the Bruce Highway and Sunshine Motorway, or the Cooroy–Noosa Road, about two hours north.",
    vehicles:
      "Cars left at holiday homes and units, second cars, hinterland utes and 4WDs.",
    pickup:
      "Noosa pickups are booked into a scheduled Sunshine Coast run, and we confirm the day and a time window with you.",
    about: [
      "Noosa covers the beach towns of Noosa Heads, Noosaville, Tewantin and Sunshine Beach, and a quieter hinterland around Cooroy, Pomona and Kin Kin. It is a popular holiday and retirement area with a lot of units, holiday homes and shared car parks.",
      "That produces a particular kind of car: a vehicle left behind after a move, a second car that no longer gets used, or an older car at a holiday property. If it is in a unit car park or a narrow street, tell us when you ask for a quote so we can plan the access.",
      "We group Noosa pickups with other Sunshine Coast collections, so we book a day in advance and confirm it with you rather than promising same-day.",
    ],
    faqs: [
      {
        question: "Do you collect cars from Noosa Heads, Noosaville and Tewantin?",
        answer:
          "Yes. Noosa Heads, Noosaville, Tewantin, Sunshine Beach, Sunrise Beach, Cooroy, Pomona and the rest of the Noosa area are in our extended service area. Call 0422 360 534 and we will confirm a day.",
      },
      {
        question: "Can you collect a car from a unit or resort car park in Noosa?",
        answer:
          "Usually yes. Tell us the clearance height, how the entry works and whether we need building approval when you request the quote, and we will plan the right truck.",
      },
    ],
    nearby: ["sunshine-coast", "gympie"],
  },
  {
    slug: "gympie",
    name: "Gympie",
    region: "Wide Bay",
    tier: "extended",
    council: "Gympie Regional Council",
    distanceKm: "170–200",
    geo: { latitude: -26.19, longitude: 152.665 },
    suburbs: [
      "Gympie",
      "Southside",
      "Monkland",
      "Victory Heights",
      "Kandanga",
      "Imbil",
      "Tin Can Bay",
      "Rainbow Beach",
      "Cooloola Cove",
      "Kilkivan",
      "Goomeri",
      "Widgee",
    ],
    access:
      "Gympie is reached from Sherwood by the Bruce Highway, about two and a half hours north.",
    vehicles:
      "Utes, 4WDs and older cars from rural blocks, coastal towns and hinterland properties.",
    pickup:
      "Gympie pickups are arranged in advance and, where we can, combined with other collections on the Bruce Highway.",
    about: [
      "Gympie grew from an 1867 gold rush and is now the centre of a large regional council area that runs from the Mary Valley and Imbil to Tin Can Bay and Rainbow Beach on the coast, and out to Kilkivan and Goomeri.",
      "The area has farms, bush blocks and small coastal towns, and plenty of older utes and 4WDs that have outlived their usefulness. We buy them in any condition and tow them away free, including from properties with rough access.",
      "Gympie is a long way from our Sherwood depot, so collections are planned. We confirm a day and a window when we quote, and we may be able to collect more than one vehicle on the same trip.",
    ],
    faqs: [
      {
        question: "Do you collect from Gympie, Tin Can Bay and Rainbow Beach?",
        answer:
          "Yes. Gympie, Tin Can Bay, Rainbow Beach, Cooloola Cove, Imbil, Kandanga, Kilkivan and Goomeri are in our extended service area. Call 0422 360 534 and we will confirm a collection day.",
      },
      {
        question: "Is there a charge for towing from Gympie?",
        answer:
          "No. Towing is free whenever we agree to buy the vehicle, however far the trip. The quoted price is the amount you receive.",
      },
    ],
    nearby: ["noosa", "sunshine-coast", "fraser-coast"],
  },
  {
    slug: "southern-downs",
    name: "Southern Downs",
    region: "Darling Downs",
    tier: "extended",
    council: "Southern Downs Regional Council",
    distanceKm: "150–230",
    geo: { latitude: -28.215, longitude: 152.034 },
    suburbs: [
      "Warwick",
      "Stanthorpe",
      "Allora",
      "Killarney",
      "Yangan",
      "Wallangarra",
      "Maryvale",
      "Freestone",
      "Elbow Valley",
      "Dalveen",
      "Thulimbah",
      "Applethorpe",
    ],
    access:
      "Warwick is reached over Cunninghams Gap on the Cunningham Highway, or from Toowoomba on the New England Highway, which also leads on to Stanthorpe.",
    vehicles:
      "Utes, 4WDs, farm trucks and older cars from rural properties and orchards.",
    pickup:
      "Southern Downs pickups are scheduled in advance, often together with Toowoomba collections.",
    about: [
      "The Southern Downs covers Warwick and the Granite Belt around Stanthorpe, apple, stone-fruit and wine country on the New England Highway near the New South Wales border.",
      "Orchards, farms and rural blocks mean a steady supply of working utes, 4WDs and light trucks that are old, heavily used and often still worth something. We buy them in any condition, running or not.",
      "Warwick and Stanthorpe are a long way from Sherwood, so we book collections in advance and confirm a day with you. If you have more than one vehicle, tell us and we will quote them together.",
    ],
    faqs: [
      {
        question: "Do you collect from Warwick and Stanthorpe?",
        answer:
          "Yes. Warwick, Stanthorpe, Allora, Killarney, Yangan and the other Southern Downs towns are in our extended service area. Call 0422 360 534 and we will confirm a day.",
      },
      {
        question: "Do you buy farm utes and trucks in the Southern Downs?",
        answer:
          "Yes. We buy utes, 4WDs, vans and light trucks in any condition. Tell us about the vehicle and where it is parked when you request the quote.",
      },
    ],
    nearby: ["toowoomba", "lockyer-valley", "scenic-rim", "western-downs"],
  },
  {
    slug: "south-burnett",
    name: "South Burnett",
    region: "Burnett",
    tier: "extended",
    council: "South Burnett Regional Council",
    distanceKm: "190–240",
    geo: { latitude: -26.541, longitude: 151.839 },
    suburbs: [
      "Kingaroy",
      "Nanango",
      "Murgon",
      "Wondai",
      "Blackbutt",
      "Proston",
      "Kumbia",
      "Taabinga",
      "Memerambi",
      "Cherbourg",
      "Hivesville",
      "Tarong",
    ],
    access:
      "The South Burnett is reached from Sherwood via the D'Aguilar Highway through Kilcoy and Blackbutt to Nanango and Kingaroy, about three hours north-west.",
    vehicles:
      "Farm utes, trucks, 4WDs and older cars from grain, peanut and cattle properties.",
    pickup:
      "South Burnett pickups are booked in advance and confirmed with a day and window when we quote.",
    about: [
      "The South Burnett is centred on Kingaroy, known as Australia's peanut capital, with Nanango, Murgon and Wondai around it. It is farming country: grain, peanuts, beef and dairy.",
      "Farming means working vehicles: utes, small trucks and 4WDs that have done a lot of kilometres. When they stop being worth repairing they tend to sit at the back of a paddock. We buy them in any condition and tow them out.",
      "The South Burnett is about three hours from our depot, so collections are planned. Send us the vehicle details and the property address and we will confirm a day.",
    ],
    faqs: [
      {
        question: "Do you collect from Kingaroy, Nanango and Murgon?",
        answer:
          "Yes. Kingaroy, Nanango, Murgon, Wondai, Blackbutt and the surrounding South Burnett towns are in our extended service area. Call 0422 360 534 and we will confirm a day.",
      },
      {
        question: "How do I get a price for a vehicle on a farm in the South Burnett?",
        answer:
          "Send the make, model, year and a short description of the condition and where it is parked. We reply with a price before we send a truck, and the quoted price is what you receive.",
      },
    ],
    nearby: ["gympie", "somerset", "toowoomba", "western-downs"],
  },
  {
    slug: "western-downs",
    name: "Western Downs",
    region: "Darling Downs",
    tier: "extended",
    council: "Western Downs Regional Council",
    distanceKm: "190–260",
    geo: { latitude: -27.181, longitude: 151.265 },
    suburbs: [
      "Dalby",
      "Chinchilla",
      "Miles",
      "Tara",
      "Jandowae",
      "Bell",
      "Warra",
      "Wandoan",
      "Kaimkillenbun",
      "Brigalow",
      "Jimbour",
      "Meandarra",
    ],
    access:
      "The Western Downs is reached along the Warrego Highway through Toowoomba to Dalby, Chinchilla and Miles.",
    vehicles:
      "Utes, 4WDs, light trucks and work vehicles from farms and gas and mining work.",
    pickup:
      "Western Downs pickups are arranged well in advance, and we confirm the day and route with you.",
    about: [
      "The Western Downs, around Dalby, Chinchilla, Miles and Tara, is big cropping, cattle and energy country on the Warrego Highway west of Toowoomba. It has some of the longest distances on our list.",
      "Work vehicles are the norm here: utes, 4WDs and light trucks that rack up kilometres on farms and worksites. When one is finished, it usually has value in its parts and metal, and we buy it in any condition.",
      "Because of the distance, we plan Western Downs collections ahead and often combine them with Toowoomba. If you have several vehicles, tell us up front so we can quote and collect them together.",
    ],
    faqs: [
      {
        question: "Do you collect from Dalby, Chinchilla and Miles?",
        answer:
          "Yes. Dalby, Chinchilla, Miles, Tara, Jandowae and the rest of the Western Downs are in our extended service area. Collections are arranged in advance, so call 0422 360 534 and we will confirm a day.",
      },
      {
        question: "Can you collect several vehicles from one property in the Western Downs?",
        answer:
          "Yes, and it is the easiest way to make a long trip worthwhile. List every vehicle with its make, model, year and condition and we will quote them together.",
      },
    ],
    nearby: ["toowoomba", "southern-downs", "south-burnett"],
  },
  {
    slug: "fraser-coast",
    name: "Fraser Coast",
    region: "Wide Bay",
    tier: "extended",
    council: "Fraser Coast Regional Council",
    distanceKm: "290–330",
    geo: { latitude: -25.2882, longitude: 152.8531 },
    suburbs: [
      "Hervey Bay",
      "Pialba",
      "Urangan",
      "Torquay",
      "Scarness",
      "Point Vernon",
      "Kawungan",
      "Maryborough",
      "Tinana",
      "Howard",
      "Burrum Heads",
      "Tiaro",
    ],
    access:
      "The Fraser Coast is reached from Sherwood by the Bruce Highway, about three and a half to four hours north.",
    vehicles:
      "Second cars, retirees' vehicles, utes and older cars from Hervey Bay, Maryborough and rural properties.",
    pickup:
      "Fraser Coast pickups are booked in advance, and we confirm the day with you.",
    about: [
      "The Fraser Coast takes in Hervey Bay, the beachside gateway to K'gari (Fraser Island), and the historic city of Maryborough, plus Tiaro, Howard and Burrum Heads. It is a popular retirement and holiday area.",
      "That means plenty of second cars, vehicles left after a move or an estate clearance, and older cars that no longer pass a roadworthy. We buy them in any condition, and we tow them free.",
      "The Fraser Coast is a long drive from our Sherwood depot, so pickups are planned rather than same-day. Tell us where the car is and what the access is like, and we will confirm a day when we quote.",
    ],
    faqs: [
      {
        question: "Do you collect from Hervey Bay and Maryborough?",
        answer:
          "Yes. Hervey Bay, Pialba, Urangan, Torquay, Maryborough, Tinana, Howard, Burrum Heads and Tiaro are in our extended service area. Call 0422 360 534 and we will confirm a day.",
      },
      {
        question: "Can you collect a car from an estate or a house clearance on the Fraser Coast?",
        answer:
          "Yes. Tell us it is part of a clearance and who will be there. We can quote the car and arrange collection, and we will explain the paperwork you need.",
      },
    ],
    nearby: ["gympie", "bundaberg"],
  },
  {
    slug: "bundaberg",
    name: "Bundaberg",
    region: "Wide Bay",
    tier: "extended",
    council: "Bundaberg Regional Council",
    distanceKm: "370–410",
    geo: { latitude: -24.8661, longitude: 152.3489 },
    suburbs: [
      "Bundaberg Central",
      "Kepnock",
      "Avoca",
      "Bargara",
      "Millbank",
      "Kalkie",
      "Branyan",
      "Burnett Heads",
      "Elliott Heads",
      "Moore Park Beach",
      "Childers",
      "Gin Gin",
    ],
    access:
      "Bundaberg is reached from Sherwood by the Bruce Highway, about four and a half to five hours north.",
    vehicles:
      "Utes, 4WDs, farm trucks and older cars from cane farms, coastal suburbs and rural towns.",
    pickup:
      "Bundaberg pickups are arranged well in advance, often combined with other Wide Bay collections.",
    about: [
      "Bundaberg is a sugar-cane and rum city with a coast of its own at Bargara, Elliott Heads and Burnett Heads, and rural towns such as Childers and Gin Gin inland.",
      "Cane farms and orchards use a lot of utes, 4WDs and light trucks, and the older ones eventually have no resale value as a running vehicle. We still make an offer, because parts and metal have value, and we buy in any condition.",
      "Bundaberg is the longest trip on our list, so collections are planned in advance and combined with other Wide Bay jobs where we can. If you have more than one vehicle, send them all together and we will quote them as a group.",
    ],
    faqs: [
      {
        question: "Do you collect from Bundaberg, Bargara and Childers?",
        answer:
          "Yes. Bundaberg, Bargara, Kepnock, Avoca, Burnett Heads, Elliott Heads, Childers and Gin Gin are in our extended service area. Call 0422 360 534 and we will confirm a collection day.",
      },
      {
        question: "Is it worth selling a single car in Bundaberg to you given the distance?",
        answer:
          "It can be. We quote before we send a truck, and towing is free if we buy the car. Collections are easier to arrange when we can combine them, so tell us about any other vehicles too.",
      },
    ],
    nearby: ["fraser-coast", "gympie"],
  },
];
