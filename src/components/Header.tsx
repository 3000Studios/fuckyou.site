import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV, SITE } from "../lib/site";
import { cx } from "../lib/utils";
import { TokenBadge } from "./TokenBadge";
import { WireframeOrb } from "./brand/WireframeOrb";
import { getHourlyDrop, msUntilNextHour } from "../lib/hourly";
import { isRead } from "../lib/messageCenter";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [unread, setUnread] = useState(0);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function compute() {
      const hourly = getHourlyDrop(new Date());
      const sysId = "sys_videos_subscribe_messages_launch";
      const ids = [hourly.id, sysId];
      setUnread(ids.filter((id) => !isRead(id)).length);
    }
    compute();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "fys_messages_v1") compute();
    };
    window.addEventListener("storage", onStorage);

    let timer = window.setTimeout(() => compute(), msUntilNextHour(new Date()));
    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-30 backdrop-blur transition-colors",
        scrolled
          ? "bg-ink-900/85 border-b border-ink-600/60"
          : "bg-ink-900/60 border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            aria-label={`${SITE.name} home`}
            className="flex items-center gap-2 group"
          >
            <div className="relative h-10 w-10 rounded-xl border border-ink-600/70 bg-ink-800/60 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,42,85,0.22),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_65%,rgba(41,216,255,0.18),transparent_60%)]" />
              <WireframeOrb className="absolute inset-0" size={40} speed={1.05} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="text-white">fuckyou</span>
              <span className="text-neon-red">.</span>
              <span className="text-ink-100">site</span>
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-1"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cx(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors inline-flex items-center gap-2",
                    isActive
                      ? "text-white bg-ink-700"
                      : "text-ink-100 hover:text-white hover:bg-ink-700/60"
                  )
                }
              >
                {item.label}
                {item.to === "/messages" && unread > 0 ? (
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-neon-red shadow-[0_0_0_3px_rgba(255,42,85,0.16)]" />
                ) : null}
              </NavLink>
            ))}
            <div className="ml-2">
              <TokenBadge />
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md text-ink-100 hover:text-white hover:bg-ink-700"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cx(
          "md:hidden overflow-hidden transition-[max-height] duration-200",
          open ? "max-h-[500px] border-t border-ink-600/60" : "max-h-0"
        )}
      >
        <nav aria-label="Mobile" className="px-4 py-3 flex flex-col gap-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cx(
                  "px-3 py-2 rounded-md text-sm font-medium inline-flex items-center justify-between gap-3",
                  isActive
                    ? "text-white bg-ink-700"
                    : "text-ink-100 hover:text-white hover:bg-ink-700/60"
                )
              }
            >
              <span>{item.label}</span>
              {item.to === "/messages" && unread > 0 ? (
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-neon-red shadow-[0_0_0_3px_rgba(255,42,85,0.16)]" />
              ) : null}
            </NavLink>
          ))}
          <div className="mt-2 px-3 py-2">
            <TokenBadge />
          </div>
        </nav>
      </div>
    </header>
  );
}
