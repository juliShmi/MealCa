function RecipeCard({ title, ingredients, time, actions }) {

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
      {(title || actions) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {title && <h2 style={{ margin: 0 }}>{title}</h2>}
          {actions && <div>{actions}</div>}
        </div>
      )}

      {Array.isArray(ingredients) && ingredients.length > 0 && (
        <p>
          <strong>Ingredients:</strong> {ingredients.join(', ')}
        </p>
      )}

      {time != null && !Number.isNaN(Number(time)) && (
        <p>
          <strong>Time:</strong> {formatTime(Number(time))}
        </p>
      )}
    </div>
  );
}

export default RecipeCard;