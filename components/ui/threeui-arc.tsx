"use client";

import { PredictiveArcCanvas } from "@designcodeio/threeui/components/PredictiveArcCanvas";
import "@designcodeio/threeui/style.css";

/**
 * Client boundary for ThreeUI's PredictiveArcCanvas (the library ships no
 * "use client" directive, so the App Router needs this wrapper).
 * Renders the violet pixel arch with the luminous animated core.
 */
export default function ThreeUIArc({ className }: { className?: string }) {
  return (
    <PredictiveArcCanvas
      variant="predictive"
      mode="dark"
      speed={1}
      className={className}
    />
  );
}
