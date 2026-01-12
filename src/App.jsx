import { Routes, Route, Navigate } from 'react-router-dom';
import Recipes from './components/Recipes';
import Layout from './components/Layout';
import Calendar from './components/Calendar'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/recipes" />} />
          <Route path="/recipes/*" element={<Recipes />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;