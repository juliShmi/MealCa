import RecipeCard from './RecipeCard';

function RecipeList({ recipes, categories, onDelete }) {
  return (
    <div>
      <h1>My Recipes</h1>
      <div className="recipe-list">
        {categories.map((cat, idx) => {
          const filtered = recipes.filter(r => r.category === cat);

          if (filtered.length === 0) return null;

          return (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <h2>{cat}</h2>
              {filtered.map((r) => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <RecipeCard 
                    title={r.name} 
                    time={r.time} 
                    ingredients={r.ingredients} 
                  />
                  <button 
                    onClick={() => onDelete(r.id)} 
                    style={{ marginLeft: '10px', height: '30px' }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecipeList;
