import { useEffect, useMemo, useState } from "react";
import type { MediaCredit } from "../../lib/media";
import { cx } from "../../lib/utils";

type Props = {
  media: MediaCredit;
  className?: string;
  autoPlay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  posterGradient?: string;
};

export function AutoVideo({
  media,
  className,
  autoPlay = true,
  controls = false,
  muted = true,
  loop = true,
  posterGradient = "from-neon-red/25 via-ink-900 to-neon-blue/15",
}: Props) {
  const [canPlay, setCanPlay] = useState(false);
  const id = useMemo(() => `vid_${media.id}`, [media.id]);

  useEffect(() => {
    setCanPlay(false);
  }, [media.id]);

  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-ink-600 bg-ink-800",
        className
      )}
    >
      <div
        className={cx(
          "absolute inset-0 bg-gradient-to-br",
          posterGradient,
          "opacity-70"
        )}
        aria-hidden="true"
      />

      <video
        id={id}
        className={cx(
          "relative h-full w-full object-cover",
          canPlay ? "opacity-100" : "opacity-0"
        )}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        controls={controls}
        preload="metadata"
        crossOrigin="anonymous"
        onCanPlay={() => setCanPlay(true)}
      >
        <source src={media.url} type="video/webm" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-900/10 to-transparent pointer-events-none" />
    </div>
  );
}

