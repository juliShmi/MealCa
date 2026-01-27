import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ActiveRecipe from "../components/recipes/ActiveRecipe";

function FriendPage({
  currentUser,
  users = [],
  friendships = [],
  recipes = [],
  categories = [],
  likesByKey,
  onToggleLike,
  onSaveRecipe,
}) {
  const { id } = useParams();
  const friendId = String(id);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openByCategory, setOpenByCategory] = useState(() => ({}));

  const isFriend = useMemo(() => {
    return (friendships ?? []).some((f) => {
      const a = String(f.userId);
      const b = String(f.friendId);
      if (f?.status === "accepted") {
        return (
          (a === String(currentUser?.id) && b === friendId) ||
          (b === String(currentUser?.id) && a === friendId)
        );
      }

      if (f?.status === "follower") {
        return a === String(currentUser?.id) && b === friendId;
      }

      return false;
    });
  }, [friendships, currentUser, friendId]);

  const friendUser = useMemo(() => {
    return (users ?? []).find((u) => String(u.id) === friendId) ?? { id: friendId, nickname: friendId };
  }, [users, friendId]);

  const friendRecipes = useMemo(() => {
    return (recipes ?? []).filter((r) => String(r.authorId) === friendId);
  }, [recipes, friendId]);

  const activeRecipeId = searchParams.get("selected");
  const activeRecipe = useMemo(() => {
    if (!activeRecipeId) return null;
    return friendRecipes.find((r) => String(r.id) === String(activeRecipeId)) ?? null;
  }, [friendRecipes, activeRecipeId]);

  const categoriesForFriend = useMemo(() => {
    const set = new Set();
    (friendRecipes ?? []).forEach((r) => (r.categories ?? []).forEach((c) => set.add(c)));

    const ordered = [];
    (categories ?? []).forEach((c) => set.has(c) && ordered.push(c));
    Array.from(set).forEach((c) => {
      if (!ordered.includes(c)) ordered.push(c);
    });
    return ordered;
  }, [friendRecipes, categories]);

  const categoriesWithCounts = useMemo(() => {
    return categoriesForFriend.map((cat) => ({
      cat,
      recipes: friendRecipes.filter((r) => (r.categories ?? []).includes(cat)),
    }));
  }, [categoriesForFriend, friendRecipes]);

  const getLikeMeta = (recipe) => {
    const key = `${String(recipe.authorId)}:${String(recipe.id)}`;
    const set = likesByKey?.get?.(key);
    const count = set?.size ?? 0;
    const likedByMe = set?.has?.(String(currentUser?.id)) ?? false;
    return { count, likedByMe };
  };

  if (!isFriend) {
    return (
      <div style={{ padding: 16 }}>
        <button type="button" onClick={() => navigate("/friends")} style={{ marginBottom: 12 }}>
          ← Back
        </button>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Not available</div>
        <div style={{ opacity: 0.7 }}>You are not friends with this user.</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: 16 }}>
      <div style={{ flex: "1 1 520px", minWidth: 0 }}>
        <button type="button" onClick={() => navigate("/friends")} style={{ marginBottom: 12 }}>
          ← Back
        </button>

        <h1 style={{ marginTop: 0 }}>{friendUser.nickname}'s recipes</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: activeRecipe ? "repeat(2, minmax(240px, 1fr))" : "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {categoriesWithCounts.map(({ cat, recipes: filtered }, idx) => {
            if (filtered.length === 0) return null;
            const isOpen = openByCategory[cat] ?? false;
            return (
              <div key={idx} style={{ marginBottom: 20 }}>
                <button
                  type="button"
                  onClick={() => setOpenByCategory((prev) => ({ ...prev, [cat]: !(prev[cat] ?? false) }))}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    padding: "10px 12px",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontWeight: 800 }}>{cat}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ opacity: 0.7, fontSize: 12 }}>{filtered.length}</span>
                    <span aria-hidden="true">{isOpen ? "▾" : "▸"}</span>
                  </span>
                </button>

                {isOpen && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {filtered.map((r) => {
                      const isActive = String(r.id) === String(activeRecipeId);
                      const likeMeta = getLikeMeta(r);
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSearchParams({ selected: String(r.id) })}
                          style={{
                            textAlign: "left",
                            width: "100%",
                            padding: "10px 12px",
                            borderRadius: 10,
                            border: isActive ? "2px solid #111" : "1px solid #ddd",
                            background: isActive ? "#f7f7f7" : "#fff",
                            cursor: "pointer",
                            fontWeight: 700,
                          }}
                        >
                          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                            <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {r.name}
                            </span>
                            <span style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
                              <span style={{ fontSize: 12, opacity: 0.8 }}>♥ {likeMeta.count}</span>
                              {likeMeta.likedByMe && (
                                <span
                                  style={{
                                    fontSize: 12,
                                    padding: "2px 8px",
                                    borderRadius: 999,
                                    border: "1px solid #ddd",
                                    background: "#fff",
                                    opacity: 0.9,
                                    fontWeight: 800,
                                  }}
                                >
                                  Liked
                                </span>
                              )}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <ActiveRecipe
        recipe={activeRecipe}
        onClose={() => setSearchParams({})}
        currentUserId={currentUser?.id}
        likesByKey={likesByKey}
        onToggleLike={onToggleLike}
        menuItems={[
          {
            key: "save",
            label: "Save to my recipes",
            onClick: () => onSaveRecipe?.(activeRecipe, friendUser),
          },
        ]}
      />
    </div>
  );
}

export default FriendPage;

