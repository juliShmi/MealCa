import { Routes, Route, Navigate } from 'react-router-dom';
import { mockRecipes } from './mockRecipes'
import { useState } from 'react';
import Recipes from './components/Recipes';
import Layout from './components/Layout';
import CalendarPage from './pages/CalendarPage';

function App() {
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState(mockRecipes);
  const [categories, setCategories] = useState(["Meat", "Fish / Seafood", "Pasta", "Soups", "Salads", "Snacks / Sandwiches", "Desserts / Sweets", "Vegetarian / Vegan", "Breakfast", "Lunch", "Dinner", "Snack", "Dessert", "Italian", "French", "Asian / Chinese / Japanese", "Mexican", "Home / Traditional"]);

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    setMealPlan(prev => {
      const cleaned = {};
      Object.keys(prev).forEach(date => {
        cleaned[date] = {};
        ['breakfast', 'lunch', 'dinner', 'snack'].forEach(meal => {
          const mealRecipes = prev[date]?.[meal] || [];
          cleaned[date][meal] = mealRecipes.filter(recipeId => recipeId !== id);
        });
      });
      return cleaned;
    });
  };

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
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/recipes" />} />
          <Route path="/recipes/*" element={<Recipes
            recipes={recipes}
            categories={categories}
            onCreate={addRecipe}
            onUpdate={updateRecipe}
            onDelete={deleteRecipe}
            onAddCategory={addCategory}
          />} />
          <Route path="/calendar" element={<CalendarPage
            mealPlan={mealPlan}
            setMealPlan={setMealPlan}
            recipes={recipes}
            categories={categories} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;