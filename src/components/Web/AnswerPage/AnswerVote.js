import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where , orderBy, getDocs } from "firebase/firestore";
import {useNavigate, useParams } from 'react-router-dom';
import AddAnswerVote from './AddAnswerVote.js';
import AddAnswer from './AddAnswer.js';
import AnswerEnd from './AnswerEnd.js';
import Modal from 'react-modal';
import smallFolder1 from '../../../img/smallFolder1.png';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import makeMyAnswer from '../../../img/makeMyAnswer.png';
import newAnswer from '../../../img/newAnswer.png';
import check from '../../../img/check.png'
import answerNo from '../../../img/answerNo.png'
import EndVote from './EndVote.js';

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
margin-left:24px;
`;
const Head3 = styled.div`
color: var(--gray-90, #353535);

/* Body/B6-16-B */
font-family: PretendardBold;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
margin-left:24px;
margin-top: 32px;
`;

const modalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '630px',
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
  width: 327px;
  height: 96px;
  margin-top: 16px;

`;
const FolderContent = styled.div`
  display: flex;
  flex-direction: column;
    border-radius: 10px;
  border: 1px solid var(--orange-primary, #EC582F);
  width: 100%;
  height: 100%;
`;
const IMG = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  margin-top: 24px;
  margin-left: 16px;
`;
const QText = styled.p`
  font-family: PretendardSemi;
  font-size: 14px;
  margin: 0;
  margin-left: 76px;
  font-weight: 600;
  width: 235px;
  word-break: keep-all;
  display: flex;
  margin-top: 27px;
`;
const CText = styled.p`
  font-size: 12px;
  margin-top: 6px;
  margin-left: 76px;
  font-weight: 600;
  width: 235px;
  font-family: Pretendard;
  color: #808080;
  word-break: keep-all;
  display: flex;
`;
const Hr = styled.hr`
  border: 1px dashed #ABABAB; // Specify the border width: ;
  width: 327px;
  margin-bottom: 32px;
  margin-top: 24px;
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
cursor: pointer;
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
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 24px;
margin-left: 24px;
`;
const Header2 = styled.div`
color: var(--gray-60, #808080);

/* Body/B4-14-SB */
font-size: 14px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 24px;
margin-top: 8px;
margin-bottom: 8px;
`;

const NewAnswer = styled.img`
width: 327px;
height: 64px;
margin-top: 16px;
cursor:pointer;
`;
const Warning = styled.div`
  color: var(--primary-orange, #EC582F);
/* Body/B2-12-SB */
font-size: 12px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 16px;
margin-top: 120px;
cursor: default;
`;
const MakeMyAnswer = styled.img`
width: 327px;
height: 48px;
margin-top: 8px;
cursor: pointer;
`;
const Body8 = styled.p`
overflow: hidden;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
color: var(--gray-60, #808080);
text-overflow: ellipsis;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-right: 6px;
cursor: default;
`;
const Body9 = styled.p`
overflow: hidden;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
color: var(--gray-60, #808080);
text-overflow: ellipsis;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 18px;
text-decoration-line: underline;
cursor: pointer;
`;
const PContainer = styled.div`
  display: flex;
margin-bottom: 100px;

`;

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { questionId } = useParams(); //QuestionID
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [voteEnd, setVoteEnd] = useState(true);
  const [questionzip, setQuestionZip] = useState();
  const [commentzip, setCommentZip] = useState();
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState([]);
  const [isVote, setIsVote] = useState(false);
  const [voteNum, setVoteNum] = useState(0);
  const [kakaoId,setKakaoId] = useState("");

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
const onSubmit = () => {
  navigate('/');
}
const myPage = () =>{
  if(kakaoId===localStorage.getItem("kakaoId")) navigate(`/PickAnswer/${questionId}`);
  else navigate('/');
}

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      if (key === questionId) {
        setIsVote(true);
        break;
      }
    }
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
    setQuestionZip(targetQ.question);
    setCommentZip(targetQ.comment);
    setEmoji(targetQ.emoji); 
    setVoteEnd(targetQ.voteEnd); // 투표 종료 여부 판단
    setVoteNum(targetQ.VoteNum);
    setKakaoId(targetQ.kakaoId);
  };

  const [modalOpen_new, setModalOpen_new] = useState(false);
  const showModal_new = () => {
    setModalOpen_new(!modalOpen_new);
  };
  const voteNumIs0 = () => {
    return (voteNum === 0);
  };





  return (
    <>
      {!voteEnd ? (
        <EndVote/> 
       ) : isVote ? (
         <AnswerEnd />
      ) : (
        <Div>
          <Container>
            <Head>질문 폴더를 받으셨네요 🤩️</Head>
            <Head>답변을 보내보세요!</Head>
            <Head3>받은 질문</Head3>
          </Container>

          <FolderImageContainer>
            <FolderContent>
              <IMG src={getEmojiImage(emoji)} alt="Emoji" />
              <QText>{questionzip}</QText>
              <CText>{commentzip}</CText>
            </FolderContent>
          </FolderImageContainer>
          <Hr />
          <Container>
            <Header1>투표 참여하기</Header1>
            <Header2>답변을 투표하거나 새롭게 추가할 수 있어요!</Header2>
          </Container>
          {!voteNumIs0() ?  (
        documents.map(({ answer, totalVote, answerId }) => (
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
                  answer={answer}
                  handleCloseModal={handleCloseModal}
                />
              )}
            </Modal>
          </ButtonContainer>
        ))
      ) : <NewAnswer src={answerNo} style={{ cursor: 'default' }}/>}
  
          <NewAnswer src={newAnswer} onClick={showModal_new} key="add-button"></NewAnswer>
          <Modal isOpen={modalOpen_new} onRequestClose={handleCloseModal_new} style={modalStyles}>
            {modalOpen_new && <AddAnswer key="add-answer" handleCloseModal={handleCloseModal_new} />}
          </Modal>
          <Warning>나도 지인들에게 투표를 받아보고 싶다면?</Warning>
            <MakeMyAnswer src={makeMyAnswer}
                onClick={onSubmit} />
            <PContainer>
              <Body8 onClick={myPage}>내가 만든 질문이라면? </Body8>
              <Body9 onClick={myPage}> 이유 확인하러 가기</Body9>
            </PContainer>
        </Div>
      )}
    </>
  );
  
};

export default AnswerVote;
