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
      {recipe.name}
    </div>
  );
}
export default RecipeLibraryItem;
