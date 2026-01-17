import { useMemo, useState } from 'react';
import RecipeModal from './RecipeModal';

function MealSlot({ date, meal, value, onDropRecipe, recipes, onRemoveRecipe, onMoveRecipe }) {
  const items = Array.isArray(value) ? value : value ? [value] : [];

  const recipesById = useMemo(() => {
    const map = new Map();
    (recipes ?? []).forEach((r) => map.set(String(r.id), r));
    return map;
  }, [recipes]);

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

  const resolveLabel = (id) => {
    const recipe = recipesById.get(String(id));
    return recipe?.name ?? String(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const recipeId = e.dataTransfer.getData('recipeId');
    if (!recipeId) return;

    const fromDate = e.dataTransfer.getData('fromDate');
    const fromMeal = e.dataTransfer.getData('fromMeal');

    if (fromDate && fromMeal && typeof onMoveRecipe === 'function') {
      onMoveRecipe(fromDate, fromMeal, date, meal, recipeId);
      return;
    }

    if (typeof onDropRecipe === 'function') {
      onDropRecipe(date, meal, recipeId);
    }
  };

  const handleItemDragStart = (e, recipeId) => {
    e.dataTransfer.setData('recipeId', recipeId);
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
            <div
              key={`${x}-${idx}`}
              draggable
              onDragStart={(e) => handleItemDragStart(e, x)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #000',
                borderRadius: '6px',
                padding: '6px 10px',
                marginBottom: '4px',
              }}
            >
              <span>{resolveLabel(x)}</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => openRecipe(x)}
                  style={{ cursor: 'pointer' }}
                  aria-label="View recipe"
                  title="View"
                >
                  👁️
                </button>

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