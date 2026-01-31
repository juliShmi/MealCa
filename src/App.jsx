import { Routes, Route, Navigate } from 'react-router-dom';
import { mockRecipes } from './mocks/mockRecipes'
import { mockCategories, UNCATEGORIZED } from './mocks/mockCategories'
import { mockUsers } from './mocks/mockUsers'
import { mockFriendships } from './mocks/mockFriendships'
import { mockStickers } from './mocks/mockStickers'
import { mockSavedRecipes } from './mocks/mockSavedRecipes'
import { mockLikes } from './mocks/mockLikes'
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Layout from './components/Layout';
import Toast from './components/Toast';
import CalendarPage from './pages/CalendarPage';
import RecipesPage from './pages/RecipesPage';
import CategoriesPage from './pages/CategoriesPage';
import UserPage from './pages/UserPage';
import FriendsPage from './pages/FriendsPage';
import FriendPage from './pages/FriendPage';

function App() {
  const SAVED_CATEGORY = 'Saved';
  const [mealPlan, setMealPlan] = useState({});
  const [recipes, setRecipes] = useState(mockRecipes);
  const [categories, setCategories] = useState(mockCategories);
  const [stickers, setStickers] = useState(mockStickers);
  const [users, setUsers] = useState(mockUsers);
  const [friendships, setFriendships] = useState(mockFriendships);
  const [savedRecipes, setSavedRecipes] = useState(mockSavedRecipes);
  const [likes, setLikes] = useState(mockLikes);
  const [currentUser, setCurrentUser] = useState(() => mockUsers[0]);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast({ message, key: Date.now() });
  };

  const saveRecipeFromUserToSaved = (recipe, sourceUser) => {
    if (!recipe) return;
    const ownerId = String(currentUser.id);
    const sourceAuthorId = String(sourceUser?.id ?? recipe.authorId);
    const sourceRecipeId = String(recipe.id);

    let didAdd = false;
    setSavedRecipes((prev) => {
      const already = (prev ?? []).some(
        (sr) =>
          String(sr.ownerId) === ownerId &&
          String(sr.source?.authorId) === sourceAuthorId &&
          String(sr.source?.recipeId) === sourceRecipeId,
      );
      if (already) return prev;

      const snapshot = {
        name: recipe.name,
        ingredients: recipe.ingredients ?? [],
        steps: recipe.steps ?? [],
        time: recipe.time,
        categories: recipe.categories ?? [],
      };

      didAdd = true;
      return [
        ...(prev ?? []),
        {
          id: `saved-${uuidv4()}`,
          ownerId,
          source: { authorId: sourceAuthorId, recipeId: sourceRecipeId },
          savedAt: new Date().toISOString(),
          notes: "",
          categoriesOverride: snapshot.categories,
          snapshot,
        },
      ];
    });

    if (didAdd) {
      showToast("Recipe saved to your list");
    } else {
      showToast("This recipe is already in your Saved");
    }
  };

  const mySavedRecipes = savedRecipes.filter((sr) => String(sr.ownerId) === String(currentUser.id));
  const categoriesWithSaved = mySavedRecipes.length > 0 && !categories.includes(SAVED_CATEGORY)
    ? [SAVED_CATEGORY, ...categories]
    : categories;

  const usersById = useMemo(() => new Map((users ?? []).map((u) => [String(u.id), u])), [users]);

  const savedAsRecipeCards = mySavedRecipes.map((sr) => {
    const sourceAuthorId = String(sr.source?.authorId ?? '');
    const fromNickname = usersById.get(sourceAuthorId)?.nickname ?? sourceAuthorId;
    const sourceRecipeId = String(sr.source?.recipeId ?? '');
    const sourceExists = recipes.some(
      (r) => String(r.authorId) === sourceAuthorId && String(r.id) === sourceRecipeId,
    );

    const snapshot = sr.snapshot ?? {};
    const baseCats = Array.isArray(snapshot.categories) ? snapshot.categories : [];
    const overrideCats = Array.isArray(sr.categoriesOverride) ? sr.categoriesOverride : baseCats;

    return {
      id: sr.id,
      name: snapshot.name ?? 'Saved recipe',
      ingredients: snapshot.ingredients ?? [],
      steps: snapshot.steps ?? [],
      time: snapshot.time,
      categories: [SAVED_CATEGORY, ...overrideCats],
      authorId: currentUser.id,
      __kind: 'saved',
      __saved: {
        source: sr.source,
        fromNickname,
        notes: sr.notes ?? '',
        sourceMissing: !sourceExists,
      },
    };
  });

  const myOwnRecipes = recipes.filter((r) => String(r.authorId) === String(currentUser.id)).map((r) => ({
    ...r,
    __kind: 'own',
  }));

  const myAccessibleRecipes = [...myOwnRecipes, ...savedAsRecipeCards];

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

  const updateSavedRecipe = (savedId, patch) => {
    setSavedRecipes((prev) =>
      prev.map((sr) => (String(sr.id) === String(savedId) ? { ...sr, ...patch } : sr)),
    );
  };

  const deleteSavedRecipe = (savedId) => {
    setSavedRecipes((prev) => prev.filter((sr) => String(sr.id) !== String(savedId)));
    setMealPlan((prev) => {
      const cleaned = {};
      Object.keys(prev).forEach((date) => {
        cleaned[date] = {};
        ['breakfast', 'lunch', 'dinner', 'snack'].forEach((meal) => {
          const arr = prev[date]?.[meal] || [];
          cleaned[date][meal] = arr.filter((token) => String(token) !== `recipe:${savedId}`);
        });
      });
      return cleaned;
    });
  };

  const removeFriendToFollower = (friendId) => {
    const me = String(currentUser.id);
    const other = String(friendId);
    setFriendships((prev) =>
      (prev ?? []).map((f) => {
        const a = String(f.userId);
        const b = String(f.friendId);
        const isThisPair = (a === me && b === other) || (a === other && b === me);
        if (!isThisPair) return f;
        if (f.status !== 'accepted') return f;
        // follower means: other follows me (one-way)
        return { ...f, userId: me, friendId: other, status: 'follower' };
      }),
    );
    showToast('Removed from friends');
  };

  const followBack = (friendId) => {
    const me = String(currentUser.id);
    const other = String(friendId);
    setFriendships((prev) =>
      (prev ?? []).map((f) => {
        const a = String(f.userId);
        const b = String(f.friendId);
        if (f.status === 'follower' && a === me && b === other) {
          return { ...f, status: 'accepted' };
        }
        return f;
      }),
    );
    showToast('Now you are friends');
  };

  const unfollow = (friendId) => {
    const me = String(currentUser.id);
    const other = String(friendId);
    setFriendships((prev) =>
      (prev ?? []).filter((f) => !(String(f.userId) === me && String(f.friendId) === other && f.status === "following")),
    );
    showToast("Unfollowed");
  };

  const updateMyNickname = (nickname) => {
    const next = String(nickname ?? "").trim();
    if (!next) return;
    if (next.length > 32) return;

    setCurrentUser((prev) => {
      const myId = String(prev?.id);
      setUsers((usersPrev) =>
        (usersPrev ?? []).map((u) => (String(u.id) === myId ? { ...u, nickname: next } : u)),
      );
      return { ...prev, nickname: next };
    });
    showToast("Nickname updated");
  };

  const setMySignatureDish = (recipe) => {
    if (!recipe) return;
    if (recipe.__kind === "saved") return;
    if (String(recipe.authorId) !== String(currentUser.id)) return;

    const recipeId = String(recipe.id);

    setCurrentUser((prev) => {
      const myId = String(prev?.id);
      setUsers((usersPrev) =>
        (usersPrev ?? []).map((u) => (String(u.id) === myId ? { ...u, signatureDishRecipeId: recipeId } : u)),
      );
      return { ...prev, signatureDishRecipeId: recipeId };
    });
    showToast("Signature dish updated");
  };

  const clearMySignatureDish = () => {
    setCurrentUser((prev) => {
      const myId = String(prev?.id);
      setUsers((usersPrev) =>
        (usersPrev ?? []).map((u) => (String(u.id) === myId ? { ...u, signatureDishRecipeId: null } : u)),
      );
      return { ...prev, signatureDishRecipeId: null };
    });
    showToast("Signature dish cleared");
  };

  const likesByKey = (() => {
    const map = new Map();
    (likes ?? []).forEach((l) => {
      const key = `${String(l.authorId)}:${String(l.recipeId)}`;
      const set = map.get(key) ?? new Set();
      set.add(String(l.userId));
      map.set(key, set);
    });
    return map;
  })();

  const toggleLike = (recipe) => {
    if (!recipe) return;
    const authorId = String(recipe.authorId);
    const recipeId = String(recipe.id);
    const userId = String(currentUser.id);

    if (recipe.__kind === 'saved') return;

    setLikes((prev) => {
      const already = (prev ?? []).some(
        (l) => String(l.userId) === userId && String(l.authorId) === authorId && String(l.recipeId) === recipeId,
      );
      if (already) {
        return (prev ?? []).filter(
          (l) => !(String(l.userId) === userId && String(l.authorId) === authorId && String(l.recipeId) === recipeId),
        );
      }
      return [...(prev ?? []), { id: `like-${uuidv4()}`, userId, authorId, recipeId, createdAt: new Date().toISOString() }];
    });
  };

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Routes>
        <Route element={<Layout currentUser={currentUser} />}>
          <Route path="/" element={<Navigate to="/recipes" />} />
          {<Route path="/recipes/*" element={<RecipesPage
            recipes={myAccessibleRecipes}
            ownRecipes={myOwnRecipes}
            setRecipes={setRecipes}
            savedRecipes={savedRecipes}
            onUpdateSavedRecipe={updateSavedRecipe}
            onDeleteSavedRecipe={deleteSavedRecipe}
            users={users}
            categories={categoriesWithSaved}
            setCategories={setCategories}
            onDelete={deleteRecipe}
            currentUser={currentUser}
            likesByKey={likesByKey}
            onToggleLike={toggleLike}
            signatureDishRecipeId={currentUser?.signatureDishRecipeId}
            onSetSignatureDish={setMySignatureDish}
          />
          }
          />}
          <Route path="/calendar" element={<CalendarPage
            mealPlan={mealPlan}
            setMealPlan={setMealPlan}
            recipes={myAccessibleRecipes}
            categories={categoriesWithSaved}
            stickers={stickers}
            onCreateSticker={addSticker}
            onUpdateSticker={updateSticker}
            onDeleteSticker={deleteSticker}
            onToast={showToast}
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
          <Route
            path="/friends"
            element={
              <FriendsPage
                currentUser={currentUser}
                users={users}
                friendships={friendships}
                recipes={recipes}
                onRemoveFriend={removeFriendToFollower}
                onFollow={followBack}
                onUnfollow={unfollow}
                onSaveRecipe={saveRecipeFromUserToSaved}
              />
            }
          />
          <Route
            path="/friends/:id"
            element={
              <FriendPage
                currentUser={currentUser}
                users={users}
                friendships={friendships}
                recipes={recipes}
                categories={categories}
                likesByKey={likesByKey}
                onToggleLike={toggleLike}
                onSaveRecipe={saveRecipeFromUserToSaved}
              />
            }
          />
          <Route
            path="/user"
            element={
              <UserPage
                user={currentUser}
                recipes={recipes}
                onUpdateNickname={updateMyNickname}
                onClearSignatureDish={clearMySignatureDish}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;