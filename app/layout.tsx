import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "# Smoke Shop | North Austin",
  description:
    "North Austin smoke shop for vapes, cigars, glass, hookah, and everyday essentials at 10014 N Lamar Blvd.",
  icons: {
    icon: "/man-logo-mark.svg",
    apple: "/man-logo-mark.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
