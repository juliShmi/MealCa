import RecipeCard from "./RecipeCard";
import { useEffect, useRef, useState } from "react";

function ActiveRecipe({
  recipe,
  onClose,
  onEdit,
  onDelete,
  menuItems,
  categories,
  onUpdateSavedRecipe,
  onDeleteSavedRecipe,
  currentUserId,
  likesByKey,
  onToggleLike,
}) {
  if (!recipe) return null;

  const isSaved = recipe.__kind === "saved";
  const isOwn = !isSaved && String(recipe.authorId) === String(currentUserId ?? "");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const [isSavedEditing, setIsSavedEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState(String(recipe.__saved?.notes ?? ""));
  const [savedCats, setSavedCats] = useState(
    Array.isArray(recipe.categories) ? recipe.categories.filter((c) => c !== "Saved") : [],
  );
  const notesRef = useRef(null);

  useEffect(() => {
    // reset drafts when switching active recipe
    setIsSavedEditing(false);
    setSavedNotes(String(recipe.__saved?.notes ?? ""));
    setSavedCats(Array.isArray(recipe.categories) ? recipe.categories.filter((c) => c !== "Saved") : []);
  }, [recipe.id]);

  useEffect(() => {
    if (!isSavedEditing) return;
    // focus notes when entering edit mode
    const el = notesRef.current;
    if (!el) return;
    el.focus?.();
    try {
      const v = String(el.value ?? "");
      el.setSelectionRange?.(v.length, v.length);
    } catch {
      // ignore: non-textarea or unsupported selection api
    }
  }, [isSavedEditing]);

  const resolvedMenuItems = (() => {
    if (Array.isArray(menuItems) && menuItems.length > 0) return menuItems;

    if (isSaved) {
      return [
        ...(typeof onUpdateSavedRecipe === "function"
          ? [
            {
              key: "editSaved",
              label: "Edit (notes & categories)",
              onClick: () => setIsSavedEditing(true),
            },
          ]
          : []),
        ...(typeof onDeleteSavedRecipe === "function"
          ? [
            {
              key: "removeSaved",
              label: "Remove from Saved",
              onClick: () => onDeleteSavedRecipe?.(recipe.id),
              tone: "danger",
            },
          ]
          : []),
      ];
    }

    return [
      ...(typeof onEdit === "function" ? [{ key: "edit", label: "Edit", onClick: onEdit }] : []),
      ...(typeof onDelete === "function"
        ? [{ key: "delete", label: "Delete", onClick: onDelete, tone: "danger" }]
        : []),
    ];
  })();

  useEffect(() => {
    if (!isMenuOpen) return;

    const onPointerDown = (e) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target)) return;
      setIsMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isMenuOpen]);

  const displayCats = Array.isArray(recipe.categories)
    ? recipe.categories.filter((c) => c !== "Saved")
    : [];

  const formatTime = (minutes) => {
    const m = Number(minutes);
    if (!m || Number.isNaN(m)) return "";
    const h = Math.floor(m / 60);
    const mm = m % 60;
    if (h === 0) return `${mm} min`;
    if (mm === 0) return `${h} h`;
    return `${h} h ${mm} min`;
  };

  const likeKey = `${String(recipe.authorId)}:${String(recipe.id)}`;
  const likeSet = likesByKey?.get?.(likeKey);
  const likeCount = likeSet?.size ?? 0;
  const likedByMe = likeSet?.has?.(String(currentUserId ?? "")) ?? false;
  const canToggleLike = !isSaved && !isOwn && typeof onToggleLike === "function" && currentUserId != null;

  return (
    <aside
      style={{
        flex: "0 0 min(50vw, 720px)",
        width: "min(50vw, 720px)",
        maxWidth: "100%",
        maxHeight: "calc(100vh - 24px)",
        overflowY: "auto",
        overflowX: "hidden",
        border: "1px solid #ddd",
        borderRadius: 12,
        background: "#fff",
        position: "sticky",
        top: 12,
      }}
      aria-label="Recipe details"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 2,
          background: "#fff",
          padding: 12,
          borderBottom: "1px solid #eee",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontWeight: 900,
                fontSize: 16,
                minWidth: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {recipe.name}
            </div>
            {(displayCats.length > 0 || (recipe.time != null && !Number.isNaN(Number(recipe.time)))) && (
              <div style={{ marginTop: 2, fontSize: 12, opacity: 0.75 }}>
                {displayCats.length > 0 ? displayCats.join(", ") : ""}
                {displayCats.length > 0 && recipe.time != null ? " · " : ""}
                {recipe.time != null ? formatTime(recipe.time) : ""}
              </div>
            )}
            {recipe.__kind === "saved" && (
              <div style={{ marginTop: 2, display: "flex", alignItems: "center", gap: 8 }}>
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
                  Saved
                </span>
                <span style={{ fontSize: 12, opacity: 0.7 }}>
                  from @{recipe.__saved?.fromNickname ?? "friend"}
                </span>
                {recipe.__saved?.sourceMissing && (
                  <span
                    style={{
                      fontSize: 12,
                      padding: "2px 8px",
                      borderRadius: 999,
                      border: "1px solid #f2c0c0",
                      background: "#fff5f5",
                      color: "#8a1f1f",
                      fontWeight: 800,
                    }}
                  >
                    Original deleted
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }} ref={menuRef}>
          {!isSaved && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {canToggleLike ? (
                <button
                  type="button"
                  onClick={() => onToggleLike?.(recipe)}
                  aria-pressed={likedByMe}
                  aria-label={likedByMe ? "Unlike" : "Like"}
                  title={likedByMe ? "Unlike" : "Like"}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                    lineHeight: 1,
                    fontSize: 16,
                  }}
                >
                  {likedByMe ? "♥" : "♡"}
                </button>
              ) : (
                <div
                  aria-hidden="true"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 999,
                    border: "1px solid #eee",
                    background: "#fafafa",
                    display: "grid",
                    placeItems: "center",
                    opacity: 0.9,
                    fontSize: 14,
                  }}
                  title="Likes"
                >
                  ♥
                </div>
              )}

              <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 800 }} title="Likes count">
                {likeCount}
              </div>

              {likedByMe && canToggleLike && (
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
            </div>
          )}

          {resolvedMenuItems.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setIsMenuOpen((v) => !v)}
                aria-label="Recipe actions"
                title="Actions"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  border: "1px solid #ddd",
                  background: "#fff",
                  cursor: "pointer",
                  lineHeight: 1,
                  fontSize: 18,
                }}
              >
                ⋯
              </button>

              {isMenuOpen && (
                <div
                  role="menu"
                  aria-label="Recipe actions menu"
                  style={{
                    position: "absolute",
                    top: 36,
                    right: 0,
                    minWidth: 160,
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                    padding: 6,
                    zIndex: 5,
                  }}
                >
                  {resolvedMenuItems.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setIsMenuOpen(false);
                        item.onClick?.();
                      }}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        color: item.tone === "danger" ? "#b00020" : "inherit",
                        fontWeight: item.tone === "danger" ? 700 : undefined,
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              onClose?.();
            }}
            aria-label="Close recipe"
            title="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      </div>

      <div style={{ padding: 12 }}>
        <div
          style={{
            width: "100%",
            boxSizing: "border-box",
            aspectRatio: "16 / 9",
            borderRadius: 12,
            background: "#f0f0f0",
            border: "1px solid #e3e3e3",
            display: "grid",
            placeItems: "center",
            color: "#666",
            fontWeight: 800,
          }}
          aria-label="Photo placeholder"
        >
          Photo
        </div>

        {isSaved && (
          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontWeight: 900, marginBottom: 6 }}>My notes</div>
              {!isSavedEditing && (
                <button type="button" onClick={() => setIsSavedEditing(true)} aria-label="Make a note" title="Make a note">
                  📝
                </button>
              )}
            </div>

            {isSavedEditing ? (
              <>
                <textarea
                  ref={notesRef}
                  value={savedNotes}
                  onChange={(e) => setSavedNotes(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    resize: "vertical",
                    padding: 10,
                    borderRadius: 10,
                    border: "1px solid #ccc",
                  }}
                  placeholder="Add your notes (e.g. reduce sugar)"
                />

                <div style={{ marginTop: 12 }}>
                  <div style={{ fontWeight: 900, marginBottom: 6 }}>Categories (for my copy)</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {(categories ?? []).filter((c) => c !== "Saved").map((cat) => (
                      <label key={cat} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <input
                          type="checkbox"
                          checked={savedCats.includes(cat)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSavedCats((prev) => (prev.includes(cat) ? prev : [...prev, cat]));
                            } else {
                              setSavedCats((prev) => prev.filter((x) => x !== cat));
                            }
                          }}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSavedEditing(false);
                      setSavedNotes(String(recipe.__saved?.notes ?? ""));
                      setSavedCats(Array.isArray(recipe.categories) ? recipe.categories.filter((c) => c !== "Saved") : []);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateSavedRecipe?.(recipe.id, {
                        notes: savedNotes,
                        categoriesOverride: savedCats,
                      });
                      setIsSavedEditing(false);
                    }}
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <>
                {savedNotes.trim() ? (
                  <div style={{ whiteSpace: "pre-wrap", opacity: 0.85 }}>{savedNotes}</div>
                ) : (
                  <div style={{ opacity: 0.6 }}>No notes yet.</div>
                )}
              </>
            )}
          </div>
        )}

        <div style={{ marginTop: 12 }}>
          <RecipeCard
            title={null}
            time={recipe.time}
            ingredients={recipe.ingredients}
            steps={recipe.steps}
          />
        </div>
      </div>
    </aside>
  );
}

export default ActiveRecipe;

