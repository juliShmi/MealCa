import RecipeCard from "./RecipeCard";
import { useEffect, useRef, useState } from "react";

function ActiveRecipe({ recipe, onClose, onEdit, onDelete }) {
  if (!recipe) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, position: "relative" }} ref={menuRef}>
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
                minWidth: 140,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: 10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                padding: 6,
                zIndex: 5,
              }}
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit?.();
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete?.();
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#b00020",
                  fontWeight: 700,
                }}
              >
                Delete
              </button>
            </div>
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

