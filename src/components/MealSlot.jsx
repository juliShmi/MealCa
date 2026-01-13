function MealSlot({ label, recipes = [] }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <strong>{label}</strong>

      <div
        style={{
          minHeight: '40px',
          border: '1px dashed #aaa',
          padding: '4px',
        }}
      >
        {recipes.length === 0 && <em>Empty</em>}
      </div>
    </div>
  );
}

export default MealSlot;