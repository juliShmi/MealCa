function RecipeLibraryItem({ recipe, onSelect }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('recipeId', recipe.id);
    e.dataTransfer.setData('itemToken', `recipe:${recipe.id}`);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect?.(recipe)}
      style={{
        border: '1px solid #ccc',
        padding: '6px',
        marginBottom: '4px',
        cursor: 'grab',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {recipe.name}
        </span>
        {recipe.__kind === 'saved' && (
          <span style={{ fontSize: 11, opacity: 0.8, border: '1px solid #ddd', padding: '1px 6px', borderRadius: 999 }}>
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
export default RecipeLibraryItem;
