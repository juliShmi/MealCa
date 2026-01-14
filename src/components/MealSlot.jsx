function MealSlot({ date, meal, value, onDropRecipe, recipes }) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const resolveLabel = (id) => {
    const recipe = recipes?.find(r => r.id === id);
    return recipe ? recipe.name : id;
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
      <div style={{ fontWeight: 700, marginBottom: '6px' }}>{meal}</div>
      {items.length > 0 ? (
        <div style={{ fontSize: '12px' }}>
          {items.map((x, idx) => (
            <div key={`${x}-${idx}`}>{resolveLabel(x)}</div>
          ))}
        </div>
      ) : (
        <em>Empty</em>
      )}
    </div>
  );
}
export default MealSlot;