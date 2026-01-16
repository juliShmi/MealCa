import Day from "./Day";

function Calendar({ mealPlan, setMealPlan, recipes }) {
  const safeMealPlan = {
    '2026-01-12': mealPlan['2026-01-12'] ?? { breakfast: [], lunch: [], dinner: [], snack: [] },
    '2026-01-13': mealPlan['2026-01-13'] ?? { breakfast: [], lunch: [], dinner: [], snack: [] },
    ...mealPlan
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

      if (prevMeal.includes(recipeId)) {
        return prev;
      }
      return {
        ...prev,
        [date]: {
          ...prevDay,
          [meal]: [...prevMeal, recipeId],
        },
      };
    });
  };

  const handleRemoveRecipe = (date, meal, recipeId) => {
    setMealPlan(prev => {
      const prevDay = prev[date] ?? {
        breakfast: [], lunch: [], dinner: [], snack: []
      };
      const prevMeal = Array.isArray(prevDay[meal]) ? prevDay[meal] : [];

      return {
        ...prev,
        [date]: {
          ...prevDay,
          [meal]: prevMeal.filter(id => id !== recipeId),
        },
      };
    });
  };

  const handleMoveRecipe = (fromDate, fromMeal, toDate, toMeal, recipeId) => {
    if (fromDate === toDate && fromMeal === toMeal) return;

    setMealPlan((prev) => {
      const emptyDay = { breakfast: [], lunch: [], dinner: [], snack: [] };
      const fromDay = prev[fromDate] ?? emptyDay;
      const toDay = prev[toDate] ?? emptyDay;

      const fromArr = Array.isArray(fromDay[fromMeal]) ? fromDay[fromMeal] : [];
      const toArr = Array.isArray(toDay[toMeal]) ? toDay[toMeal] : [];

      const nextFromArr = fromArr.filter((id) => String(id) !== String(recipeId));
      const alreadyInTarget = toArr.some((id) => String(id) === String(recipeId));
      const nextToArr = alreadyInTarget ? toArr : [...toArr, recipeId];

      if (String(fromDate) === String(toDate)) {
        const mergedDay = {
          ...fromDay,
          ...toDay,
          [fromMeal]: nextFromArr,
          [toMeal]: nextToArr,
        };
        return {
          ...prev,
          [fromDate]: mergedDay,
        };
      }

      return {
        ...prev,
        [fromDate]: { ...fromDay, [fromMeal]: nextFromArr },
        [toDate]: { ...toDay, [toMeal]: nextToArr },
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
          onRemoveRecipe={handleRemoveRecipe}
          onMoveRecipe={handleMoveRecipe}
        />
      ))}
    </div>
  );
}

export default Calendar;
