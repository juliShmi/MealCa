import Calendar from "../components/Calendar";
import RecipeLibrary from "../components/RecipeLibrary";

function CalendarPage({ mealPlan, setMealPlan, recipes = [], categories = [] }) {
  return (<div style={{ display: 'flex' }}>
    <Calendar mealPlan={mealPlan} setMealPlan={setMealPlan} recipes={recipes} />
    <RecipeLibrary recipes={recipes} categories={categories}></RecipeLibrary>
  </div>);
}
export default CalendarPage;