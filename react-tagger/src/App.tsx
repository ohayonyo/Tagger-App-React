import './App.css';

import {Routes,Route} from 'react-router-dom'
import { Home } from './components/Home';
import { About } from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import { UserHomePage } from './components/UserHomePage';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path=':username/home' element={<UserHomePage />} />
    </Routes>
  );
}

export default App;
