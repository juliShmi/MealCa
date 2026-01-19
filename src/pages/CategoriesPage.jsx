import { useLocation, useNavigate } from "react-router-dom";
import CategoriesManager from "../components/categories/CategoriesManager";

function CategoriesPage({ categories, onAddCategory, onDeleteCategory, uncategorized }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // If this page was opened directly, location.key is usually "default".
    // In that case, go to a safe fallback route instead of navigate(-1).
    if (location.key === "default") {
      navigate("/recipes", { replace: true });
      return;
    }
    navigate(-1);
  };

  return (
    <div style={{ padding: 16 }}>
      <button type="button" onClick={handleBack} style={{ marginBottom: 12 }}>
        ← Back
      </button>
      <CategoriesManager
        categories={categories}
        onAddCategory={onAddCategory}
        onDeleteCategory={onDeleteCategory}
        protectedCategory={uncategorized}
      />
    </div>
  );
}

export default CategoriesPage;

