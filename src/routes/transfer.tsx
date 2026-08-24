import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Check, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { allRecipients, balance, money, recentRecipients, type Person } from "@/lib/mock-data";

export const Route = createFileRoute("/transfer")({
  head: () => ({
    meta: [
      { title: "Send Money — Meridian" },
      {
        name: "description",
        content:
          "Send money instantly to saved recipients with Meridian: pick a person, set an amount, confirm.",
      },
      { property: "og:title", content: "Send Money — Meridian" },
      {
        property: "og:description",
        content: "A three-step transfer flow: recipient, amount, review and confirm.",
      },
    ],
  }),
  component: TransferPage,
});

const steps = ["Recipient", "Amount", "Review"];

function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-accent-soft font-bold text-accent",
        size === "lg" ? "size-14 text-base" : "size-10 text-xs",
      )}
    >
      {initials}
    </span>
  );
}

function TransferPage() {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [person, setPerson] = useState<Person | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const list = useMemo(
    () =>
      allRecipients.filter((p) =>
        (p.name + p.bank).toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );

  const numeric = Number(amount || 0);
  const fontSize = amount.length > 9 ? "text-4xl" : amount.length > 6 ? "text-5xl" : "text-6xl";

  const reset = () => {
    setStep(0);
    setPerson(null);
    setAmount("");
    setNote("");
    setQuery("");
  };

  const select = (p: Person) => {
    setPerson(p);
    setStep(1);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">Send money</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Transfers between Meridian accounts arrive instantly.
        </p>
      </div>

      {step < 3 && (
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card">
          {steps.map((label, i) => (
            <div key={label} className="flex flex-1 items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid size-7 place-items-center rounded-full text-xs font-bold transition-colors duration-200",
                    i < step
                      ? "bg-success text-success-foreground"
                      : i === step
                        ? "bg-accent text-accent-foreground"
                        : "bg-secondary text-muted-foreground",
                  )}
                >
                  {i < step ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-semibold sm:block",
                    i === step ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "h-px flex-1 transition-colors duration-200",
                    i < step ? "bg-success" : "bg-border",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {step === 0 && (
        <div key="s0" className="animate-fade-up space-y-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, or account"
              className="h-12 w-full rounded-xl bg-card pl-11 pr-4 text-sm shadow-card outline-none ring-accent/30 transition-all duration-150 focus:ring-2"
            />
          </div>

          <section className="rounded-2xl bg-card p-5 shadow-card">
            <h2 className="text-sm font-bold">Recent recipients</h2>
            <div className="no-scrollbar -mx-1 mt-4 flex gap-5 overflow-x-auto px-1 pb-1">
              {recentRecipients.map((p) => (
                <button
                  key={p.id}
                  onClick={() => select(p)}
                  className="flex w-16 shrink-0 flex-col items-center gap-2 transition-transform duration-150 hover:-translate-y-0.5"
                >
                  <Avatar initials={p.initials} size="lg" />
                  <span className="w-full truncate text-center text-[11px] font-semibold">
                    {p.name.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-card p-5 shadow-card">
            <h2 className="text-sm font-bold">All recipients</h2>
            <ul className="mt-1 divide-y divide-border">
              {list.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => select(p)}
                    className="flex w-full items-center gap-3 rounded-xl px-1 py-3 text-left transition-colors duration-150 hover:bg-secondary"
                  >
                    <Avatar initials={p.initials} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">{p.name}</span>
                      <span className="block text-xs text-muted-foreground">{p.bank}</span>
                    </span>
                  </button>
                </li>
              ))}
              {list.length === 0 && (
                <li className="py-6 text-center text-sm text-muted-foreground">
                  No recipients found.
                </li>
              )}
            </ul>
          </section>
        </div>
      )}

      {step === 1 && person && (
        <div key="s1" className="animate-fade-up space-y-5">
          <section className="rounded-2xl bg-card p-8 shadow-card">
            <div className="flex flex-col items-center gap-2">
              <Avatar initials={person.initials} size="lg" />
              <p className="text-sm font-semibold">Sending to {person.name}</p>
              <p className="text-xs text-muted-foreground">{person.bank}</p>
            </div>

            <div className="mt-8 flex items-center justify-center gap-1">
              <span className={cn("font-extrabold text-muted-foreground", fontSize)}>$</span>
              <input
                autoFocus
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                placeholder="0"
                className={cn(
                  "w-full max-w-[320px] bg-transparent text-center font-extrabold tracking-tight outline-none transition-all duration-150 placeholder:text-muted-foreground/40",
                  fontSize,
                )}
              />
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {money(balance)} available
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {[50, 100, 250].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(String(v))}
                  className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-accent-soft hover:text-accent"
                >
                  ${v}
                </button>
              ))}
              <button
                onClick={() => setAmount(balance.toFixed(2))}
                className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold transition-colors duration-150 hover:bg-accent-soft hover:text-accent"
              >
                Max
              </button>
            </div>

            <div className="mt-7">
              <label htmlFor="note" className="text-xs font-semibold text-muted-foreground">
                Note (optional)
              </label>
              <input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What's this for?"
                className="mt-2 h-11 w-full rounded-xl bg-secondary px-4 text-sm outline-none ring-accent/30 transition-all duration-150 focus:bg-card focus:ring-2"
              />
            </div>
          </section>

          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setStep(0)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              disabled={!(numeric > 0 && numeric <= balance)}
              onClick={() => setStep(2)}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-card transition-all duration-150 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && person && (
        <div key="s2" className="animate-fade-up space-y-5">
          <section className="rounded-2xl bg-card p-6 shadow-card">
            <div className="flex items-center gap-3 border-b border-border pb-5">
              <Avatar initials={person.initials} size="lg" />
              <div>
                <p className="text-base font-bold">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.bank}</p>
              </div>
            </div>
            <dl className="divide-y divide-border text-sm">
              <div className="flex items-center justify-between py-3.5">
                <dt className="text-muted-foreground">Amount</dt>
                <dd className="font-bold tabular-nums">{money(numeric)}</dd>
              </div>
              <div className="flex items-center justify-between py-3.5">
                <dt className="text-muted-foreground">Transfer fee</dt>
                <dd className="font-semibold text-success">No fee</dd>
              </div>
              {note && (
                <div className="flex items-center justify-between gap-6 py-3.5">
                  <dt className="text-muted-foreground">Note</dt>
                  <dd className="truncate font-semibold">{note}</dd>
                </div>
              )}
              <div className="flex items-center justify-between py-3.5">
                <dt className="text-muted-foreground">Estimated arrival</dt>
                <dd className="inline-flex items-center gap-1.5 font-semibold">
                  <Zap className="size-4 text-warning" />
                  {person.bank.startsWith("Meridian") ? "Instant" : "1–2 business days"}
                </dd>
              </div>
              <div className="flex items-center justify-between py-4">
                <dt className="font-bold">Total</dt>
                <dd className="text-lg font-extrabold tabular-nums">{money(numeric)}</dd>
              </div>
            </dl>
            <button
              onClick={() => setStep(3)}
              className="mt-2 w-full rounded-xl bg-accent py-3.5 text-sm font-bold text-accent-foreground shadow-card transition-all duration-150 hover:opacity-90"
            >
              Confirm Transfer
            </button>
          </section>
          <div className="text-center">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Back to amount
            </button>
          </div>
        </div>
      )}

      {step === 3 && person && (
        <section
          key="s3"
          className="animate-fade-up rounded-2xl bg-card px-6 py-14 text-center shadow-card"
        >
          <span className="animate-pop mx-auto grid size-20 place-items-center rounded-full bg-success-soft">
            <Check className="size-9 text-success" strokeWidth={3} />
          </span>
          <h2 className="mt-6 text-2xl font-extrabold">Transfer sent!</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {money(numeric)} is on its way to {person.name}.
          </p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="flex-1 rounded-xl bg-accent py-3 text-sm font-bold text-accent-foreground transition-opacity duration-150 hover:opacity-90"
            >
              Done
            </Link>
            <button
              onClick={reset}
              className="flex-1 rounded-xl border border-border bg-card py-3 text-sm font-bold transition-colors duration-150 hover:bg-secondary"
            >
              Send another
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
