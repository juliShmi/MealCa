import CategoriesManager from "../components/categories/CategoriesManager";

function CategoriesPage({ categories, onAddCategory, onDeleteCategory, uncategorized }) {
  return (
    <div style={{ padding: 16 }}>
      <CategoriesManager
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
        protectedCategory={uncategorized}
      />
    </div>
  );
}

export default CategoriesPage;

