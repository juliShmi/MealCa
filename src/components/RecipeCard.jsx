function RecipeCard({ title, ingredients, time }) {

  return (
    <div className="recipe-card">
      <h2>{title}</h2>
      <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      <p><strong>Cooking time:</strong> {time} min</p>
    </div>
  );
}

export default RecipeCard;