import type { Metadata } from "next";
import { siteUrl } from "../lib/site";
import "./globals.css";

export function generateMetadata(): Metadata {
  const base = siteUrl;
  return {
    metadataBase: new URL(base),
    title: { default: "Toolstack", template: "%s · Toolstack" },
    description: "Private, fast browser utilities for everyday work.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg", apple: "/apple-touch-icon.png" },
    openGraph: { title: "Toolstack — Everyday tools, ridiculously fast", description: "One private, fast utility belt for code, text, images and everyday work.", type: "website", images: [{ url: `${base}/og.png`, width: 1744, height: 916, alt: "Toolstack — Everyday tools. Ridiculously fast." }] },
    twitter: { card: "summary_large_image", title: "Toolstack — Everyday tools, ridiculously fast", description: "One private, fast utility belt for code, text, images and everyday work.", images: [`${base}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><body>{children}</body></html>;
}
