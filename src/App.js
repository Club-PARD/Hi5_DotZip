import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Inquiry from './pages/Inquiry';
import About from './pages/About';
import PickAnswerPage from './components/Web/VotePage/PickAnswerPage';
import MyProfilePage from './components/Web/ProfilePage/MyProfilePage';
import MyProfileSharePage from './components/Web/ProfilePage/MyProfileSharePage';
import SurveyFirst from './components/Web/SurveyPage/SurveyFirst';
import SurveySecond from './components/Web/SurveyPage/SurveySecond';
import SurveyNew from './components/Web/SurveyPage/SurveyNew';
import SurveyCreate from './components/Web/SurveyPage/SurveyCreate';
import MyAnswer from './components/Web/SurveyPage/MyAnswer';
import Answer from './pages/Answer';
import AnswerEnd from './components/Web/AnswerPage/AnswerEnd';
import SurveyShare from './components/Web/SurveyPage/SurveyShare';
import Setting from './components/Web/SettingPage/Setting';
import VotingPage from './components/Web/VotePage/VotingPage';
import AnswerLoading from './components/Web/AnswerPage/AnswerLoading';
import HomeLoading from './components/Web/HomePage/HomeKakaoId';
import SurveyMyFold from './components/Web/SurveyPage/SurveyMyFold'

function App() {
  const kakaoId =  localStorage.getItem("kakaoId")
  //로컬스토리지로 파람스를 저장하고 파람스와 로컬스토리지가 같을경우 투표한 걸로 챙긴다.
  return (
    
<Router>
  <Routes>
    <Route path= '/' element={<Auth/>}/>
    <Route path="/Home" element= {<Home/>}/>
    <Route path='/Inquiry' element={<Inquiry/>}/>
    <Route path='About' element={<About/>}/>
    <Route path='/VotingPage' element={<VotingPage/>}/>
    <Route path='/PickAnswer/:questionId' element={<PickAnswerPage/>}/>
    <Route path='/MyProfile' element={<MyProfilePage/>}/>
    <Route path='/MyProfileSharePage/:hashId' element={<MyProfileSharePage/>}/>
    <Route path='/SurveyFirst' element={<SurveyFirst/>}/>
    <Route path='/SurveySecond' element={<SurveySecond/>}/>
    <Route path='/SurveyCreate' element={<SurveyCreate/>}/>
    <Route path='/SurveyNew' element={<SurveyNew/>}/>
    <Route path='/SurveyMyFold/:questionId' element={<SurveyMyFold/>}/>
    <Route path='/MyAnswer/:questionId' element={<MyAnswer/>}/>
    <Route path='/SurveyShare/:questionId' element={<SurveyShare/>}/>
    <Route path='/Answer' element={<Answer/>}/>
    <Route path='/Answer/:questionId' element={<Answer/>}/>
    <Route path='/AnswerEnd' element={<AnswerEnd/>}/>
    <Route path='/AnswerEnd/:questionId' element={<AnswerEnd/>}/>
    <Route path='/AnswerLoading' element={<AnswerLoading/>}/>
    <Route path='/AnswerLoading/:questionId' element={<AnswerLoading/>}/>
    <Route path='/Setting' element={<Setting/>}/>
    <Route path='/kakao' element={<HomeLoading/>}/>
  </Routes>


</Router>
  );
}

export default App;

