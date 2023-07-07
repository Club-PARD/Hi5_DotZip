import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, deleteDoc,updateDoc, doc, onSnapshot,serverTimestamp } from 'firebase/firestore';
import styled from 'styled-components';

import progress from '../../../img/Line2.png'
import addVote from '../../../img/addVote.png'
import AddAnswerQuest from '../AnswerPage/AddAnswerQuest';
import Modal from 'react-modal';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import back from '../../../img/back.png';

const DDiv = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;
const Div = styled.div`
  width: 100%;
  margin-right: 15px;
`;
const NavbarWrapper = styled.nav`
  width: 327px;
  display: flex;
  height: 73px;
  align-items: center;
`;

const BackButton = styled.img`
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 23px;
  width: 7px;
  height: 14px;

`;


const HeaderP = styled.header`
  width: 100%;
  height: 19px;
  color: var(--gray-60, #808080);
text-align: left;
margin-top: 17px;
/* Body/B4-14-SB */
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-bottom: 12px;
`;

const HeaderDiv = styled.header`
  width : 100%;
  height: 19px;
  font-size: 24px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
text-align: left;
  color: var(--gray-90, #353535);
`;

const MyQues = styled.header`
  width: 105px;
height: 20px;
left: 24px;
margin-top: 32px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
text-align: left;
  color: var(--gray-90, #353535);
`;


const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
    width: 327px;
  margin-top: 20px;
  margin-left: 13px;
`;

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
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
  margin-top: 12px;
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
font-family: PretendardSemi;
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
  margin-right: 103px;
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
margin-left: 12px;
cursor: pointer;
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




const MyAnsewer = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [comment, setComment] = useState('');
    const [userNickname] = useState(localStorage.getItem("userName"));
    const [emoji,setEmoji] = useState('');
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const showModal = ()=>{
    setModalOpen(!modalOpen);
  };

  
    useEffect(() => {
      window.scrollTo(0, 0);
      const unsubscribe = onSnapshot(doc(dbService, 'zip_Question', questionId), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setQuestion(data.question);
          setComment(data.comment);
          setEmoji(data.emoji);
        } else {
          // Handle case when document does not exist
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, [questionId]);

    const getEmojiImage = (emoji) => {
      switch (emoji) {
        case 'emoji1':
          return emoji1;
        case 'emoji2':
          return emoji2;
        case 'emoji3':
          return emoji3;
        case 'emoji4':
          return emoji4;
        case 'emoji5':
          return emoji5;
        default:
          return null;
      }
    };
    
      const handleButtonClick = () => {
        navigate(`/SurveyShare/${questionId}`);
      };
      const fbDelete = async() =>{
          try {
            const questionRef = doc(dbService, 'zip_Question', questionId);
            await deleteDoc(questionRef);
            console.log('문서가 성공적으로 삭제되었습니다.');
            navigate(-1);
            // 삭제 후 필요한 작업 수행
          } catch (error) {
            console.error('문서 삭제 중 오류가 발생했습니다:', error);
            // 오류 처리
          }
        };

      
    

    return (
      <DDiv>
        
        <Div>
        <NavbarWrapper>
            <BackButton src= {back} onClick={fbDelete}></BackButton>
          </NavbarWrapper>
          <Survey>
          <Progress src={progress}/>
            <Header2>
              <HeaderDiv>질문 선택 완료!</HeaderDiv>
              <HeaderP>투표 항목에 내가 생각하는 답변을 추가해보세요.</HeaderP>
              <MyQues>내가 선택한 질문</MyQues>
              <Container>
                <Question>{question}</Question>
                <Comment>{comment}</Comment>
                <IMG src={getEmojiImage(emoji)} alt="Emoji"></IMG>
                </Container>
                <Hr></Hr>
            </Header2>
            
          <AddVote src={addVote} onClick={showModal} ></AddVote>
          <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
          {modalOpen && <AddAnswerQuest key="add-answer"  handleCloseModal={handleCloseModal} />}
          </Modal>
          </Survey>
        </Div>
        </DDiv>
      );
    };

export default MyAnsewer;





