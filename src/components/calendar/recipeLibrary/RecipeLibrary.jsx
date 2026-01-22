import CategoryAccordion from './CategoryAccordion';
import { useMemo } from 'react';

function RecipeLibrary({ recipes, categories, query, onQueryChange }) {
  const normalizedQuery = String(query ?? '').trim().toLowerCase();

  const filteredRecipes = useMemo(() => {
    if (!normalizedQuery) return recipes ?? [];
    return (recipes ?? []).filter((r) =>
      String(r?.name ?? '').toLowerCase().includes(normalizedQuery),
    );
  }, [recipes, normalizedQuery]);

  const hasMatches = filteredRecipes.length > 0;

  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 900, marginBottom: 10 }}>Recipes</div>
      {normalizedQuery && !hasMatches && (
        <div style={{ opacity: 0.7, fontSize: 14, marginBottom: 12 }}>
          No recipes found.
        </div>
      )}

      {categories.map((cat) => (
        <CategoryAccordion
          key={cat}
          category={cat}
          autoOpen={Boolean(normalizedQuery)}
          recipes={filteredRecipes.filter((r) => (r.categories ?? []).includes(cat))}
          onSelectRecipe={(recipe) => onQueryChange?.(String(recipe?.name ?? ''))}
        />
      ))}
    </div>
  );
}

export default RecipeLibrary;
