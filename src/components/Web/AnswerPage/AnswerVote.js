import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where , orderBy, getDocs } from "firebase/firestore";
import {useParams } from 'react-router-dom';
import AddAnswerVote from './AddAnswerVote.js';
import AddAnswer from './AddAnswer.js';
import AnswerEnd from './AnswerEnd.js';
import Modal from 'react-modal';
import samllFolder1 from '../../../img/smallFolder1.png';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import newAnswer from '../../../img/newAnswer.png';
import check from '../../../img/check.png'

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;
const Head = styled.div`
  color: var(--gray-90, #353535);
/* Head/H4-24-32-B */
font-size: 24px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 32px;
margin-left:18px;
`;

const modalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '610px',
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

const FolderImageContainer = styled.div`
  position: relative;
  width: 357px;
  margin-top: 32px;

`;
const FolderImage = styled.img`

  width: 100%;
  height: 100%;
`;
const FolderContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 32px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const IMG = styled.img`
  position: absolute;
  padding-top: 60px;
  width: 48px;
  height: 48px;
  margin-left: 5px;
`;
const QText = styled.p`
  font-family: Pretendard;
  font-size: 14px;
  margin: 0;
  margin-top: 60px;
  margin-left: 76px;
  font-weight: 600;
  width: 235px;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const CText = styled.p`
  font-size: 12px;
  margin-top: 8px;
  margin-left: 76px;
  font-weight: 600;
  width: 235px;
  font-family: Pretendard;
  color: #808080;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const Hr = styled.hr`
  border: 1px dashed #ABABAB; // Specify the border width: ;
  width: 327px;
  margin-bottom: 32px;
  margin-top: 32px;
`;
const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
position: relative;
width: 327px;
height: 64px;
border-radius: 8px;
border: 1px solid var(--gray-30, #ABABAB);
text-align: left;
background: transparent;
color: var(--gray-90, #353535);
font-size: 18px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 24px;
margin-top: 16px;
`;
const Check = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  margin-top: 2px;
  right: 16px;
`;
const Container = styled.div`
  width: 375px;
`;
const Header1 = styled.div`
  color: var(--black-90, #212121);
font-size: 20px;
font-family: Pretendard;
font-style: normal;
font-weight: 700;
line-height: 24px;
margin-left: 24px;
`;
const Header2 = styled.div`
color: var(--gray-60, #808080);

/* Body/B4-14-SB */
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 24px;
margin-top: 2px;
margin-bottom: 8px;
`;

const NewAnswer = styled.img`
width: 327px;
height: 64px;
margin-top: 16px;
margin-bottom: 120px;
`;

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { questionId } = useParams(); //QuestionID
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [voteEnd, setVoteEnd] = useState(true);
  const [questionzip, setQuestionZip] = useState();
  const [commentzip, setCommentZip] = useState();
  const [emoji, setEmoji] = useState([]);

  const handleButtonClick = (answerId) => {
    setSelectedAnswerId(answerId); // 선택된 버튼의 answerId를 상태로 설정
    setModalOpen(true); // 모달 열기
    localStorage.setItem(questionId, answerId); // localStorage에 (questionId, answerId) 저장
  };
  const handleCloseModal_new = () => {
    setModalOpen_new(false);
};
const handleCloseModal = () => {
  setModalOpen(false);
};

  useEffect(() => {

    const q = query(
      collection(dbService, 'zip_Answer'),
      where('questionId', '==', questionId), 
      orderBy('timestamp', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const answerList = [];
      snapshot.forEach((doc)=>{
        if(doc.data().questionId===questionId){
          answerList.push(doc.data());
        }
      });
      setDocuments(answerList);
    });
    fetchDataQuestion();

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


  const fetchDataQuestion = async () => {
    const zipCollection = collection(dbService, "zip_Question");
    const zipQSnapshot = await getDocs(zipCollection);
    const QuestionzipArr = zipQSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const targetQ = QuestionzipArr.find((user) => user.id === questionId);
    console.log(targetQ);
    setQuestionZip(targetQ.question);
    setCommentZip(targetQ.comment);
    setEmoji(targetQ.emoji); 
    setVoteEnd(targetQ.voteEnd); // 투표 종료 여부 판단
  };
  
  
  const isVote = () => {
    return questionId === localStorage.getItem("questionId");
  };

  

  const [modalOpen_new, setModalOpen_new] = useState(false);
  const showModal_new = () => {
    setModalOpen_new(!modalOpen_new);
  };




  return (
    <>{isVote() ? <AnswerEnd /> :
    <Div>
      <Container>
      <Head>질문 폴더를 받으셨네요 🤩️</Head>
      <Head>답변을 보내보세요!</Head>
      </Container>
      <FolderImageContainer>
        <FolderImage src={samllFolder1} />
        <FolderContent>
          <IMG src={getEmojiImage(emoji)} alt="Emoji" />
          <QText>{questionzip}</QText>
          <CText>{commentzip}</CText>
        </FolderContent>
      </FolderImageContainer>
      <Hr></Hr>
      <Container>
      <Header1>투표 참여하기</Header1>
      <Header2>답변을 투표하거나 새롭게 추가할 수 있어요!</Header2>
      </Container>
    {documents.map(({ answer, totalVote, answerId }) => (
      <ButtonContainer key={answerId}>
        <Button onClick={() => handleButtonClick(answerId)}>
          {answer}
          <Check src={check} />
        </Button>
        <Modal
          isOpen={modalOpen && selectedAnswerId === answerId}
          onRequestClose={handleCloseModal}
          style={modalStyles}
        >
          {modalOpen && selectedAnswerId === answerId && (
            <AddAnswerVote
              key={answerId}
              setModalOpen={setModalOpen}
              totalVote={totalVote}
              answerId={answerId}
              answer = {answer}
              handleCloseModal={handleCloseModal}
            />
          )}
        </Modal>
      </ButtonContainer>
    ))}
    
            <NewAnswer src={newAnswer} onClick={showModal_new} key="add-button"></NewAnswer>
          <Modal isOpen={modalOpen_new} onRequestClose={handleCloseModal_new} style={modalStyles}>
          {modalOpen_new && <AddAnswer key="add-answer" handleCloseModal={handleCloseModal_new} />}
          </Modal>
        </Div>
    
      }
       </>
  );
};

export default AnswerVote;
