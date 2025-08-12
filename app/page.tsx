"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { mockRecipes } from "../lib/recipes";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);

  const cuisines = Array.from(new Set(mockRecipes.map(r => r.cuisine)));

  useEffect(() => {
    let filteredRecipes = mockRecipes;

    if (selectedCuisine) {
      filteredRecipes = filteredRecipes.filter(
        (recipe) => recipe.cuisine === selectedCuisine
      );
    }

    if (query) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()));
    }

    setRecipes(filteredRecipes);
  }, [query, selectedCuisine]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-5xl font-bold text-center">Recipe Finder</h1>
      <p className="text-lg mt-2 text-gray-600 dark:text-gray-400">Your AI-powered recipe assistant</p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
        <form onSubmit={handleSearch} className="flex-grow">
          <input
            type="text"
            placeholder="Search for any recipe..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-4 text-black dark:text-white bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <div className="w-full sm:w-auto">
            <select
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="p-4 border rounded-lg text-black dark:text-white bg-white dark:bg-gray-800 dark:border-gray-600 w-full focus:ring-2 focus:ring-blue-500 outline-none"
            >
                <option value="">All Cuisines</option>
                {cuisines.map(cuisine => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
            </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {recipes.map((recipe) => (
          <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
            <div className="rounded-lg border p-6 h-full cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">{recipe.cuisine}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
