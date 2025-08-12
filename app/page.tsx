"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setRecipe(null);
    setError(null);

    try {
      const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error("Failed to fetch recipe");

      const data = await res.json();
      setRecipe(data.result); // `result` matches backend response key
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold mb-6">AI Recipe Finder</h1>
      <div className="flex w-full max-w-lg gap-2">
        <input
          className="flex-1 p-3 rounded-xl text-black"
          placeholder="Search for any recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      {error && <p className="text-red-400 mt-4">{error}</p>}
      {recipe && (
        <div className="mt-6 max-w-2xl text-left whitespace-pre-wrap">
          {recipe}
        </div>
      )}
    </main>
  );
}

