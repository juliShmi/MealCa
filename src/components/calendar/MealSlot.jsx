import { useMemo, useState } from 'react';
import RecipeModal from './RecipeModal';

function MealSlot({ date, meal, value, onDropRecipe, recipes, stickers, onRemoveRecipe, onMoveRecipe }) {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  const recipesById = useMemo(() => {
    const map = new Map();
    (recipes ?? []).forEach((r) => map.set(String(r.id), r));
    return map;
  }, [recipes]);

  const stickersById = useMemo(() => {
    const map = new Map();
    (stickers ?? []).forEach((n) => map.set(String(n.id), n));
    return map;
  }, [stickers]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRecipeId, setActiveRecipeId] = useState(null);

  const activeRecipe = activeRecipeId ? recipesById.get(activeRecipeId) : null;

  const openRecipe = (id) => {
    setActiveRecipeId(String(id));
    setIsModalOpen(true);
  };

  const closeRecipe = () => {
    setIsModalOpen(false);
    setActiveRecipeId(null);
  };

  const parseToken = (token) => {
    const s = String(token);
    if (s.startsWith('sticker:')) return { type: 'sticker', id: s.slice('sticker:'.length) };
    if (s.startsWith('note:')) return { type: 'sticker', id: s.slice('note:'.length) }; // backward compat
    if (s.startsWith('recipe:')) return { type: 'recipe', id: s.slice('recipe:'.length) };
    return { type: 'recipe', id: s }; // backward compatibility
  };

  const resolveLabel = (token) => {
    const { type, id } = parseToken(token);
    if (type === 'sticker') {
      const sticker = stickersById.get(String(id));
      return sticker?.text ?? 'Sticker';
    }
    const recipe = recipesById.get(String(id));
    return recipe?.name ?? String(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const itemToken = e.dataTransfer.getData('itemToken');
    const recipeId = e.dataTransfer.getData('recipeId');
    const incoming = itemToken || (recipeId ? `recipe:${recipeId}` : '');
    if (!incoming) return;

    const fromDate = e.dataTransfer.getData('fromDate');
    const fromMeal = e.dataTransfer.getData('fromMeal');

    if (fromDate && fromMeal && typeof onMoveRecipe === 'function') {
      onMoveRecipe(fromDate, fromMeal, date, meal, incoming);
      return;
    }

    if (typeof onDropRecipe === 'function') {
      onDropRecipe(date, meal, incoming);
    }
  };

  const handleItemDragStart = (e, token) => {
    const resolved = String(token).includes(':') ? String(token) : `recipe:${token}`;
    e.dataTransfer.setData('itemToken', resolved);
    e.dataTransfer.setData('fromDate', date);
    e.dataTransfer.setData('fromMeal', meal);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        border: '1px dashed #aaa',
        padding: '8px',
        marginBottom: '6px',
        minHeight: '30px',
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '10px' }}>{meal}</div>

      {items.length > 0 ? (
        <div style={{ fontSize: '16px' }}>
          {items.map((x, idx) => (
            (() => {
              const { type, id } = parseToken(x);
              const isSticker = type === 'sticker';
              const sticker = isSticker ? stickersById.get(String(id)) : null;
              const bg = isSticker ? (sticker?.color ?? '#FFF7CC') : '#fff';
              const border = isSticker ? '1px solid rgba(0,0,0,0.15)' : '1px solid #000';

              return (
                <div
                  key={`${x}-${idx}`}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, x)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    border,
                    borderRadius: '6px',
                    padding: '6px 10px',
                    marginBottom: '4px',
                    background: bg,
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {isSticker && <span aria-hidden="true">🏷️</span>}
                    {resolveLabel(x)}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {!isSticker && (
                      <button
                        type="button"
                        onClick={() => openRecipe(id)}
                        style={{ cursor: 'pointer' }}
                        aria-label="View recipe"
                        title="View"
                      >
                        👁️
                      </button>
                    )}

                    <span
                      aria-hidden="true"
                      title="Drag to move"
                      style={{ cursor: 'grab', userSelect: 'none' }}
                    >
                      ⋮⋮
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemoveRecipe?.(date, meal, x)}
                      style={{ cursor: 'pointer' }}
                      aria-label="Remove from slot"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })()
          ))}
        </div>
      ) : (
        <em>Add</em>
      )}

      <RecipeModal isOpen={isModalOpen} recipe={activeRecipe} onClose={closeRecipe} />
    </div>
  );
}

export default MealSlot;