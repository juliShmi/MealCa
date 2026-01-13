import Day from "./Day";

function Calendar({ mealPlan }) {
  mealPlan = {
    '2026-01-12': { breakfast: [], lunch: [], dinner: [], snack: [] },
    '2026-01-13': { breakfast: [], lunch: [], dinner: [], snack: [] }
  };

  return (
    <div style={{ width: '60%', padding: '16px' }}>
      {Object.entries(mealPlan).map(([date, meals]) => (
        <Day key={date} date={date} meals={meals} />
      ))}
    </div>
  );
}

export default Calendar;
