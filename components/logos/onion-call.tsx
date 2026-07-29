import type { SVGProps } from "react";

const OnionCall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Phone icon with onion-like layers */}
    <rect x="7" y="3" width="14" height="22" rx="3" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="6" width="10" height="14" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    <circle cx="14" cy="20" r="1.5" fill="currentColor" />
    {/* Signal waves */}
    <path d="M5 12C5 12 3 14 3 16C3 18 5 20 5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M23 12C23 12 25 14 25 16C25 18 23 20 23 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Onion layers on top */}
    <path d="M10 3C10 1 14 0 14 0C14 0 18 1 18 3" stroke="currentColor" strokeWidth="1" opacity="0.6" />
  </svg>
);

export default OnionCall;
