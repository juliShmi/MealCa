import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';


function RecipeForm({ onCreate, onUpdate, categories, onAddCategory, recipes }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [errors, setErrors] = useState({});


  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [selectedCategories, setSelectedCategories] = useState([]);
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
      setSelectedCategories(recipeToEdit.categories ?? []);
    }
  }, [isEdit, recipeToEdit]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Recipe name is required';
    } else if (name.length > 50) {
      newErrors.name = 'Recipe name must be under 50 characters';
    }

    const timeNumber = Number(time);
    if (!time || isNaN(timeNumber) || timeNumber <= 0) {
      newErrors.time = 'Enter a valid cooking time';
    } else if (timeNumber > 1440) {
      newErrors.time = 'Time must be under 24 hours';
    }

    const cleanedIngredients = ingredients.filter(i => i.trim() !== '');
    if (cleanedIngredients.length === 0) {
      newErrors.ingredients = 'Add at least one ingredient';
    } else if (cleanedIngredients.length > 20) {
      newErrors.ingredients = 'Too many ingredients (max 20)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const recipe = {
      id: isEdit ? recipeToEdit.id : uuidv4(),
      name,
      ingredients: ingredients.filter((i) => i.trim() !== ""),
      time: Number(time),
      categories: selectedCategories,
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
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <p style={{ color: 'red', fontSize: '12px' }}>{errors.name}</p>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Time (minutes)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {errors.time && (
          <p style={{ color: 'red', fontSize: '12px' }}>{errors.time}</p>
        )}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <p>Ingredients:</p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            maxWidth: '300px',
          }}
        >
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
        {errors.ingredients && (
          <p style={{ color: 'red', fontSize: '12px' }}>
            {errors.ingredients}
          </p>
        )}
        <button type="button" onClick={addIngredient} style={{ marginTop: '5px' }}>
          +
        </button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <p>Categories:</p>
        {categories.map((cat) => (
          <label key={cat} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories((prev) => [...prev, cat]);
                } else {
                  setSelectedCategories((prev) => prev.filter((x) => x !== cat));
                }
              }}
            />
            {cat}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          type="button"
          onClick={handleAddCategory}
          style={{ marginLeft: '5px' }}
        >
          +
        </button>
      </div>

      <button type="submit">
        {isEdit ? 'Save changes' : 'Create'}
      </button>
    </form>
  );
}

export default RecipeForm;