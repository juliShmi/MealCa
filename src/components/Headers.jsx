import { NavLink } from 'react-router-dom';

function Headers({ currentUser }) {
  return (
    <header
      style={{
        padding: '16px',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <div>
        <NavLink to="/recipes" style={{ marginRight: '12px' }}>
          Recipes
        </NavLink>

        <NavLink to="/calendar">Calendar</NavLink>
      </div>

      <NavLink
        to="/user"
        aria-label="User profile"
        title={currentUser?.nickname ?? 'User'}
        style={{
          width: 34,
          height: 34,
          borderRadius: 999,
          border: '1px solid #ddd',
          display: 'grid',
          placeItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          background: '#fff',
        }}
      >
        👤
      </NavLink>
    </header>
  );
}

export default Headers;
