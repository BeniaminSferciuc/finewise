import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { TransactionSection, TransactionWithCategory } from "./types";

import {
  endOfMonth,
  endOfYear,
  format,
  isToday,
  isYesterday,
  parseISO,
  startOfMonth,
  startOfYear,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupTransactionsByDate = (
  transactions: TransactionWithCategory[]
): TransactionSection[] => {
  const groups: Record<string, TransactionWithCategory[]> = {};
  transactions.forEach((tx) => {
    const dateKey = tx.date;
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(tx);
  });
  return Object.keys(groups)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((dateKey) => {
      const date = parseISO(dateKey);
      let title = format(date, "MMMM d, yyyy");
      if (isToday(date)) title = "Today";
      else if (isYesterday(date)) title = "Yesterday";
      return { title, data: groups[dateKey] };
    });
};

export const getDateRange = (year: number, monthIndex: number | null) => {
  const date = new Date(year, monthIndex ?? 0, 1);
  if (monthIndex !== null) {
    return {
      start: format(startOfMonth(date), "yyyy-MM-dd"),
      end: format(endOfMonth(date), "yyyy-MM-dd"),
    };
  }
  return {
    start: format(startOfYear(date), "yyyy-MM-dd"),
    end: format(endOfYear(date), "yyyy-MM-dd"),
  };
};

export const formatDate = (date: Date) => {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const dateString = date.toLocaleDateString("ro-RO", {
    month: "short",
    day: "numeric",
  });
  return isToday ? `Azi, ${dateString}` : dateString;
};
