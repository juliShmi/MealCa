function RecipeCard({ title, ingredients, time }) {

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    if (mins === 0) {
      return `${hours} h`;
    }

    return `${hours} h ${mins} min`;
  };

  return (
    <div className="recipe-card">
      <h2>{title}</h2>
      <p><strong>Ingredients:</strong> {ingredients.join(', ')}</p>
      <p><strong>Time:</strong> {formatTime(time)}</p>
    </div>
  );
}

export default RecipeCard;