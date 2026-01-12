import { Outlet } from 'react-router-dom';
import Headers from './Headers';

function Layout() {
  return (
    <>
      <Headers />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
