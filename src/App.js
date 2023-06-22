import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import PickAnswerPage from './components/Web/VotePage/PickAnswerPage';
import EditVotePage from './components/Web/VotePage/EditVotePage';
import MyProfilePage from './components/Web/ProfilePage/MyProfilePage';
import Survey from './pages/Survey';
import Answer from './pages/Answer';

function App() {
  return (
<Router>
  <Routes>
    <Route path= '/' element={<Auth/>}/>
    <Route path= '/Home' element={<Home/>}/>
    <Route path='/Inquiry' element={<Inquiry/>}/>
    <Route path='About' element={<About/>}/>
    <Route path='/PickAnswer' element={<PickAnswerPage/>}/>
    <Route path='/EditVotePage' element={<EditVotePage/>}/>
    <Route path='/MyProfile' element={<MyProfilePage/>}/>
    <Route path='Survey' element={<Survey/>}/>
    <Route path='/Answer' element={<Answer/>}/>

  </Routes>


</Router>
  );
}

export default App;