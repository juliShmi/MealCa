import Calendar from "../components/calendar/Calendar";
import RecipeLibrary from "../components/calendar/recipeLibrary/RecipeLibrary";

function CalendarPage({ mealPlan, setMealPlan, recipes = [], categories = [] }) {
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

      <div style={{ flex: '0 0 360px', width: 360, maxWidth: '100%' }}>
        <RecipeLibrary recipes={recipes} categories={categories} />
      </div>
    </div>
  );
}
export default CalendarPage;