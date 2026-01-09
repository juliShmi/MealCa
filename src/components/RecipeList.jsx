import RecipeCard from './RecipeCard';
function RecipeList({ recipes }) {
return (
  <div>
    <h1>My Recipes</h1>
    <div className="recipe-list">
    {recipes.map(r => (
  <RecipeCard 
    key={r.id} 
    title={r.name} 
    time={r.time} 
    ingredients={r.ingredients} 
  />
))}

    </div>
  </div>
);
}
export default RecipeList;