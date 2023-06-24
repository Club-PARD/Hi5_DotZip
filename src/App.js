import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import PickAnswerPage from './components/Web/VotePage/PickAnswerPage';
import EditVotePage from './components/Web/VotePage/EditVotePage';
import MyProfilePage from './components/Web/ProfilePage/MyProfilePage';
import SurveyFirst from './components/Web/SurveyPage/SurveyFirst';
import SurveySecond from './components/Web/SurveyPage/SurveySecond';
import SurveyCreate from './components/Web/SurveyPage/SurveyCreate';
import Answer from './pages/Answer';
import SurveyShare from './components/Web/SurveyPage/SurveyShare';
import Preferences from './components/Web/PreferencesPage/PreferencesPage';

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
    <Route path='/SurveyFirst' element={<SurveyFirst/>}/>
    <Route path='/SurveySecond' element={<SurveySecond/>}/>
    <Route path='/SurveyCreate' element={<SurveyCreate/>}/>
    <Route path='/SurveyShare' element={<SurveyShare/>}/>
    <Route path='/Answer' element={<Answer/>}/>
    <Route path='/Preferences' element={<Preferences/>}/>

  </Routes>


</Router>
  );
}

export default App;

