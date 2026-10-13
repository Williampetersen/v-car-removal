import type { ReactNode } from "react";
import {
  BadgeDollarSign,
  Bike,
  Car,
  Clock,
  Phone,
  Recycle,
  ShieldCheck,
  Truck,
  Wrench,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Mail,
  Menu,
  X,
  ChevronRight,
  Star,
  User,
  ArrowRight,
  Zap,
  HandCoins,
  BusFront,
  CarFront,
  Calendar,
  ChevronDown,
} from "lucide-react";

type DuoProps = { className?: string; "aria-hidden"?: boolean };

function Duo({
  className,
  children,
  ...rest
}: DuoProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {children}
    </svg>
  );
}

const soft = { fill: "currentColor", fillOpacity: 0.22 } as const;

function CarDuo(p: DuoProps) {
  return (
    <Duo {...p}>
      <path {...soft} d="M7 30l3.4-9.2A4 4 0 0 1 14.1 18h19.8a4 4 0 0 1 3.7 2.8L41 30v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2z" />
      <path d="M7 30h34M10.4 20.8L7 30v7a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2v-7l-3.4-9.2A4 4 0 0 0 33.9 18H14.1a4 4 0 0 0-3.7 2.8z" />
      <circle cx="14" cy="34" r="1.6" fill="currentColor" />
      <circle cx="34" cy="34" r="1.6" fill="currentColor" />
      <path d="M11 39v3M37 39v3" />
    </Duo>
  );
}

function TowDuo(p: DuoProps) {
  return (
    <Duo {...p}>
      <path {...soft} d="M4 33V22l6-5h12v16z" />
      <path d="M4 33V22l6-5h12v16M22 33h6M4 33h2" />
      <path d="M24 28l12-14M36 14l4 2M40 16v8" />
      <path {...soft} d="M30 33h14v-5H30z" />
      <path d="M30 33h14M30 28h14" />
      <circle cx="11" cy="35" r="4" />
      <circle cx="37" cy="35" r="4" />
    </Duo>
  );
}

function CashDuo(p: DuoProps) {
  return (
    <Duo {...p}>
      <rect {...soft} x="5" y="14" width="38" height="22" rx="3" />
      <rect x="5" y="14" width="38" height="22" rx="3" />
      <circle cx="24" cy="25" r="5.5" />
      <path d="M24 22v6M22 23.5c0-1 1-1.5 2-1.5s2 .5 2 1.5-1 1.2-2 1.5-2 .5-2 1.5 1 1.5 2 1.5 2-.5 2-1.5" strokeWidth={1.4} />
      <path d="M10 19v.01M38 31v.01" strokeWidth={3} />
    </Duo>
  );
}

function TruckDuo(p: DuoProps) {
  return (
    <Duo {...p}>
      <path {...soft} d="M5 14h24v20H5z" />
      <path d="M5 14h24v20M29 20h8l6 7v7h-14zM5 34h2M20 34h9M38 34h5" />
      <path d="M33 22.5h3.5l3 4H33z" />
      <path d="M11 20h12M11 25h12" />
      <circle cx="13" cy="35" r="4" />
      <circle cx="36" cy="35" r="4" />
    </Duo>
  );
}

function BikeDuo(p: DuoProps) {
  return (
    <Duo {...p}>
      <circle {...soft} cx="11" cy="33" r="7" />
      <circle {...soft} cx="37" cy="33" r="7" />
      <circle cx="11" cy="33" r="7" />
      <circle cx="37" cy="33" r="7" />
      <path d="M11 33l7-12h9l6 12M18 21l-2-4h-4M27 21l-2-6h6l2 5M17 33h8l4-9" />
      <path {...soft} d="M20 24h12l-3 5h-9z" />
    </Duo>
  );
}

export const ServiceIcons = {
  cash: CashDuo,
  tow: TowDuo,
  recycle: Recycle,
  truck: TruckDuo,
  wrench: Wrench,
  car: CarDuo,
  bike: BikeDuo,
};

export {
  BadgeDollarSign,
  Bike,
  Car,
  Clock,
  Phone,
  Recycle,
  ShieldCheck,
  Truck,
  Wrench,
  MapPin,
  CheckCircle2,
  PhoneCall,
  Mail,
  Menu,
  X,
  ChevronRight,
  Star,
  User,
  ArrowRight,
  Zap,
  Calendar,
  ChevronDown,
  CarFront,
};

