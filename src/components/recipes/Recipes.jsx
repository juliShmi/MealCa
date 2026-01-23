import { Routes, Route, Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';

function Recipes({
  recipes,
  editRecipes,
  categories,
  savedRecipes,
  onUpdateSavedRecipe,
  onDeleteSavedRecipe,
  onCreate,
  onUpdate,
  onDelete,
  onAddCategory,
}) {

  return (
    <div>
      {/* navigation */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/recipes">
          <button>My Recipes</button>
        </Link>
        <Link to="/recipes/new" style={{ marginLeft: '10px' }}>
          <button>Add New Recipe</button>
        </Link>
        <Link to="/categories" style={{ marginLeft: '10px' }}>
          <button>Manage Categories</button>
        </Link>
      </div>

      {/* nested routes */}
      <Routes>
        <Route index element={
          <RecipeList
            recipes={recipes}
            categories={categories}
            onDelete={onDelete}
            savedRecipes={savedRecipes}
            onUpdateSavedRecipe={onUpdateSavedRecipe}
            onDeleteSavedRecipe={onDeleteSavedRecipe}
          />
        } />

        <Route
          path="new"
          element={
            <RecipeForm
              onCreate={onCreate}
              categories={categories}
              onAddCategory={onAddCategory}
            />
          }
        />

        <Route
          path="edit/:id"
          element={
            <RecipeForm
              recipes={editRecipes ?? recipes}
              onUpdate={onUpdate}
              categories={categories}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Recipes;
