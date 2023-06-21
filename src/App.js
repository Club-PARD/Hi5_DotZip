import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import PickAnswerPage from './components/Web/VotePage/PickAnswerPage';
import VoteTitlePage from './components/Web/VotePage/VoteTitlePage';

function App() {
  return (
<Router>
  <Routes>
    <Route path= '/' element={<Auth/>}/>
    <Route path= '/Home' element={<Home/>}/>
    <Route path='/Inquiry' element={<Inquiry/>}/>
    <Route path='About' element={<About/>}/>
    <Route path='/PickAnswer' element={<PickAnswerPage/>}/>
    <Route path='/VoteTitle' element={<VoteTitlePage/>}/>

  </Routes>


</Router>
  );
}

export default App;