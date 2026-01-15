import MealSlot from "./MealSlot";

const MEALS = ['breakfast', 'lunch', 'dinner', 'snack'];

function Day({ date, meals, onDropRecipe, recipes, onRemoveRecipe }) {
  const safeMeals = meals ?? {};
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{date}</h3>

      {MEALS.map(meal => (
        <MealSlot
          key={meal}
          date={date}
          meal={meal}
          value={safeMeals[meal]}
          onDropRecipe={onDropRecipe}
          recipes={recipes}
          onRemoveRecipe={onRemoveRecipe}
        />
      ))}
    </div>
  );
}
export default Day;