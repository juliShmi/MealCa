function RecipeModal({ isOpen, recipe, onClose }) {
  if (!isOpen || !recipe) return null;

  const formatTime = (minutes) => {
    const m = Number(minutes);
    if (!m || Number.isNaN(m)) return "";
    const h = Math.floor(m / 60);
    const mm = m % 60;
    if (h === 0) return `${mm} min`;
    if (mm === 0) return `${h} h`;
    return `${h} h ${mm} min`;
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 100%)",
          background: "#fff",
          color: "#111",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{recipe.name}</div>
            <div style={{ opacity: 0.7, marginTop: 4 }}>
              {recipe.category ? `Category: ${recipe.category}` : ""}
              {recipe.time != null ? ` · Time: ${formatTime(recipe.time)}` : ""}
            </div>
          </div>

          <button onClick={onClose} style={{ cursor: "pointer" }}>
            ✕
          </button>
        </div>

        <div style={{ marginTop: 14 }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Ingredients</div>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {(recipe.ingredients ?? []).map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </div>

        {Array.isArray(recipe.steps) && recipe.steps.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Steps</div>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
export default RecipeModal;