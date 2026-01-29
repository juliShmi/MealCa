import Recipes from "../components/recipes/Recipes";

function RecipesPage({
  recipes,
  ownRecipes,
  setRecipes,
  onUpdateSavedRecipe,
  onDeleteSavedRecipe,
  users,
  categories,
  setCategories,
  onDelete,
  currentUser,
  likesByKey,
  onToggleLike,
  signatureDishRecipeId,
  onSetSignatureDish,
}) {

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
    editRecipes={ownRecipes}
    onUpdateSavedRecipe={onUpdateSavedRecipe}
    onDeleteSavedRecipe={onDeleteSavedRecipe}
    users={users}
    categories={categories}
    onCreate={addRecipe}
    onUpdate={updateRecipe}
    onDelete={onDelete}
    onAddCategory={addCategory}
    currentUser={currentUser}
    likesByKey={likesByKey}
    onToggleLike={onToggleLike}
    signatureDishRecipeId={signatureDishRecipeId}
    onSetSignatureDish={onSetSignatureDish}
  ></Recipes>
}
export default RecipesPage;