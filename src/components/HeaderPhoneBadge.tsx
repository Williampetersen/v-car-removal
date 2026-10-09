import { CallButton } from "./CallButton";

export function HeaderPhoneBadge() {
  return (
    <span className="hidden md:block">
      <CallButton size="sm" />
    </span>
  );
}
