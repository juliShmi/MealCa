import MealSlot from "./MealSlot";

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

function Day({ date, meals = {} }) {
  return (
    <div style={{ border: '1px solid #ccc', marginBottom: '12px', padding: '8px' }}>
      <h3>{date}</h3>

      {MEALS.map(meal => (
        <MealSlot
          key={meal}
          label={meal}
          recipes={meals[meal] || []}
        />
      ))}
    </div>
  );
}
export default Day;