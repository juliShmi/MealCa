import { useMemo, useState } from "react";

function CategoriesManager({ categories, onAddCategory, onDeleteCategory, protectedCategory }) {
  const [newCategory, setNewCategory] = useState("");

  const sorted = useMemo(() => {
    const list = [...(categories ?? [])];
    list.sort((a, b) => a.localeCompare(b));
    if (protectedCategory) {
      const idx = list.indexOf(protectedCategory);
      if (idx >= 0) {
        list.splice(idx, 1);
        list.unshift(protectedCategory);
      }
    }
    return list;
  }, [categories, protectedCategory]);

  const handleAdd = () => {
    const name = newCategory.trim();
    if (!name) return;
    onAddCategory?.(name);
    setNewCategory("");
  };

  return (
    <div style={{ maxWidth: 520 }}>
      <h2 style={{ marginTop: 0 }}>Manage Categories</h2>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
          style={{ flex: 1 }}
        />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {sorted.map((cat) => {
          const isProtected = cat === protectedCategory;
          return (
            <div
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid #ddd",
                borderRadius: 10,
                padding: "10px 12px",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{cat}</div>
                {isProtected && (
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    Default category (cannot be deleted)
                  </div>
                )}
              </div>

              {!isProtected && (
                <button
                  type="button"
                  onClick={() => onDeleteCategory?.(cat)}
                  title="Delete category"
                  aria-label={`Delete category ${cat}`}
                  style={{ cursor: "pointer" }}
                >
                  🗑️
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategoriesManager;

