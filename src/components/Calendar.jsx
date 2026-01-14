import Day from "./Day";

function Calendar({ mealPlan, setMealPlan, recipes }) {
  const safeMealPlan =
    mealPlan && Object.keys(mealPlan).length > 0
      ? mealPlan
      : {
        '2026-01-12': { breakfast: [], lunch: [], dinner: [], snack: [] },
        '2026-01-13': { breakfast: [], lunch: [], dinner: [], snack: [] }
      };

  const handleDropRecipe = (date, meal, recipeId) => {
    setMealPlan(prev => {
      const prevDay = prev[date] ?? {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: []
      };
      const prevMeal = Array.isArray(prevDay[meal]) ? prevDay[meal] : [];

      return {
        ...prev,
        [date]: {
          ...prevDay,
          [meal]: [...prevMeal, recipeId],
        },
      };
    });
  };

  return (
    <div style={{ width: '50%' }}>
      {Object.keys(safeMealPlan).map(date => (
        <Day
          key={date}
          date={date}
          meals={mealPlan[date]}
          onDropRecipe={handleDropRecipe}
          recipes={recipes}
        />
      ))}
    </div>
  );
}

export default Calendar;
