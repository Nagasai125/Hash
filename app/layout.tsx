import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "# Smoke Shop | North Austin",
  description:
    "North Austin smoke shop for vapes, cigars, glass, hookah, and everyday essentials at 10014 N Lamar Blvd.",
  icons: {
    icon: `${basePath}/man-logo-mark.svg`,
    apple: `${basePath}/man-logo-mark.png`,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href={`${basePath}/man-logo-mark.svg`} as="image" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
