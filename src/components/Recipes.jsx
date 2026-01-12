import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState(["Meat", "Fish / Seafood", "Pasta", "Soups", "Salads", "Snacks / Sandwiches", "Desserts / Sweets", "Vegetarian / Vegan", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Italian", "French", "Asian / Chinese / Japanese", "Mexican", "Home / Traditional"]);

  const deleteRecipe = (id) => setRecipes(prev => prev.filter(r => r.id !== id));

  const addRecipe = (recipe) => {
    setRecipes(prev => [...prev, recipe]);
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
      </div>

      {/* nested routes */}
      <Routes>
        <Route index element={
          <RecipeList
            recipes={recipes}
            categories={categories}
            onDelete={deleteRecipe}
          />
        } />

        <Route
          path="new"
          element={
            <RecipeForm
              onCreate={addRecipe}
              categories={categories}
              onAddCategory={addCategory}
            />
          }
        />

        <Route
          path="edit/:id"
          element={
            <RecipeForm
              recipes={recipes}
              onUpdate={updateRecipe}
              categories={categories}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default Recipes;
