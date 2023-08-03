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
import emoji2 from '../../../img/emoji2.png';
import tip from '../../../img/TipHeart.png'
import 'firebase/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import addMyVote from '../../../img/addMyVote.png'



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
`;
const AddVote = styled.img`
width: 327px;
height: 64px;
margin-top: 8px;
/* margin-left: 24px; */
margin-bottom: 16px;
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




const Question2Create = () => {
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

    return (
        <Div>
            <Survey>
          <AddVote src={addMyVote} onClick={showModal} ></AddVote>
          <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
          {modalOpen && <AddAnswerQuest key="add-answer"  handleCloseModal={handleCloseModal} />}
          </Modal>
          </Survey>
        </Div>
      );
    };

export default Question2Create;




