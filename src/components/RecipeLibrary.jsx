import CategoryAccordion from './CategoryAccordion';

function RecipeLibrary({ recipes, categories }) {
  return (
    <div
      style={{
        width: '40%',
        padding: '16px',
        borderLeft: '1px solid #ccc',
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
