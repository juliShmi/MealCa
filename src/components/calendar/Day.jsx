import MealSlot from "./MealSlot";

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

function Day({ date, meals, onDropRecipe, recipes, stickers, onRemoveRecipe, onMoveRecipe, variant }) {
  const safeMeals = meals ?? {};

  const d = new Date(`${date}T00:00:00Z`);

  const weekday = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    timeZone: 'UTC',
  }).format(d);

  const fullDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);

  const prettyDate = `${weekday}, ${fullDate}`;

  const isWeekGrid = variant === 'weekGrid';

  return (
    <div style={{ marginBottom: isWeekGrid ? 0 : '20px' }}>
      <h3
        style={{
          margin: '0 0 10px 0',
          overflowWrap: 'anywhere',
          fontSize: isWeekGrid ? 14 : undefined,
        }}
      >
        {prettyDate}
      </h3>

      {MEALS.map(meal => (
        <MealSlot
          key={meal}
          date={date}
          meal={meal}
          value={safeMeals[meal]}
          onDropRecipe={onDropRecipe}
          recipes={recipes}
          stickers={stickers}
          onRemoveRecipe={onRemoveRecipe}
          onMoveRecipe={onMoveRecipe}
        />
      ))}
    </div>
  );
}
export default Day;