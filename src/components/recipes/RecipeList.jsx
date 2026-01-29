import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import ActiveRecipe from './ActiveRecipe';


function RecipeList({
  recipes,
  categories,
  onDelete,
  onUpdateSavedRecipe,
  onDeleteSavedRecipe,
  currentUser,
  likesByKey,
  onToggleLike,
  signatureDishRecipeId,
  onSetSignatureDish,
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openByCategory, setOpenByCategory] = useState(() => ({}));
  const [activeRecipeId, setActiveRecipeId] = useState(null);

  useEffect(() => {
    const selected = searchParams.get('selected');
    setActiveRecipeId(selected ? String(selected) : null);
  }, [searchParams]);

  const activeRecipe = useMemo(() => {
    if (!activeRecipeId) return null;
    return (recipes ?? []).find((r) => String(r.id) === String(activeRecipeId)) ?? null;
  }, [recipes, activeRecipeId]);

  const categoriesWithCounts = useMemo(() => {
    return categories.map((cat) => ({
      cat,
      recipes: recipes.filter((r) => (r.categories ?? []).includes(cat)),
    }));
  }, [categories, recipes]);

  const getLikeCount = (recipe) => {
    const key = `${String(recipe.authorId)}:${String(recipe.id)}`;
    return likesByKey?.get?.(key)?.size ?? 0;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      {/* Left: categories + recipe names */}
      <div style={{ flex: '1 1 520px', minWidth: 0 }}>
        <h1>My Recipes</h1>
        <div className="recipe-list" style={{
          display: 'grid',
          gridTemplateColumns: activeRecipe
            ? 'repeat(2, minmax(240px, 1fr))'
            : 'repeat(auto-fill, minmax(300px, 1fr))',
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
                      [cat]: !(prev[cat] ?? false),
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
                  <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {filtered.map((r) => {
                      const isActive = String(r.id) === String(activeRecipeId);
                      const likeCount =
                        r.__kind === "own" ? getLikeCount(r) : null;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSearchParams({ selected: String(r.id) })}
                          style={{
                            textAlign: 'left',
                            width: '100%',
                            padding: '10px 12px',
                            borderRadius: 10,
                            border: isActive ? '2px solid #111' : '1px solid #ddd',
                            background: isActive ? '#f7f7f7' : '#fff',
                            cursor: 'pointer',
                            fontWeight: 700,
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                            <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {r.name}
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
                              {typeof likeCount === "number" && (
                                <span style={{ fontSize: 12, opacity: 0.8 }}>♥ {likeCount}</span>
                              )}
                              {r.__kind === 'saved' && (
                                <span
                                  style={{
                                    fontSize: 12,
                                    padding: '2px 8px',
                                    borderRadius: 999,
                                    border: '1px solid #ddd',
                                    background: '#fff',
                                    opacity: 0.9,
                                  }}
                                >
                                  Saved
                                </span>
                              )}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ActiveRecipe
        recipe={activeRecipe}
        onClose={() => setSearchParams({})}
        categories={categories}
        currentUserId={currentUser?.id}
        likesByKey={likesByKey}
        onToggleLike={onToggleLike}
        signatureDishRecipeId={signatureDishRecipeId}
        onSetSignatureDish={onSetSignatureDish}
        onEdit={
          activeRecipe?.__kind === 'own'
            ? () => navigate(`/recipes/edit/${activeRecipe.id}`)
            : undefined
        }
        onDelete={
          activeRecipe?.__kind === 'own'
            ? () => {
              onDelete?.(activeRecipe.id);
              setSearchParams({});
            }
            : undefined
        }
        onUpdateSavedRecipe={onUpdateSavedRecipe}
        onDeleteSavedRecipe={(id) => {
          onDeleteSavedRecipe?.(id);
          setSearchParams({});
        }}
      />
    </div>
  );
}

export default RecipeList;
