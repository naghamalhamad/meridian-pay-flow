import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  CreditCard,
  Home,
  PieChart,
  Search,
  Send,
  Settings,
  ChevronDown,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nav = [
  { label: "Home", icon: Home, to: "/" as const, enabled: true },
  { label: "Transfer", icon: Send, to: "/transfer" as const, enabled: true },
  { label: "Cards", icon: CreditCard, to: "/" as const, enabled: false },
  { label: "Analytics", icon: PieChart, to: "/" as const, enabled: false },
  { label: "Settings", icon: Settings, to: "/" as const, enabled: false },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
        <span className="text-sm font-extrabold tracking-tight">M</span>
      </div>
      <span className="text-[17px] font-extrabold tracking-tight">Meridian</span>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen w-full bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
        <div className="px-2">
          <Logo />
        </div>
        <nav className="mt-9 flex flex-col gap-1">
          {nav.map((item) => {
            const active = item.enabled && pathname === item.to;
            const classes = cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-150",
              active
                ? "bg-accent-soft text-accent"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              !item.enabled &&
                "cursor-default opacity-60 hover:bg-transparent hover:text-muted-foreground",
            );
            if (!item.enabled) {
              return (
                <span key={item.label} className={classes}>
                  <item.icon className="size-[18px]" />
                  {item.label}
                </span>
              );
            }
            return (
              <Link key={item.label} to={item.to} className={classes}>
                <item.icon className="size-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl bg-secondary p-4">
          <p className="text-sm font-bold">Meridian Business</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Your plan renews on Apr 1. Unlimited instant transfers included.
          </p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
            <div className="lg:hidden">
              <Logo />
            </div>
            <div className="relative ml-auto hidden max-w-sm flex-1 sm:block lg:ml-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search transactions, people, cards"
                className="h-10 w-full rounded-xl bg-secondary pl-9 pr-3 text-sm outline-none ring-accent/30 transition-all duration-150 placeholder:text-muted-foreground focus:bg-card focus:ring-2"
              />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                aria-label="Notifications"
                className="relative grid size-10 place-items-center rounded-xl text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
              >
                <Bell className="size-[18px]" />
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 rounded-xl p-1 pr-2 transition-colors duration-150 hover:bg-secondary">
                  <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    AM
                  </span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52 rounded-xl">
                  <DropdownMenuLabel>
                    <p className="text-sm font-semibold">Alex Moreau</p>
                    <p className="text-xs font-normal text-muted-foreground">alex@northwind.co</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Account settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:px-6 lg:pb-16">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="flex items-stretch justify-around px-2 py-2">
          {nav.map((item) => {
            const active = item.enabled && pathname === item.to;
            const inner = (
              <>
                <item.icon className="size-5" />
                <span className="text-[11px] font-semibold">{item.label}</span>
              </>
            );
            const classes = cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 transition-colors duration-150",
              active ? "bg-accent-soft text-accent" : "text-muted-foreground",
              !item.enabled && "opacity-50",
            );
            return item.enabled ? (
              <Link key={item.label} to={item.to} className={classes}>
                {inner}
              </Link>
            ) : (
              <span key={item.label} className={classes}>
                {inner}
              </span>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
