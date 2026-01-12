import { NavLink } from 'react-router-dom';

function Headers() {
  return (
    <header style={{ padding: '16px', borderBottom: '1px solid #ddd' }}>
      <NavLink to="/recipes" style={{ marginRight: '12px' }}>
        Recipes
      </NavLink>

      <NavLink to="/calendar">
        Calendar
      </NavLink>
    </header>
  );
}

export default Headers;
