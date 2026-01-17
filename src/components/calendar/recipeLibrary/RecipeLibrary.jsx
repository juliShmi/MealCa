import CategoryAccordion from './CategoryAccordion';

function RecipeLibrary({ recipes, categories }) {
  return (
    <div
      style={{
        padding: '16px',
        borderLeft: '1px solid #ccc',
        // Prevent long content from pushing outside its column
        minWidth: 0,
        // Keep the library usable when calendar is tall
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
      }}
    >
      <h2>Recipes</h2>

      {categories.map((cat) => (
        <CategoryAccordion
          key={cat}
          category={cat}
          recipes={recipes.filter(r => r.category === cat)}
        />
      ))}
    </div>
  );
}

export default RecipeLibrary;
