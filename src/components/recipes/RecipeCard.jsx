import { useEffect, useMemo, useState } from 'react';
import { normalizeIngredients } from "../../utils/ingredients";

function RecipeCard({ title, ingredients, time, steps, actions, onStepsChange }) {
  const isStepsEditable = typeof onStepsChange === 'function';
  const [newStep, setNewStep] = useState('');
  const [editingIdx, setEditingIdx] = useState(null);
  const [editingValue, setEditingValue] = useState('');

  const normalizedIngredients = useMemo(() => normalizeIngredients(ingredients), [ingredients]);

  useEffect(() => {
    if (!isStepsEditable) return;
    if (editingIdx == null) return;
    if (!Array.isArray(steps) || editingIdx < 0 || editingIdx >= steps.length) {
      setEditingIdx(null);
      setEditingValue('');
    }
  }, [editingIdx, steps, isStepsEditable]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) {
      return `${mins} min`;
    }

    if (mins === 0) {
      return `${hours} h`;
    }

    return `${hours} h ${mins} min`;
  };

  return (
    <div className="recipe-card">
      {(title || actions) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {title && <h2 style={{ margin: 0 }}>{title}</h2>}
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
        <details>
          <summary style={{ fontWeight: 800, cursor: "pointer" }}>Ingredients</summary>
          <div style={{ marginTop: 8 }}>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                columns: normalizedIngredients.length >= 10 ? 2 : 1,
                columnGap: 28,
              }}
            >
              {normalizedIngredients
                .filter((i) => i.name.trim() !== "")
                .map((ing, idx) => (
                  <li key={idx} style={{ breakInside: "avoid", marginBottom: 4 }}>
                    <span>{ing.name}</span>
                    {ing.amount != null && !Number.isNaN(Number(ing.amount)) && (
                      <span style={{ opacity: 0.85 }}>
                        {" "}
                        — {Number(ing.amount)}
                        {ing.unit ? ` ${ing.unit}` : ""}
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </details>

        <details>
          <summary style={{ fontWeight: 800, cursor: "pointer" }}>Steps</summary>
          <div style={{ marginTop: 8 }}>
            {Array.isArray(steps) && steps.length > 0 ? (
              <ol style={{ margin: 0, paddingLeft: 18 }}>
                {steps.map((s, idx) => (
                  <li key={idx} style={{ marginBottom: 6 }}>
                    {isStepsEditable && editingIdx === idx ? (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <input
                          type="text"
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const next = steps.slice();
                            const trimmed = editingValue.trim();
                            if (!trimmed) return;
                            next[idx] = trimmed;
                            onStepsChange?.(next);
                            setEditingIdx(null);
                            setEditingValue('');
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingIdx(null);
                            setEditingValue('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{ flex: 1 }}>{s}</span>
                        {isStepsEditable && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingIdx(idx);
                                setEditingValue(String(s ?? ''));
                              }}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const next = steps.filter((_, i) => i !== idx);
                                onStepsChange?.(next);
                                if (editingIdx === idx) {
                                  setEditingIdx(null);
                                  setEditingValue('');
                                }
                              }}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            ) : (
              <div style={{ opacity: 0.7 }}>No steps yet.</div>
            )}

            {isStepsEditable && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input
                  type="text"
                  placeholder="Add a step"
                  value={newStep}
                  onChange={(e) => setNewStep(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const trimmed = newStep.trim();
                    if (!trimmed) return;
                    const next = Array.isArray(steps) ? [...steps, trimmed] : [trimmed];
                    onStepsChange?.(next);
                    setNewStep('');
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </details>
      </div>

      {/* time is displayed in the header (ActiveRecipe) */}
    </div>
  );
}

export default RecipeCard;