import Calendar from "../components/calendar/Calendar";
import RecipeLibrary from "../components/calendar/recipeLibrary/RecipeLibrary";
import { useState } from "react";

function CalendarPage({ mealPlan, setMealPlan, recipes = [], categories = [] }) {
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(true);
  const libraryWidth = isLibraryCollapsed ? 44 : 360;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <div style={{ flex: '1 1 520px', minWidth: 0 }}>
        <Calendar mealPlan={mealPlan} setMealPlan={setMealPlan} recipes={recipes} />
      </div>

      <div
        style={{
          position: 'relative',
          flex: `0 0 ${libraryWidth}px`,
          width: libraryWidth,
          maxWidth: '100%',
          transition: 'width 180ms ease',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '6px',
            borderLeft: '1px solid #ccc',
            background: '#fff',
          }}
        >
          <button
            type="button"
            onClick={() => setIsLibraryCollapsed((v) => !v)}
            aria-label={isLibraryCollapsed ? 'Expand recipe library' : 'Collapse recipe library'}
            title={isLibraryCollapsed ? 'Expand' : 'Collapse'}
            style={{
              width: 32,
              height: 32,
              cursor: 'pointer',
            }}
          >
            {isLibraryCollapsed ? '⟨' : '⟩'}
          </button>
        </div>
        <div
          style={{
            display: isLibraryCollapsed ? 'none' : 'block',
          }}
          aria-hidden={isLibraryCollapsed ? 'true' : 'false'}
        >
          <RecipeLibrary recipes={recipes} categories={categories} />
        </div>
      </div>
    </div>
  );
}
export default CalendarPage;