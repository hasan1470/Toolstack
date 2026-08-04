import type { MetadataRoute } from "next";
import { tools } from "../lib/tools";
export default function sitemap(): MetadataRoute.Sitemap { const base=process.env.NEXT_PUBLIC_SITE_URL || "https://toolstack.vercel.app"; return [{url:base,changeFrequency:"weekly",priority:1},...tools.map(tool=>({url:`${base}/tools/${tool.slug}`,changeFrequency:"monthly" as const,priority:.8}))]; }
