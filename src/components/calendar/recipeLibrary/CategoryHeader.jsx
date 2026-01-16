function CategoryHeader({ title, open, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <span>{title}</span>
      <span>{open ? '▾' : '▸'}</span>
    </div>
  );
}

export default CategoryHeader;
