import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection,setDoc, addDoc,updateDoc, doc, onSnapshot,serverTimestamp } from 'firebase/firestore';
import styled from 'styled-components';
import BackNavBar from '../../BackNavbar'
import progress from '../../../img/Line2.png'
import tipimage from '../../../img/Tip.png'
import addVote from '../../../img/addVote.png'
import AddAnswerQuest from '../AnswerPage/AddAnswerQuest';
import Modal from 'react-modal';
import emoji1 from '../../../img/emoji1.png';
import tip from '../../../img/TipHeart.png'
import 'firebase/compat/auth';
import { v4 as uuidv4 } from 'uuid';



const Div = styled.div`
  
`;

const HeaderP = styled.p`
  width: 260px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 19px;
  color: #818181;
`;

const HeaderDiv = styled.header`
color: var(--gray-90, #353535);
/* Head/H3-24-B */
font-size: 24px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 28px;
`;


const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
`;

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  margin: 0 auto;
  overflow-x: hidden;
`;
const Container = styled.div`
  position: relative;
  width: 327px;
  height: 96px;
  border: none;
  border-radius: 10px;
  background: var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%));
  color: var(--black-90, #212121);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 32px;
`;
const IMG = styled.img`
  position: absolute;
  top: 50%; /* 추가: IMG 요소를 수직 방향으로 중간으로 이동시키기 위해 */
  transform: translateY(-50%); 
  width: 48px;
  height: 48px;
  margin-left: 16px;
`;
const Question =styled.div`
color: var(--black-90, #212121);
/* Body/B4-14-SB */
width: 235px;
font-size: 14px;
font-family: PretendardBold;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 76px;
margin-top: 27px;
word-break: keep-all;
`;
const Comment =styled.div`
color: var(--gray-60, #808080);
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 500;
line-height: 16px;
margin-left: 76px;
margin-top: 6px;
`;
const Progress = styled.img`
  width: 260px;
  height: 1.5px;
  margin-right: 115px;
`;

const Hr = styled.hr`
width: 327px;
height: 0px;
color:#ABABAB ;
margin-top: 32px;
margin-bottom: 32px;
border : 0px;
border-top: 1px dashed #ABABAB;
`;
const AddVote = styled.img`
width: 327px;
height: 64px;
margin-top: 8px;
`;
const NoAnswer = styled.img`
width: 327px;
height: 48px;
margin-top: 16px;
`;

const Tip = styled.p`
color: var(--gray-90, #353535);
/* Body/B1-12-M */
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 500;
line-height: 16px;
width: 168px;
height: 16px;
top: 385px;
left: 103px;
margin-left: 8px;


`;
const TipCon = styled.p`
display: flex;
align-items: center;
`;
const Submit = styled.p`
border: white;
height: 48px;
left: 24px;
margin-top: 16px;
color: #808080;
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;

`;
const Img = styled.img`
width: 55px;
Height: 24px;
`;

const modalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '300px',
      borderRadius: '10px',
      background: 'var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))',
      margin: 'auto',
      padding: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex: '2',
      borderStyle : 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: '2',
    },
};




const Question1Create = () => {
    const navigate = useNavigate();
    // const [kakaoContext] = useContext(KakaoIdContext);
    // console.log("zip userId : ", kakaoContext);//userId
    const kakaoId = localStorage.getItem("kakaoId");
    //console.log(localStorage.getItem("kakaoId"));
    const [currentUser, setCurrentUser] = useState(null);
    const [question, setQuestion] = useState('');
    const [comment, setComment] = useState('');
    const [voteEnd, setIsBooleanValue] = useState(true); 
    const [userNickname] = useState(localStorage.getItem("userName"));
    //console.log("username: ", userContext);
    const [selectedEmoji, setSelectedEmoji] = useState(null); // New state for the selected emoji
    const [modalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
      };
      const showModal = ()=>{
        setModalOpen(!modalOpen);
      };

    useEffect(() => {
      console.log(kakaoId); // Print kakaoId value only once
    }, []);

  
    const handleButtonClick = async () => {
      try {
        if (!kakaoId) {
          throw new Error('User not logged in');
        }
    
        const questionId = uuidv4();
        const timestamp = serverTimestamp(); // Firebase 서버 시간으로 생성

    
        // Firestore에 데이터 저장
        await setDoc(doc(dbService, 'zip_Question', questionId), {
          kakaoId,
          questionId,
          question: "나의 이미지에 어울리는 컬러는?",
          comment: "나의 성격과 떠오르는 이미지를 연관지어보세요!",
          voteEnd,
          emoji: "emoji1", // Include the selected emoji value in the data
          timestamp,
          VoteNum:1
        });
    
        console.log('Data saved successfully');
      setQuestion('');
      setComment('');
      setSelectedEmoji(null);
      navigate(`/SurveyShare/${questionId}`);
      //navigate(`/SurveyShare/${questionId}?question=${question}&comment=${comment}`);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

    return (
        <Div>
          <BackNavBar/>
          <Survey>
          <Progress src={progress}/>
            <Header2>
              <HeaderDiv>나에 대해 생각해보세요!</HeaderDiv>
              <HeaderP>답변 키워드와 이유를 적어 투표 후보에 추가해보세요.</HeaderP>
              <Container>
                <Question>나의 이미지에 어울리는 컬러는?</Question>
                <Comment>나의 성격과 떠오르는 이미지를 연관지어보세요!</Comment>
                <IMG src={emoji1} alt="Emoji"></IMG>
                </Container>
                <Hr></Hr>
                <TipCon>
                <Img src={tip}/>
                <Tip>내가 생각하는 답변을 추가해보세요!</Tip>
                </TipCon>
            </Header2>
            
          <AddVote src={addVote} onClick={showModal} ></AddVote>
          <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
          {modalOpen && <AddAnswerQuest key="add-answer"  handleCloseModal={handleCloseModal} />}
          </Modal>
          {/* <Submit onClick={handleButtonClick}>항목 추가 없이 투표 등록하기</Submit>   */}
          </Survey>
        </Div>
      );
    };

export default Question1Create;





