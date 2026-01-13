import Calendar from "../components/Calendar";
import RecipeLibrary from "../components/RecipeLibrary";

function CalendarPage({ mealPlan, setMealPlan }) {
  return (<div style={{ display: 'flex' }}>
    <Calendar mealPlan={mealPlan} />
    <RecipeLibrary ></RecipeLibrary>
  </div>);
}
export default CalendarPage;