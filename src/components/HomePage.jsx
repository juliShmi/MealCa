import { useNavigate } from 'react-router-dom';
function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Главная страница</h1>
      <button>Create New Recipe</button>
      <button onClick={() => navigate('/recipes')}>Show My Recipes</button>
    </div>
  );
}

export default HomePage;