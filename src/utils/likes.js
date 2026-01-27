export function getRecipeLikeKey(authorId, recipeId) {
  return `${String(authorId)}:${String(recipeId)}`;
}

export function getRecipeLikeKeyFromRecipe(recipe) {
  return getRecipeLikeKey(recipe?.authorId, recipe?.id);
}

