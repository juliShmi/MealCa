import { useState } from 'react';
import CategoryHeader from './CategoryHeader';
import RecipeLibraryItem from './RecipeLibraryItem';

function CategoryAccordion({ category, recipes }) {
  const [open, setOpen] = useState(false);

  if (recipes.length === 0) return null;

  return (
    <div style={{ marginBottom: '12px' }}>
      <CategoryHeader
        title={category}
        open={open}
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div style={{ marginLeft: '12px', marginTop: '6px' }}>
          {recipes.map((recipe) => (
            <RecipeLibraryItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryAccordion;
