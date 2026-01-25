import { DEFAULT_INGREDIENT_UNIT, INGREDIENT_UNITS } from "../constants/ingredientUnits";

export function normalizeIngredient(raw) {
  if (typeof raw === "string") {
    const name = raw.trim();
    return {
      name,
      amount: null,
      unit: DEFAULT_INGREDIENT_UNIT,
    };
  }

  const name = String(raw?.name ?? "").trim();
  const amountRaw = raw?.amount;
  const amount =
    amountRaw === "" || amountRaw == null || Number.isNaN(Number(amountRaw))
      ? null
      : Number(amountRaw);

  const unit = INGREDIENT_UNITS.includes(raw?.unit) ? raw.unit : DEFAULT_INGREDIENT_UNIT;

  return { name, amount, unit };
}

export function normalizeIngredients(list) {
  if (!Array.isArray(list)) return [];
  return list.map(normalizeIngredient);
}

export function formatIngredient(ing) {
  if (ing == null) return "";
  if (typeof ing === "string") return ing;

  const name = String(ing?.name ?? "").trim();
  if (!name) return "";

  const amount = ing?.amount;
  const unit = String(ing?.unit ?? "").trim();

  if (amount == null || amount === "" || Number.isNaN(Number(amount))) return name;
  if (!unit) return `${name} (${Number(amount)})`;

  return `${name} (${Number(amount)} ${unit})`;
}

