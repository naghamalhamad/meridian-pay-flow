export type Txn = {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  when: string;
  initials: string;
};

export const transactions: Txn[] = [
  {
    id: "t1",
    merchant: "Whole Foods Market",
    category: "Groceries",
    amount: -128.42,
    when: "Today",
    initials: "WF",
  },
  {
    id: "t2",
    merchant: "Stripe Payout",
    category: "Income",
    amount: 3250.0,
    when: "Today",
    initials: "ST",
  },
  {
    id: "t3",
    merchant: "Uber",
    category: "Transport",
    amount: -24.8,
    when: "Yesterday",
    initials: "UB",
  },
  {
    id: "t4",
    merchant: "Figma",
    category: "Subscriptions",
    amount: -45.0,
    when: "Yesterday",
    initials: "FG",
  },
  {
    id: "t5",
    merchant: "Blue Bottle Coffee",
    category: "Dining",
    amount: -8.75,
    when: "Mar 12",
    initials: "BB",
  },
  {
    id: "t6",
    merchant: "Delta Air Lines",
    category: "Travel",
    amount: -412.3,
    when: "Mar 11",
    initials: "DL",
  },
];

export const weekly = [
  { day: "Mon", amount: 182 },
  { day: "Tue", amount: 96 },
  { day: "Wed", amount: 244 },
  { day: "Thu", amount: 138 },
  { day: "Fri", amount: 312 },
  { day: "Sat", amount: 208 },
  { day: "Sun", amount: 74 },
];

export const categories = [
  { name: "Groceries", amount: 412.6, token: "bg-chart-1" },
  { name: "Transport", amount: 168.2, token: "bg-chart-2" },
  { name: "Subscriptions", amount: 96.0, token: "bg-chart-3" },
  { name: "Dining", amount: 254.15, token: "bg-chart-5" },
];

export const cards = [
  {
    id: "c1",
    label: "Business Debit",
    last4: "4821",
    holder: "Alex Moreau",
    expiry: "08/29",
    network: "VISA",
  },
  {
    id: "c2",
    label: "Virtual · Subscriptions",
    last4: "9034",
    holder: "Alex Moreau",
    expiry: "01/28",
    network: "MC",
  },
  {
    id: "c3",
    label: "Travel Card",
    last4: "5517",
    holder: "Alex Moreau",
    expiry: "11/27",
    network: "AMEX",
  },
];

export type Person = { id: string; name: string; bank: string; initials: string };

export const recentRecipients: Person[] = [
  { id: "p1", name: "Maya Chen", bank: "Chase •••• 2210", initials: "MC" },
  { id: "p2", name: "Daniel Ortiz", bank: "Wells Fargo •••• 8873", initials: "DO" },
  { id: "p3", name: "Priya Raman", bank: "Central Bank •••• 1145", initials: "PR" },
  { id: "p4", name: "Tom Whitaker", bank: "Citi •••• 6402", initials: "TW" },
  { id: "p5", name: "Sofia Lindqvist", bank: "Revolut •••• 3391", initials: "SL" },
  { id: "p6", name: "Jamal Baptiste", bank: "Amex •••• 7728", initials: "JB" },
];

export const allRecipients: Person[] = [
  ...recentRecipients,
  { id: "p7", name: "Northwind Studio LLC", bank: "Mercury •••• 0092", initials: "NS" },
  { id: "p8", name: "Elena Vasquez", bank: "BofA •••• 4417", initials: "EV" },
  { id: "p9", name: "Kai Nakamura", bank: "Central Bank •••• 8830", initials: "KN" },
  { id: "p10", name: "Harper Studios", bank: "Chase •••• 5561", initials: "HS" },
];

export const balance = 24582.1;

export const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
