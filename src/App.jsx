import { Routes, Route, Navigate } from 'react-router-dom';
import { mockRecipes } from './mocks/mockRecipes'
import { mockCategories } from './mocks/mockCategories'
import { useState } from 'react';
import Layout from './components/Layout';
import CalendarPage from './pages/CalendarPage';
import RecipesPage from './pages/RecipesPage';

function App() {
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState(mockRecipes);
  const [categories, setCategories] = useState(mockCategories);

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

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/recipes" />} />
          {<Route path="/recipes/*" element={<RecipesPage
            recipes={recipes}
            setRecipes={setRecipes}
            categories={categories}
            setCategories={setCategories}
            onDelete={deleteRecipe} />
          }
          />}
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