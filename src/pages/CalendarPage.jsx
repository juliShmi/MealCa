import Calendar from "../components/calendar/Calendar";
import RecipeLibrary from "../components/calendar/recipeLibrary/RecipeLibrary";
import { useState } from "react";
import StickersLibrary from "../components/calendar/notesLibrary/NotesLibrary";

function CalendarPage({
  mealPlan,
  setMealPlan,
  recipes = [],
  categories = [],
  stickers = [],
  onCreateSticker,
  onUpdateSticker,
  onDeleteSticker,
}) {
  const [isLibraryCollapsed, setIsLibraryCollapsed] = useState(true);
  const libraryWidth = isLibraryCollapsed ? 44 : 360;
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

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
        <Calendar mealPlan={mealPlan} setMealPlan={setMealPlan} recipes={recipes} stickers={stickers} />
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
          <div
            style={{
              padding: "16px",
              borderLeft: "1px solid #ccc",
              minWidth: 0,
              maxHeight: "calc(100vh - 140px)",
              overflowY: "auto",
            }}
          >
            <div style={{ position: "relative", marginBottom: 12 }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: normalizedQuery ? "8px 34px 8px 10px" : "8px 10px",
                  border: "1px solid #ccc",
                  borderRadius: 10,
                }}
              />

              {normalizedQuery && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  title="Clear"
                  style={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <RecipeLibrary
              recipes={recipes}
              categories={categories}
              query={query}
              onQueryChange={setQuery}
            />

            <StickersLibrary
              stickers={stickers}
              query={query}
              onQueryChange={setQuery}
              onCreate={onCreateSticker}
              onUpdate={onUpdateSticker}
              onDelete={onDeleteSticker}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default CalendarPage;