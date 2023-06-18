import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';

function App() {
  return (
<Router>
  <Routes>
    <Route path= '/' element={<Home/>}/>
    <Route path='/Inquiry' element={<Inquiry/>}/>
    <Route path='About' element={<About/>}/>

  </Routes>


</Router>
  );
}

export default App;