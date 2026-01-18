import CategoryAccordion from './CategoryAccordion';

function RecipeLibrary({ recipes, categories }) {
  return (
    <div
      style={{
        padding: '16px',
        borderLeft: '1px solid #ccc',
        minWidth: 0,
        maxHeight: 'calc(100vh - 140px)',
        overflowY: 'auto',
      }}
    >
      <h2>Recipes</h2>

      {categories.map((cat) => (
        <CategoryAccordion
          key={cat}
          category={cat}
          recipes={recipes.filter(r => (r.categories ?? []).includes(cat))}
        />
      ))}
    </div>
  );
}

export default RecipeLibrary;
