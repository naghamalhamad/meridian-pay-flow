# Meridian Finance Hub

Build a modern fintech/banking web app called "Meridian" with 2 pages: a Home Dashboard and a Send Money (Transfer) flow. Light, minimal, clean-corporate aesthetic — think a mix of a premium neobank and enterprise fintech (Mercury, Ramp, Revolut business).

Design system

Background: soft off-white (#F7F8FA), cards on white (#FFFFFF) with very subtle shadows (not heavy borders)

Primary color: deep navy/slate (#0F172A) for text and key UI

Accent: indigo/blue (#4F46E5) for CTAs, active states, links

Success: emerald green (#10B981), Warning: amber (#F59E0B), Error: red (#EF4444)

Typography: Inter or Manrope, clean sans-serif, generous letter spacing on headings

Rounded corners: 16px on cards, 12px on buttons/inputs

Generous white space, no clutter, thin dividers instead of boxes where possible

Subtle micro-interactions: hover states, smooth transitions (150-200ms), soft fade/slide on page load

Global layout

Left sidebar nav (desktop): logo top, nav items with icons — Home, Transfer, Cards, Analytics, Settings — active item highlighted with accent color and light indigo background pill

Top bar: search, notification bell (with dot badge), user avatar with dropdown

Fully responsive: sidebar collapses to bottom nav bar on mobile

PAGE 1 — Home Dashboard

Greeting header: "Good morning, Alex" + today's date, notification bell + avatar top right

Balance hero card: large card, gradient-subtle navy background, big balance figure (e.g. $24,582.10), eye icon to toggle visibility (blur/unblur), account number masked (•••• 4821), small "+2.4% this month" pill in green

Card carousel widget: horizontally scrollable card previews (2-3 cards) showing masked card number, cardholder name, expiry, card network logo placeholder, a "Freeze card" toggle switch on the active card

Quick actions row: 4 circular icon buttons — Send, Request, Top Up, More — label under each icon

Spending overview: small bar or line chart (mock weekly data, last 7 days), category breakdown as 3-4 colored pill tags (Groceries, Transport, Subscriptions, Dining) with amounts

Recent transactions list: 5-6 rows, each with merchant icon/logo placeholder, merchant name, category subtext, amount (red for outgoing, green for incoming), relative date (Today, Yesterday, Mar 12). "View all" link top right of section

Use realistic mock data throughout (real-sounding merchant names, varied amounts, believable dates).

PAGE 2 — Send Money / Transfer

Multi-step flow on one page, using a stepper or progressive reveal (no page reloads):

Step 1 — Recipient

Search bar "Search name, email, or account"

"Recent recipients" as horizontal avatar row (5-6 people, mock names)

Full recipient list below with avatar, name, bank/account subtext, tap to select

Step 2 — Amount

Large centered numeric input, currency symbol prefixed, auto-resizing font

Available balance shown subtly below input

Quick-select chips: $50, $100, $250, Max

Optional note/memo text field

Step 3 — Review & Confirm

Summary card: recipient avatar + name, amount, transfer fee (or "No fee"), total, estimated arrival ("Instant" or "1-2 business days")

Primary CTA button "Confirm Transfer" full width, accent color

Back link to previous step

Step 4 — Success state

Centered checkmark animation/icon in a soft green circle

"Transfer sent!" confirmation with amount + recipient name

Two buttons: "Done" (returns to Dashboard) and "Send another"

Show a persistent step indicator (1-2-3) at the top of the flow so users always know where they are.

Technical notes

This is a frontend-only prototype — use realistic mock/static data, no real backend or auth needed

Prioritize polish and micro-interactions over extra features — this is a 2-page app, make both pages feel complete and production-quality rather than adding more screens

Ensure both pages are fully responsive (mobile + desktop)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://meridian-pay-flow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/329a4472-72b1-40e8-b3f0-0827569bb55a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
