import { Routes, Route, Navigate } from 'react-router-dom';
import { mockRecipes } from './mocks/mockRecipes'
import { mockCategories, UNCATEGORIZED } from './mocks/mockCategories'
import { mockUsers } from './mocks/mockUsers'
import { mockStickers } from './mocks/mockStickers'
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
  const [stickers, setStickers] = useState(mockStickers);
  const [currentUser] = useState(() => mockUsers[0]);

  const deleteRecipe = (id) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    setMealPlan(prev => {
      const cleaned = {};
      Object.keys(prev).forEach(date => {
        cleaned[date] = {};
        ['breakfast', 'lunch', 'dinner', 'snack'].forEach(meal => {
          const mealRecipes = prev[date]?.[meal] || [];
          cleaned[date][meal] = mealRecipes.filter((token) => {
            if (String(token) === `recipe:${id}`) return false;
            return true;
          });
        });
      });
      return cleaned;
    });
  };

  const addSticker = (sticker) => {
    setStickers((prev) => [...prev, sticker]);
  };

  const updateSticker = (updated) => {
    setStickers((prev) =>
      prev.map((n) => (String(n.id) === String(updated.id) ? { ...n, ...updated } : n)),
    );
  };

  const deleteSticker = (stickerId) => {
    setStickers((prev) => prev.filter((n) => String(n.id) !== String(stickerId)));
    setMealPlan((prev) => {
      const cleaned = {};
      Object.keys(prev).forEach((date) => {
        cleaned[date] = {};
        ['breakfast', 'lunch', 'dinner', 'snack'].forEach((meal) => {
          const arr = prev[date]?.[meal] || [];
          cleaned[date][meal] = arr.filter((token) => {
            const s = String(token);
            return s !== `sticker:${stickerId}` && s !== `note:${stickerId}`;
          });
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
    setRecipes((prev) =>
      prev.map((r) => {
        if (Array.isArray(r.categories)) {
          const nextCats = r.categories.filter((c) => c !== categoryName);
          return {
            ...r,
            categories: nextCats.length > 0 ? nextCats : [UNCATEGORIZED],
          };
        }

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
            categories={categories}
            stickers={stickers}
            onCreateSticker={addSticker}
            onUpdateSticker={updateSticker}
            onDeleteSticker={deleteSticker}
          />} />
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