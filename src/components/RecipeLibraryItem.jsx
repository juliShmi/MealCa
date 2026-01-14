function RecipeLibraryItem({ recipe }) {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('recipeId', recipe.id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        border: '1px solid #ccc',
        padding: '6px',
        marginBottom: '4px',
        cursor: 'grab'
      }}
    >
      {recipe.name}
    </div>
  );
}
export default RecipeLibraryItem;
