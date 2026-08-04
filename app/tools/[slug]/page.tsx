import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ToolWorkspace from "../../../components/ToolWorkspace";
import { getTool, tools } from "../../../lib/tools";

export function generateStaticParams() { return tools.map(tool => ({ slug: tool.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const tool = getTool(slug); return tool ? { title: tool.name, description: tool.description } : {}; }
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const tool = getTool(slug); if (!tool) notFound(); return <ToolWorkspace tool={tool} />; }
