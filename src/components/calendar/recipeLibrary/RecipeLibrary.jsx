import CategoryAccordion from './CategoryAccordion';
import { useMemo, useState } from 'react';

function RecipeLibrary({ recipes, categories }) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const filteredRecipes = useMemo(() => {
    if (!normalizedQuery) return recipes ?? [];
    return (recipes ?? []).filter((r) =>
      String(r?.name ?? '').toLowerCase().includes(normalizedQuery),
    );
  }, [recipes, normalizedQuery]);

  const hasMatches = filteredRecipes.length > 0;

  return (
    <div
      style={{
        padding: '16px',
        borderLeft: '1px solid #ccc',
        minWidth: 0,
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
      }}
    >
      <h2>Recipes</h2>

      <div style={{ position: 'relative', marginBottom: 12 }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: normalizedQuery ? '8px 34px 8px 10px' : '8px 10px',
            border: '1px solid #ccc',
            borderRadius: 10,
          }}
        />

        {normalizedQuery && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            title="Clear"
            style={{
              position: 'absolute',
              right: 6,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 26,
              height: 26,
              borderRadius: 999,
              border: '1px solid #ddd',
              background: '#fff',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        )}
      </div>

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
          onSelectRecipe={(recipe) => setQuery(String(recipe?.name ?? ''))}
        />
      ))}
    </div>
  );
}

export default RecipeLibrary;
