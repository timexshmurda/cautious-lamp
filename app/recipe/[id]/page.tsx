"use client";

import React from "react";
import { getRecipe } from "../../../lib/recipes";
import { useFavorites } from "../../../lib/hooks/useFavorites";

export default function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params); // ✅ unwrap the params Promise
  const recipeId = parseInt(id, 10);

  const recipe = getRecipe(recipeId);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  if (!recipe) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold">Recipe not found</h1>
      </main>
    );
  }

  const handleFavoriteClick = () => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe.id);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex-grow">
            <h1 className="text-5xl font-bold">{recipe.title}</h1>
            <p className="mt-2 text-lg text-blue-500 dark:text-blue-400">{recipe.cuisine}</p>
          </div>
          <button
            onClick={handleFavoriteClick}
            className={`p-2 px-4 rounded-lg text-white text-sm sm:text-base whitespace-nowrap transition-colors ${
              isFavorite(recipe.id)
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isFavorite(recipe.id) ? "Remove Favorite" : "Add Favorite"}
          </button>
        </div>
        <div className="mt-8 max-w-3xl text-left">
          <h2 className="text-3xl font-semibold">Instructions</h2>
          <div className="mt-4 p-6 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="whitespace-pre-line leading-relaxed text-gray-800 dark:text-gray-200">
              {recipe.instructions}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
