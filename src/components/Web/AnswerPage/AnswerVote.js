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

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
`;

const modalStyles = {
  content: {
    width: '300px',
    height: '550px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    background: 'var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  }
};
const FolderImageContainer = styled.div`
  position: relative;
  width: 375px;
  height: 196px;
  margin-bottom: 24px;
`;
const FolderImage = styled.img`
  width: 327px;
  height: 125px;
  z-index: 0;
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
  padding-top: 58px;
  width: 48px;
  height: 48px;
`;
const QText = styled.p`
  font-size: 14px;
  margin: 0;
  margin-top: 63px;
  margin-left: 60px;
  margin-bottom: 19px;
  font-weight: 600;
  width: 235px;
  height: 36px;
  font-family: Pretendard;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const CText = styled.p`
  font-size: 12px;
  margin: 0;
  margin-left: 60px;
  font-weight: 600;
  width: 235px;
  height: 14px;
  font-family: Pretendard;
  color: #808080;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
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
      <FolderImageContainer>
        <FolderImage src={samllFolder1} />
        <FolderContent>
          <IMG src={getEmojiImage(emoji)} alt="Emoji" />
          <QText>{questionzip}</QText>
          <CText>{commentzip}</CText>
        </FolderContent>
      </FolderImageContainer>
    {documents.map(({ answer, totalVote, answerId }) => (
      <div key={answerId}>
        <button onClick={() => handleButtonClick(answerId)}>
          Answer: {answer}, {totalVote}, {answerId}
        </button>
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
              handleCloseModal={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    ))}
    
          {documents.length < 10 && (
            <button onClick={showModal_new} key="add-button">키워드 후보 추가하기</button>
          )}
          <Modal isOpen={modalOpen_new} onRequestClose={handleCloseModal_new} style={modalStyles}>
          {modalOpen_new && <AddAnswer key="add-answer" />}
          </Modal>
        </Div>
    
      }
       </>
  );
};

export default AnswerVote;
