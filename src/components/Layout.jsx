import { Outlet } from 'react-router-dom';
import Headers from './Headers';

function Layout({ currentUser }) {
  return (
    <>
      <Headers currentUser={currentUser} />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
