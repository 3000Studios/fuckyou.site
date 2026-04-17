import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { NAV, SITE } from "../lib/site";
import { cx } from "../lib/utils";
import { TokenBadge } from "./TokenBadge";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            <LogoMark />
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
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "text-white bg-ink-700"
                      : "text-ink-100 hover:text-white hover:bg-ink-700/60"
                  )
                }
              >
                {item.label}
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
                  "px-3 py-2 rounded-md text-sm font-medium",
                  isActive
                    ? "text-white bg-ink-700"
                    : "text-ink-100 hover:text-white hover:bg-ink-700/60"
                )
              }
            >
              {item.label}
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

function LogoMark() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-ink-800 ring-1 ring-ink-600 group-hover:ring-neon-red transition"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-neon-red"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M7 17L17 7" />
      </svg>
    </span>
  );
}
