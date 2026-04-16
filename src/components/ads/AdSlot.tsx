import { useEffect, useRef } from "react";
import { SITE } from "../../lib/site";
import { pushAd } from "../../lib/adsense";
import { cx } from "../../lib/utils";

type Props = {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
  className?: string;
  minHeight?: number;
  label?: string;
};

/**
 * AdSlot renders a Google AdSense ad unit. In production it requires:
 *  - VITE_GOOGLE_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
 *  - A slot ID provided per placement (configured in AdSense dashboard)
 * Without a client ID, it falls back to a styled placeholder so layout
 * never collapses.
 */
export function AdSlot({
  slot,
  format = "auto",
  layout,
  layoutKey,
  responsive = true,
  className,
  minHeight = 120,
  label = "Advertisement",
}: Props) {
  const ref = useRef<HTMLModElement | null>(null);
  const client = SITE.adsenseClient;
  const enabled = !!client && client.startsWith("ca-pub-");

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;
    pushAd();
  }, [enabled, slot]);

  return (
    <aside
      className={cx(
        "ad-slot my-6",
        className,
        !enabled && "flex items-center justify-center"
      )}
      style={{ minHeight }}
      aria-label={label}
      data-ad-slot={slot}
    >
      {enabled ? (
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{ display: "block", minHeight }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-ad-layout={layout}
          data-ad-layout-key={layoutKey}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      ) : (
        <span className="text-[11px] uppercase tracking-widest">
          Ad slot · {slot}
        </span>
      )}
    </aside>
  );
}
