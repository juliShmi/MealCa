function RecipeCard({ title, ingredients, time }) {

  return (
    <div className="recipe-card">
      <h2>{title}</h2>
      <p><strong>Ингредиенты:</strong> {ingredients.join(', ')}</p>
      <p><strong>Время приготовления:</strong> {time} мин</p>
    </div>
  );
}

export default RecipeCard;