import Day from "./Day";
import { useMemo, useState } from "react";

function Calendar({ mealPlan, setMealPlan, recipes }) {
  const EMPTY_DAY = useMemo(
    () => ({ breakfast: [], lunch: [], dinner: [], snack: [] }),
    [],
  );
  const baseDateStr = "2026-01-12";
  const [view, setView] = useState("week"); // "day" | "3days" | "week"

  const formatDate = (d) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const addDays = (dateStr, days) => {
    const d = new Date(`${dateStr}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    return formatDate(d);
  };

  const visibleDates = useMemo(() => {
    const len = view === "day" ? 1 : view === "3days" ? 3 : 7;
    return Array.from({ length: len }, (_, i) => addDays(baseDateStr, i));
  }, [view]);

  const safeMealPlan = useMemo(() => {
    const obj = {};
    for (const date of visibleDates) {
      obj[date] = mealPlan?.[date] ?? EMPTY_DAY;
    }
    return obj;
  }, [mealPlan, visibleDates, EMPTY_DAY]);

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
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button type="button" onClick={() => setView("day")}>
          1 day
        </button>
        <button type="button" onClick={() => setView("3days")}>
          3 days
        </button>
        <button type="button" onClick={() => setView("week")}>
          week
        </button>
      </div>

      {visibleDates.map((date) => (
        <Day
          key={date}
          date={date}
          meals={safeMealPlan[date]}
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
