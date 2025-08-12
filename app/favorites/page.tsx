"use client";

import Link from 'next/link';
import { useFavorites } from '../../lib/hooks/useFavorites';
import { mockRecipes } from '../../lib/recipes';

export default function FavoritesPage() {
    const { favorites } = useFavorites();
    const favoriteRecipes = mockRecipes.filter(recipe => favorites.includes(recipe.id));

    return (
        <main className="flex min-h-screen flex-col items-center p-12 md:p-24">
            <h1 className="text-5xl font-bold">Your Favorite Recipes</h1>
            {favoriteRecipes.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
                    {favoriteRecipes.map(recipe => (
                        <Link href={`/recipe/${recipe.id}`} key={recipe.id}>
                            <div className="rounded-lg border p-6 h-full cursor-pointer bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200">
                                <h2 className="text-xl font-semibold">{recipe.title}</h2>
                                <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">{recipe.cuisine}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className="mt-8 text-lg text-gray-600 dark:text-gray-400">You have no favorite recipes yet. Go find some!</p>
            )}
        </main>
    );
}
