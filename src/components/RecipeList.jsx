import RecipeCard from './RecipeCard';
function RecipeList() {
  const recipes = [
    {
      title: 'Паста с томатным соусом',
      ingredients: ['Паста', 'Томаты', 'Чеснок', 'Базилик'],
      time: 20
    },
    {
      title: 'Салат Цезарь',
      ingredients: ['Курица', 'Салат', 'Сыр', 'Сухарики'],
      time: 15
    }
  ];

return (
  <div>
    <h1>Мои рецепты</h1>
    <div className="recipe-list">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} title={recipe.title} ingredients={recipe.ingredients} time={recipe.time} />
      ))}
    </div>
  </div>
);
}
export default RecipeList;