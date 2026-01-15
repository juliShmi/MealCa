import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';


function RecipeList({ recipes, categories, onDelete }) {
  const navigate = useNavigate();
  return (
    <div>
      <h1>My Recipes</h1>
      <div className="recipe-list" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
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
                  <button onClick={() => navigate(`/recipes/edit/${r.id}`)}>
                    ✏️
                  </button>
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
