import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
  Send,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { balance, cards, categories, money, transactions, weekly } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Meridian Business Banking" },
      {
        name: "description",
        content:
          "See your Meridian balance, cards, weekly spending and recent transactions in one clean dashboard.",
      },
      { property: "og:title", content: "Dashboard — Meridian Business Banking" },
      {
        property: "og:description",
        content: "Balance, cards, spending insights and recent activity at a glance.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [hidden, setHidden] = useState(false);
  const max = Math.max(...weekly.map((w) => w.amount));

  return (
    <div className="animate-fade-up space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-extrabold sm:text-3xl">Good morning, Alex</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Thursday, March 13 · Everything looks healthy
          </p>
        </div>
      </div>

      <div className="grid min-w-0 gap-5 lg:grid-cols-3">
        <section className="gradient-hero relative w-full min-w-0 overflow-hidden rounded-2xl p-6 text-primary-foreground shadow-lift lg:col-span-2">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-start">
            <div className="min-w-0">
              <p className="text-sm/6 opacity-70">Total balance</p>
              <div className="mt-1 flex items-center gap-3">
                <span
                  className={cn(
                    "text-4xl font-extrabold tracking-tight transition-all duration-200 sm:text-5xl",
                    hidden && "blur-md select-none",
                  )}
                >
                  {money(balance)}
                </span>
                <button
                  aria-label={hidden ? "Show balance" : "Hide balance"}
                  onClick={() => setHidden((v) => !v)}
                  className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 transition-colors duration-150 hover:bg-white/20"
                >
                  {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <p className="mt-3 text-sm opacity-70">Business checking · •••• 4821</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 self-start rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success">
              <TrendingUp className="size-3.5" /> +2.4% this month
            </span>
          </div>
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-white/5" />
        </section>

        <section className="min-w-0 rounded-2xl bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Your cards</h2>
            <span className="text-xs text-muted-foreground">{cards.length} active</span>
          </div>
          <div className="no-scrollbar -mx-1 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
            {cards.map((card) => (
              <article
                key={card.id}
                className="w-[230px] shrink-0 snap-start rounded-2xl bg-primary p-4 text-primary-foreground transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider opacity-70">
                    {card.label}
                  </span>
                  <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-bold">
                    {card.network}
                  </span>
                </div>
                <p className="mt-6 font-mono text-sm tracking-[0.18em]">
                  •••• •••• •••• {card.last4}
                </p>
                <div className="mt-4 flex items-end justify-between text-[11px] opacity-80">
                  <span>{card.holder}</span>
                  <span>{card.expiry}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="grid grid-cols-4 gap-3 rounded-2xl bg-card p-5 shadow-card sm:gap-5">
        {[
          { label: "Send", icon: Send, to: "/transfer" as const },
          { label: "Request", icon: ArrowDownLeft },
          { label: "Top Up", icon: Plus },
          { label: "More", icon: MoreHorizontal },
        ].map(({ label, icon: Icon, to }) => {
          const body = (
            <>
              <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-150 group-hover:-translate-y-0.5">
                <Icon className="size-5" />
              </span>
              <span className="text-xs font-semibold">{label}</span>
            </>
          );
          return to ? (
            <Link key={label} to={to} className="group flex flex-col items-center gap-2">
              {body}
            </Link>
          ) : (
            <button key={label} className="group flex flex-col items-center gap-2">
              {body}
            </button>
          );
        })}
      </section>

      <div className="grid gap-5 lg:grid-cols-5">
        <section className="rounded-2xl bg-card p-6 shadow-card lg:col-span-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-bold">Spending overview</h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <p className="mt-3 text-2xl font-extrabold">
            {money(weekly.reduce((a, b) => a + b.amount, 0))}
          </p>
          <div className="mt-5 flex h-32 items-end gap-2">
            {weekly.map((w) => (
              <div key={w.day} className="group flex flex-1 flex-col items-center gap-2">
                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-accent/25 transition-all duration-200 group-hover:bg-accent"
                    style={{ height: `${(w.amount / max) * 100}%` }}
                    title={money(w.amount)}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground">{w.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
            {categories.map((c) => (
              <span
                key={c.name}
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold"
              >
                <span className={cn("size-2 rounded-full", c.token)} />
                {c.name}
                <span className="text-muted-foreground">{money(c.amount)}</span>
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-card p-6 shadow-card lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Recent transactions</h2>
            <button className="text-xs font-semibold text-accent transition-opacity duration-150 hover:opacity-70">
              View all
            </button>
          </div>
          <ul className="mt-2 divide-y divide-border">
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex items-center gap-3 py-3.5 transition-colors duration-150 hover:bg-secondary/60"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-muted-foreground">
                  {t.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{t.merchant}</p>
                  <p className="text-xs text-muted-foreground">{t.category}</p>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      t.amount > 0 ? "text-success" : "text-destructive",
                    )}
                  >
                    {t.amount > 0 ? "+" : "−"}
                    {money(Math.abs(t.amount))}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.when}</p>
                </div>
                <ArrowUpRight
                  className={cn(
                    "size-4 shrink-0 text-muted-foreground",
                    t.amount > 0 && "rotate-90",
                  )}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
