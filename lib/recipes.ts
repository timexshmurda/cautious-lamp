export const mockRecipes = [
  { id: 1, title: "Spaghetti Carbonara", cuisine: "Italian", instructions: "1. Cook pasta.\n2. Fry bacon.\n3. Mix eggs and cheese.\n4. Combine all." },
  { id: 2, title: "Chicken Tikka Masala", cuisine: "Indian", instructions: "1. Marinate chicken.\n2. Grill chicken.\n3. Make sauce.\n4. Combine." },
  { id: 3, title: "Pancakes", cuisine: "American", instructions: "1. Mix flour, eggs, milk.\n2. Cook on a pan." },
  { id: 4, title: "Sushi", cuisine: "Japanese", instructions: "1. Prepare rice.\n2. Add fish and other ingredients.\n3. Roll." },
  { id: 5, title: "Tacos", cuisine: "Mexican", instructions: "1. Cook meat.\n2. Prepare toppings.\n3. Assemble tacos." },
];

export function getRecipe(id: number) {
  return mockRecipes.find(recipe => recipe.id === id);
}

export function getCuisines() {
    const cuisines = mockRecipes.map(recipe => recipe.cuisine);
    return [...new Set(cuisines)];
}

export function searchRecipes(query: string) {
    if (!query) {
        return mockRecipes;
    }
    return mockRecipes.filter(recipe => recipe.title.toLowerCase().includes(query.toLowerCase()));
}
