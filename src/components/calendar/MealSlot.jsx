function MealSlot({ date, meal, value, onDropRecipe, recipes, onRemoveRecipe, onMoveRecipe }) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resolveLabel = (id) => {
    const recipe = recipes?.find(r => r.id === id);
    return recipe.name;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const recipeId = e.dataTransfer.getData('recipeId');
    if (!recipeId) return;

    const fromDate = e.dataTransfer.getData('fromDate');
    const fromMeal = e.dataTransfer.getData('fromMeal');

    if (fromDate && fromMeal) {
      onMoveRecipe(fromDate, fromMeal, date, meal, recipeId);
    } else {
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
        minHeight: '30px'
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: '10px' }}>{meal}</div>
      {items.length > 0 ? (
        <div style={{ fontSize: '16px' }}>
          {items.map((x, idx) => (
            <div key={`${x}-${idx}`}
              draggable
              onDragStart={(e) => handleItemDragStart(e, x)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #000',
                borderRadius: '6px',
                padding: '6px 10px',
                marginBottom: '4px'
              }}>
              {resolveLabel(x)}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  aria-hidden="true"
                  title="Drag to move"
                  style={{ cursor: 'grab', userSelect: 'none' }}
                >
                  ⋮⋮
                </span>
                <button
                  onClick={() => onRemoveRecipe(date, meal, x)}
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
    </div>
  );
}
export default MealSlot;