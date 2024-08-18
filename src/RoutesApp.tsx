
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='*' element={<ErrorPage/>} />
    </Routes>
  );
}

export default RoutesApp