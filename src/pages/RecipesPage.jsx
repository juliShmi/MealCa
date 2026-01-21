import Recipes from "../components/recipes/Recipes";

function RecipesPage({ recipes, setRecipes, categories, setCategories, onDelete, currentUser }) {

  const addRecipe = (recipe) => {
    const authorId = currentUser?.id;
    setRecipes(prev => [
      ...prev,
      authorId ? { ...recipe, authorId } : recipe,
    ]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(prev =>
      prev.map(r => r.id === updatedRecipe.id ? updatedRecipe : r)
    );
  };

  const addCategory = (newCategory) => {
    setCategories(prev =>
      prev.includes(newCategory) ? prev : [...prev, newCategory]
    );
  };

  return <Recipes
    recipes={recipes}
    categories={categories}
    onCreate={addRecipe}
    onUpdate={updateRecipe}
    onDelete={onDelete}
    onAddCategory={addCategory}></Recipes>
}
export default RecipesPage;