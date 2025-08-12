"use client";

import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'recipe-app-favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem(FAVORITES_KEY);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Failed to parse favorites from localStorage", error);
            setFavorites([]);
        }
    }, []);

    const updateFavorites = (newFavorites: number[]) => {
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    };

    const addFavorite = (id: number) => {
        if (!favorites.includes(id)) {
            const newFavorites = [...favorites, id];
            updateFavorites(newFavorites);
        }
    };

    const removeFavorite = (id: number) => {
        const newFavorites = favorites.filter(favId => favId !== id);
        updateFavorites(newFavorites);
    };

    const isFavorite = (id: number) => {
        return favorites.includes(id);
    };

    return { favorites, addFavorite, removeFavorite, isFavorite };
}
