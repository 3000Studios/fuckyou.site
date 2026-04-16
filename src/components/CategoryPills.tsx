import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../data/categories";
import { cx } from "../lib/utils";

export function CategoryPills({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Categories"
      className={cx("flex flex-wrap items-center gap-2", className)}
    >
      <NavLink
        to="/blog"
        end
        className={({ isActive }) =>
          cx(
            "px-3 py-1.5 text-sm rounded-full border transition-colors",
            isActive
              ? "border-neon-red bg-neon-red text-white"
              : "border-ink-500 text-ink-100 hover:border-neon-red hover:text-white"
          )
        }
      >
        All
      </NavLink>
      {CATEGORIES.map((c) => (
        <NavLink
          key={c.slug}
          to={`/category/${c.slug}`}
          className={({ isActive }) =>
            cx(
              "px-3 py-1.5 text-sm rounded-full border transition-colors",
              isActive
                ? "border-neon-red bg-neon-red text-white"
                : "border-ink-500 text-ink-100 hover:border-neon-red hover:text-white"
            )
          }
        >
          {c.name}
        </NavLink>
      ))}
    </nav>
  );
}
