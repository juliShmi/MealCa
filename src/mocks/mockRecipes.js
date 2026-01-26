export const mockRecipes = [
  {
    id: 'mock-1',
    name: 'Spaghetti Carbonara',
    ingredients: [
      { name: 'spaghetti', amount: 200, unit: 'g' },
      { name: 'eggs', amount: 2, unit: 'pcs' },
      { name: 'bacon', amount: 120, unit: 'g' },
      { name: 'parmesan cheese', amount: 30, unit: 'g' },
      { name: 'black pepper', amount: 1, unit: 'pinch' },
    ],
    steps: ['Boil spaghetti in salted water until al dente.', 'Whisk eggs with grated cheese and black pepper.', 'Fry bacon/pancetta until crisp.', 'Combine hot pasta with bacon, remove from heat, then mix in egg-cheese mixture quickly.'],
    authorId: 'user-1',
    time: 30,
    categories: ['Pasta', 'Italian']
  },
  {
    id: 'mock-2',
    name: 'Caesar Salad',
    ingredients: [
      { name: 'romaine lettuce', amount: 250, unit: 'g' },
      { name: 'caesar dressing', amount: 60, unit: 'ml' },
      { name: 'parmesan cheese', amount: 25, unit: 'g' },
      { name: 'croutons', amount: 40, unit: 'g' },
      { name: 'lemon juice', amount: 1, unit: 'tbsp' },
    ],
    steps: ['Wash and chop romaine lettuce.', 'Add dressing, parmesan, and croutons. Toss well.'],
    authorId: 'user-1',
    time: 15,
    categories: ['Salads']
  },
  {
    id: 'mock-3',
    name: 'Chicken Curry',
    ingredients: [
      { name: 'chicken breast', amount: 450, unit: 'g' },
      { name: 'curry powder', amount: 2, unit: 'tsp' },
      { name: 'coconut milk', amount: 400, unit: 'ml' },
      { name: 'onion', amount: 1, unit: 'pcs' },
      { name: 'garlic cloves', amount: 2, unit: 'pcs' },
      { name: 'ginger', amount: 5, unit: 'g' },
    ],
    steps: ['Cut chicken into small pieces.', 'Add curry powder, coconut milk, onion, garlic, and ginger to a pot and bring to a boil.', 'Simmer for 20 minutes.', 'Serve with rice.'],
    authorId: 'user-1',
    time: 45,
    categories: ['Meat']
  },
  {
    id: 'mock-4',
    name: 'Chocolate Chip Cookies',
    ingredients: [
      { name: 'flour', amount: 250, unit: 'g' },
      { name: 'butter', amount: 120, unit: 'g' },
      { name: 'sugar', amount: 150, unit: 'g' },
      { name: 'chocolate chips', amount: 160, unit: 'g' },
      { name: 'eggs', amount: 1, unit: 'pcs' },
      { name: 'vanilla extract', amount: 1, unit: 'tsp' },
    ],
    steps: ['Preheat oven to 350°F (175°C).', 'Mix flour, butter, sugar, chocolate chips, eggs, and vanilla extract in a bowl.', 'Roll into small balls and place on a baking sheet.', 'Bake for 10 minutes.', 'Serve with ice cream.'],
    authorId: 'user-1',
    time: 25,
    categories: ['Desserts / Sweets', 'Home / Traditional']
  },
  {
    id: 'friend-1',
    name: 'Avocado Toast',
    ingredients: [
      { name: 'bread', amount: 2, unit: 'pcs' },
      { name: 'avocado', amount: 1, unit: 'pcs' },
      { name: 'salt', amount: 1, unit: 'pinch' },
      { name: 'pepper', amount: 1, unit: 'pinch' },
      { name: 'lemon juice', amount: 1, unit: 'tsp' },
    ],
    steps: ['Toast bread.', 'Mash avocado with salt, pepper, and lemon.', 'Spread on toast.'],
    authorId: 'user-2',
    time: 10,
    categories: ['Breakfast', 'Snacks / Sandwiches']
  },
  {
    id: 'friend-2',
    name: 'Greek Salad',
    ingredients: [
      { name: 'tomatoes', amount: 250, unit: 'g' },
      { name: 'cucumber', amount: 200, unit: 'g' },
      { name: 'feta', amount: 120, unit: 'g' },
      { name: 'olives', amount: 60, unit: 'g' },
      { name: 'olive oil', amount: 20, unit: 'ml' },
      { name: 'oregano', amount: 1, unit: 'pinch' },
    ],
    steps: ['Chop vegetables.', 'Add feta and olives.', 'Dress with olive oil.'],
    authorId: 'user-2',
    time: 12,
    categories: ['Salads']
  },
  {
    id: 'friend-3',
    name: 'Pancakes',
    ingredients: [
      { name: 'flour', amount: 200, unit: 'g' },
      { name: 'milk', amount: 250, unit: 'ml' },
      { name: 'eggs', amount: 2, unit: 'pcs' },
      { name: 'sugar', amount: 30, unit: 'g' },
      { name: 'butter', amount: 20, unit: 'g' },
      { name: 'salt', amount: 1, unit: 'pinch' },
    ],
    steps: ['Mix ingredients into batter.', 'Cook on a pan until golden.', 'Serve with toppings.'],
    authorId: 'user-2',
    time: 20,
    categories: ['Breakfast', 'Desserts / Sweets']
  }
];
