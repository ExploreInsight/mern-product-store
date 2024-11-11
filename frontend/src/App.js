import './App.css';
import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import Product from "./pages/Product";
import NoPage from './pages/NoPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';
import useDarkMode from './context/DarkMode';

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
    <Router>
    <ToastContainer /> 
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <Routes>
          <Route  path='/' element={<Home isDarkMode={isDarkMode}/>} />
          <Route path='/Product' element={<Product isDarkMode={isDarkMode}/>} />
          <Route path="*" element={<NoPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
