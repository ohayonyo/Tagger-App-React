import './App.css';

import {Routes,Route} from 'react-router-dom'
import { Home } from './components/Home';
import { About } from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import { UserHomePage } from './components/UserHomePage';
import UploadImage from './components/UploadImage';
// import ImageUpload from './components/ImageUpload';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path=':username/home' element={<UserHomePage />} />
      <Route path=':username/upload_image' element={<UploadImage />} />
    </Routes>
  );
}

export default App;
