import type { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "Toolstack — Everyday tools, ridiculously fast",
  description: "A fast, private collection of useful browser-based tools for text, code, images, security, color and time.",
};

export default function Home() { return <HomeClient />; }
