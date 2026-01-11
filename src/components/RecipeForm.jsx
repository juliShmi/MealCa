import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


function RecipeForm({ onCreate, onUpdate, categories, onAddCategory, recipes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [category, setCategory] = useState(categories[0] || '');
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      onAddCategory(newCategory.trim());
      setCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const recipeToEdit = recipes?.find(r => String(r.id) === String(id));

  useEffect(() => {
    if (isEdit && recipeToEdit) {
      setName(recipeToEdit.name);
      setTime(recipeToEdit.time);
      setIngredients(recipeToEdit.ingredients);
      setCategory(recipeToEdit.category);
    }
  }, [isEdit, recipeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipe = {
      id: isEdit ? recipeToEdit.id : uuidv4(),
      name,
      ingredients: ingredients.filter(i => i.trim() !== ''),
      time: Number(time),
      category,
    };

    if (isEdit) {
      onUpdate(recipe);
    } else {
      onCreate(recipe);
      resetForm();
    }

    navigate('/recipes');
  };


  const resetForm = () => {
    setName('');
    setTime('');
    setIngredients(['']);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Recipe Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="number" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />

      <div style={{ marginTop: '10px' }}>
        <p>Ingredients:</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxWidth: '300px' }}>
          {ingredients.map((ing, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ing}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
            />
          ))}
        </div>
        <button type="button" onClick={addIngredient}>+</button>
      </div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>
      <div>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
        />
        <button type="button" onClick={handleAddCategory}>+</button>
      </div>
      <button type="submit">
        {isEdit ? 'Save changes' : 'Create'}
      </button>
    </form>
  );
}

export default RecipeForm;