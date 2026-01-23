import { NavLink } from 'react-router-dom';

function Headers({ currentUser }) {
  const avatarChar = String(currentUser?.nickname ?? 'U')
    .trim()
    .slice(0, 2)
    .toUpperCase();

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

        <NavLink to="/calendar" style={{ marginRight: '12px' }}>
          Calendar
        </NavLink>

        <NavLink to="/friends">Friends</NavLink>
      </div>

      <NavLink
        to="/user"
        aria-label="User profile"
        title={currentUser?.nickname ?? 'User'}
        style={{
          width: 34,
          height: 34,
          borderRadius: 0,
          border: '3px solid #111',
          display: 'grid',
          placeItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          background: '#fff',
          fontWeight: 900,
          boxShadow: '4px 4px 0 0 #111',
        }}
      >
        {avatarChar}
      </NavLink>
    </header>
  );
}

export default Headers;
