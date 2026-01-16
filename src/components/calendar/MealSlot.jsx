function MealSlot({ date, meal, value, onDropRecipe, recipes, onRemoveRecipe }) {
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
    onDropRecipe(date, meal, recipeId);
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
              <button
                onClick={() => onRemoveRecipe(date, meal, x)}
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              >
                ✕
              </button></div>

          ))}
        </div>
      ) : (
        <em>Add</em>
      )}
    </div>
  );
}
export default MealSlot;