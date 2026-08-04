import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "toolstack.example";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const base = `${protocol}://${host}`;
  return {
    metadataBase: new URL(base),
    title: { default: "Toolstack", template: "%s · Toolstack" },
    description: "Private, fast browser utilities for everyday work.",
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title: "Toolstack — Everyday tools, ridiculously fast", description: "One private, fast utility belt for code, text, images and everyday work.", type: "website", images: [{ url: `${base}/og.png`, width: 1744, height: 916, alt: "Toolstack — Everyday tools. Ridiculously fast." }] },
    twitter: { card: "summary_large_image", title: "Toolstack — Everyday tools, ridiculously fast", description: "One private, fast utility belt for code, text, images and everyday work.", images: [`${base}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
