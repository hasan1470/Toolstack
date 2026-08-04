"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories, tools } from "../lib/tools";

const FAVORITES_KEY = "toolstack:favorites";
const RECENT_KEY = "toolstack:recent";

function readList(key: string) {
  try { return JSON.parse(localStorage.getItem(key) || "[]") as string[]; } catch { return []; }
}

export default function HomeClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [dark, setDark] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("toolstack:theme");
    const useDark = saved ? saved === "dark" : true;
    queueMicrotask(() => {
      setFavorites(readList(FAVORITES_KEY));
      setRecent(readList(RECENT_KEY));
      setDark(useDark);
    });
    document.documentElement.dataset.theme = useDark ? "dark" : "light";
    const onKey = (event: KeyboardEvent) => {
      if ((event.key === "/" || (event.ctrlKey && event.key.toLowerCase() === "k")) && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault(); searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => tools.filter((tool) => {
    const matchesCategory = category === "All" || tool.category === category;
    const haystack = `${tool.name} ${tool.description} ${tool.tags.join(" ")}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase()) && (!showFavorites || favorites.includes(tool.slug));
  }), [category, query, favorites, showFavorites]);

  const recentTools = recent.map((slug) => tools.find((tool) => tool.slug === slug)).filter(Boolean).slice(0, 4);

  function toggleFavorite(slug: string) {
    const next = favorites.includes(slug) ? favorites.filter((item) => item !== slug) : [slug, ...favorites];
    setFavorites(next); localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }

  function toggleTheme() {
    const next = !dark; setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("toolstack:theme", next ? "dark" : "light");
  }

  return (
    <main>
      <header className="nav shell">
        <Link className="brand" href="/" aria-label="Toolstack home"><span className="brand-mark">T</span><span>toolstack</span></Link>
        <nav className="nav-links" aria-label="Main navigation"><a href="#tools">All tools</a><a href="#why">Why Toolstack</a></nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label={`Switch to ${dark ? "light" : "dark"} theme`}>{dark ? "☼" : "☾"}</button>
          <a className="button button-small" href="#tools">Open toolbox <span>↗</span></a>
        </div>
      </header>

      <section className="hero shell">
        <div className="eyebrow"><span className="pulse" /> 14 tools · zero uploads · always free</div>
        <h1>Your everyday tools.<br/><em>Ridiculously fast.</em></h1>
        <p className="hero-copy">A focused collection of private, browser-based utilities for developers, creators, and everyone who wants to get small things done.</p>
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search tools" placeholder="What do you need to do?" />
          <kbd>Ctrl K</kbd>
        </div>
        <div className="quick-links"><span>Try</span>{tools.filter(t => t.popular).slice(0, 4).map(tool => <Link key={tool.slug} href={`/tools/${tool.slug}`}>{tool.name}</Link>)}</div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div><strong>100%</strong><span>Browser-based</span></div>
          <div><strong>0</strong><span>Files uploaded</span></div>
          <div><strong>∞</strong><span>Daily usage</span></div>
          <div><strong>⌁</strong><span>No signup</span></div>
        </div>
      </section>

      <section className="tools-section shell" id="tools">
        <div className="section-heading">
          <div><span className="section-number">01</span><h2>Pick a tool.<br/>Get it done.</h2></div>
          <p>Everything runs locally on your device whenever possible. No waiting, no accounts, no nonsense.</p>
        </div>

        {recentTools.length > 0 && !query && category === "All" && !showFavorites && (
          <div className="recent-row"><span>Recently used</span>{recentTools.map(tool => tool && <Link key={tool.slug} href={`/tools/${tool.slug}`}>{tool.icon} {tool.name}</Link>)}</div>
        )}

        <div className="filter-bar">
          <div className="filters" role="group" aria-label="Filter tools by category">
            {categories.map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>)}
          </div>
          <button className={`favorites-toggle ${showFavorites ? "active" : ""}`} onClick={() => setShowFavorites(!showFavorites)}>★ Favorites <span>{favorites.length}</span></button>
        </div>

        <div className="tool-grid">
          {filtered.map((tool, index) => (
            <article className={`tool-card accent-${tool.accent}`} key={tool.slug} style={{ "--delay": `${index * 35}ms` } as React.CSSProperties}>
              <div className="card-top"><span className="tool-icon">{tool.icon}</span><button onClick={() => toggleFavorite(tool.slug)} className={favorites.includes(tool.slug) ? "star saved" : "star"} aria-label={`${favorites.includes(tool.slug) ? "Remove" : "Add"} ${tool.name} ${favorites.includes(tool.slug) ? "from" : "to"} favorites`}>★</button></div>
              <div className="badges">{tool.popular && <span>Popular</span>}{tool.new && <span className="new-badge">New</span>}<small>{tool.category}</small></div>
              <h3>{tool.name}</h3><p>{tool.description}</p>
              <Link href={`/tools/${tool.slug}`} className="card-link">Open tool <span>→</span></Link>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <div className="empty"><span>⌕</span><h3>No tool found</h3><p>Try a different keyword or category.</p><button onClick={() => { setQuery(""); setCategory("All"); setShowFavorites(false); }}>Reset filters</button></div>}
      </section>

      <section className="why shell" id="why">
        <div className="why-intro"><span className="section-number">02</span><h2>Small tools.<br/><em>Big standards.</em></h2><p>Utility websites shouldn&apos;t feel like an obstacle course. Toolstack is designed around speed, clarity, and your privacy.</p></div>
        <div className="principles">
          <article><span>01</span><div><h3>Private by design</h3><p>Your files and text stay in your browser. We don&apos;t need to see them to help you.</p></div></article>
          <article><span>02</span><div><h3>Instant by default</h3><p>No signups, artificial limits, or loading screens between you and the result.</p></div></article>
          <article><span>03</span><div><h3>Made for real work</h3><p>Keyboard friendly, responsive, accessible, and ready when your deadline is close.</p></div></article>
        </div>
      </section>

      <section className="cta shell"><div><span className="eyebrow">Your new utility belt</span><h2>One bookmark.<br/>Dozens of solutions.</h2></div><a className="button button-light" href="#tools">Explore every tool <span>↗</span></a></section>
      <footer className="footer shell"><Link className="brand" href="/"><span className="brand-mark">T</span><span>toolstack</span></Link><p>Useful things, thoughtfully made.</p><div><a href="#tools">Tools</a><a href="#why">Privacy</a><span>© 2026</span></div></footer>
    </main>
  );
}
