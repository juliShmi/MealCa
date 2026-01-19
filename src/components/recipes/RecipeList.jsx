import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';


function RecipeList({ recipes, categories, onDelete }) {
  const navigate = useNavigate();
  const [openByCategory, setOpenByCategory] = useState(() => ({}));

  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => ({
      cat,
      recipes: recipes.filter((r) => (r.categories ?? []).includes(cat)),
    }));
  }, [categories, recipes]);

  return (
    <div>
      <h1>My Recipes</h1>
      <div className="recipe-list" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {categoriesWithCounts.map(({ cat, recipes: filtered }, idx) => {
          if (filtered.length === 0) return null;

          const isOpen = openByCategory[cat] ?? false;

          return (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() =>
                  setOpenByCategory((prev) => ({
                    ...prev,
                    [cat]: !(prev[cat] ?? true),
                  }))
                }
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                  padding: '10px 12px',
                  border: '1px solid #ddd',
                  borderRadius: 10,
                  background: '#fff',
                  cursor: 'pointer',
                }}
                aria-expanded={isOpen}
              >
                <span style={{ fontWeight: 800 }}>{cat}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ opacity: 0.7, fontSize: 12 }}>{filtered.length}</span>
                  <span aria-hidden="true">{isOpen ? '▾' : '▸'}</span>
                </span>
              </button>

              {isOpen && (
                <div style={{ marginTop: 10 }}>
                  {filtered.map((r) => (
                    <div key={r.id} style={{ marginBottom: '10px' }}>
                      <RecipeCard
                        title={r.name}
                        time={r.time}
                        ingredients={r.ingredients}
                        actions={
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <button onClick={() => navigate(`/recipes/edit/${r.id}`)}>
                              ✏️
                            </button>
                            <button onClick={() => onDelete(r.id)}>
                              🗑️
                            </button>
                          </div>
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeList;
