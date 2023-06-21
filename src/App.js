import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import PickAnswerPage from './components/Web/VotePage/PickAnswerPage';
import CreateVotePage from './components/Web/VotePage/CreateVotePage';
import CompleteVotePage from './components/Web/VotePage/CompleteVotePage';
import Survey from './pages/Survey';

function App() {
  return (
<Router>
  <Routes>
    <Route path= '/' element={<Auth/>}/>
    <Route path= '/Home' element={<Home/>}/>
    <Route path='/Inquiry' element={<Inquiry/>}/>
    <Route path='About' element={<About/>}/>
    <Route path='/PickAnswer' element={<PickAnswerPage/>}/>
    <Route path='/CreateVote' element={<CreateVotePage/>}/>
    <Route path='/CompleteVote' element={<CompleteVotePage/>}/>
    <Route path='Survey' element={<Survey/>}/>

  </Routes>


</Router>
  );
}

export default App;