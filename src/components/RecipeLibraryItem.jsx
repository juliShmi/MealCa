function RecipeLibraryItem({ recipe }) {
  return (
    <div
      style={{
        padding: '4px 0',
        cursor: 'grab',
      }}
    >
      {recipe.name}
    </div>
  );
}

export default RecipeLibraryItem;
