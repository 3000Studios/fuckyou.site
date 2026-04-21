import { useEffect, useMemo, useState } from "react";
import { Seo } from "../components/Seo";
import { SITE } from "../lib/site";
import { getHourlyDrop, msUntilNextHour } from "../lib/hourly";
import type { MessageItem } from "../lib/messageCenter";
import { isRead, markAllRead, markRead } from "../lib/messageCenter";
import { formatDate } from "../lib/utils";

function moodClasses(mood: MessageItem["mood"]): string {
  if (mood === "ice") return "from-neon-blue/20 via-ink-900 to-ink-950";
  if (mood === "toxic") return "from-emerald-400/15 via-ink-900 to-ink-950";
  return "from-neon-red/25 via-ink-900 to-ink-950";
}

export function MessagesPage() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timer = window.setTimeout(() => setNow(new Date()), msUntilNextHour(now));
    return () => window.clearTimeout(timer);
  }, [now]);

  const hourly = useMemo(() => getHourlyDrop(now), [now]);

  const system: MessageItem[] = useMemo(
    () => [
      {
        type: "system",
        id: "sys_videos_subscribe_messages_launch",
        title: "New drop: Videos + Subscribe + Messages are live",
        body:
          "Video wallpapers, a subscription page with working PayPal/Stripe links, and an hourly message center just landed. If something looks off, hit Contact and roast us properly.",
        createdAt: "2026-04-21T00:00:00Z",
        mood: "ember",
      },
    ],
    []
  );

  const items: MessageItem[] = useMemo(
    () => [{ type: "hourly", ...hourly }, ...system],
    [hourly, system]
  );

  const unreadCount = useMemo(
    () => items.filter((m) => !isRead(m.id)).length,
    [items]
  );

  return (
    <>
      <Seo
        title="Messages"
        description={`Your hourly drops and site updates on ${SITE.name}.`}
        path="/messages"
        keywords={["messages", "hourly", "updates"]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-neon-red">
          Message Center
        </p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white">
              Messages
            </h1>
            <p className="mt-3 text-ink-100 max-w-2xl">
              The site talks back. One new drop every hour, plus updates when we
              ship something worth shipping.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-xs text-ink-200">Unread</p>
            <p className="mt-1 font-display text-3xl font-black text-white">
              {unreadCount}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => markAllRead(items)}
            className="rounded-lg bg-ink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-600"
          >
            Mark all read
          </button>
          <p className="text-xs text-ink-200 flex items-center">
            Next hourly drop refreshes on the hour.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="space-y-4">
          {items.map((m) => {
            const read = isRead(m.id);
            return (
              <article
                key={m.id}
                className={`relative rounded-3xl overflow-hidden border ${
                  read ? "border-ink-700" : "border-neon-red/40"
                } bg-ink-800/60`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${moodClasses(
                    m.mood
                  )} opacity-70`}
                  aria-hidden="true"
                />
                <div className="relative p-6 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.26em] text-ink-100">
                        {m.type === "hourly" ? "Hourly Drop" : "Update"} ·{" "}
                        <time dateTime={m.createdAt}>
                          {formatDate(m.createdAt)}
                        </time>
                      </p>
                      <h2 className="mt-2 font-display text-xl sm:text-2xl font-black text-white">
                        {m.title}
                      </h2>
                    </div>
                    {!read && (
                      <span className="inline-flex items-center rounded-full bg-neon-red/20 text-neon-red px-2.5 py-1 text-xs font-semibold">
                        New
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-ink-100">{m.body}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => markRead(m.id)}
                      className="rounded-lg bg-ink-900/50 px-4 py-2 text-sm font-semibold text-white hover:bg-ink-900"
                    >
                      Mark read
                    </button>
                    {m.type === "hourly" && (
                      <p className="text-xs text-ink-200">
                        Drop ID: <span className="font-mono">{m.id}</span>
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

