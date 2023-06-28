import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useContext } from 'react';
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
import AnswerEnd from './components/Web/AnswerPage/AnswerEnd';
import SurveyShare from './components/Web/SurveyPage/SurveyShare';
import Preferences from './components/Web/PreferencesPage/PreferencesPage';
import { KakaoIdContext } from "./KakaoIdContext.js";

function App() {
  const [kakaoContext] = useContext(KakaoIdContext);
  return (
<Router>
  <Routes>
    <Route path= '/' element={<Auth/>}/>
    <Route path= '/Home' element={<Home/>}/>
    <Route path='/Inquiry' element={<Inquiry/>}/>
    <Route path='About' element={<About/>}/>
    <Route path='/PickAnswer/:questionId' element={<PickAnswerPage/>}/>
    <Route path='/EditVotePage/:questionId' element={<EditVotePage/>}/>
    <Route path='/MyProfile' element={<MyProfilePage/>}/>
    <Route path='/SurveyFirst' element={<SurveyFirst/>}/>
    <Route path='/SurveySecond' element={<SurveySecond/>}/>
    <Route path='/SurveyCreate' element={<SurveyCreate/>}/>
    <Route path='/SurveyShare/:questionId' element={<SurveyShare/>}/>
    <Route path='/Answer' element={<Answer/>}/>
    <Route path='/Answer/:questionId' element={<Answer/>}/>
    <Route path='/AnswerEnd' element={<AnswerEnd/>}/>
    <Route path='/AnswerEnd/:questionId' element={<AnswerEnd/>}/>
    <Route path='/Preferences' element={<Preferences/>}/>

  </Routes>


</Router>
  );
}

export default App;

