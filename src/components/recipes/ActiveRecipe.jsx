import RecipeCard from "./RecipeCard";

function ActiveRecipe({ recipe, onClose, onEdit, onDelete }) {
  if (!recipe) return null;

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

          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
            <button type="button" onClick={onEdit} title="Edit">
              ✏️
            </button>
            <button type="button" onClick={onDelete} title="Delete">
              🗑️
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
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

