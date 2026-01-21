import { Routes, Route, Navigate } from 'react-router-dom';
import { mockRecipes } from './mocks/mockRecipes'
import { mockCategories, UNCATEGORIZED } from './mocks/mockCategories'
import { mockUsers } from './mocks/mockUsers'
import { useState } from 'react';
import Layout from './components/Layout';
import CalendarPage from './pages/CalendarPage';
import RecipesPage from './pages/RecipesPage';
import CategoriesPage from './pages/CategoriesPage';
import UserPage from './pages/UserPage';

function App() {
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState(mockRecipes);
  const [categories, setCategories] = useState(mockCategories);
  const [currentUser] = useState(() => mockUsers[0]);

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

  const addCategory = (newCategory) => {
    const name = (newCategory ?? '').trim();
    if (!name) return;
    setCategories((prev) => (prev.includes(name) ? prev : [...prev, name]));
  };

  const deleteCategory = (categoryName) => {
    if (!categoryName || categoryName === UNCATEGORIZED) return;

    setCategories((prev) => prev.filter((c) => c !== categoryName));

    // Remove the deleted category from recipes.
    // If recipe becomes uncategorized -> assign UNCATEGORIZED so it doesn't disappear from UI.
    setRecipes((prev) =>
      prev.map((r) => {
        if (Array.isArray(r.categories)) {
          const nextCats = r.categories.filter((c) => c !== categoryName);
          return {
            ...r,
            categories: nextCats.length > 0 ? nextCats : [UNCATEGORIZED],
          };
        }

        // Backward compatibility: old model category: string
        return {
          ...r,
          category: r.category === categoryName ? UNCATEGORIZED : r.category,
        };
      }),
    );
  };

  return (
    <>
      <Routes>
        <Route element={<Layout currentUser={currentUser} />}>
          <Route path="/" element={<Navigate to="/recipes" />} />
          {<Route path="/recipes/*" element={<RecipesPage
            recipes={recipes}
            setRecipes={setRecipes}
            categories={categories}
            setCategories={setCategories}
            onDelete={deleteRecipe}
            currentUser={currentUser}
          />
          }
          />}
          <Route path="/calendar" element={<CalendarPage
            mealPlan={mealPlan}
            setMealPlan={setMealPlan}
            recipes={recipes}
            categories={categories} />} />
          <Route
            path="/categories"
            element={
              <CategoriesPage
                categories={categories}
                onAddCategory={addCategory}
                onDeleteCategory={deleteCategory}
                uncategorized={UNCATEGORIZED}
              />
            }
          />
          <Route path="/user" element={<UserPage user={currentUser} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;