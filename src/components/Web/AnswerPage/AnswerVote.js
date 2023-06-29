import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where , orderBy } from "firebase/firestore";
import {useParams } from 'react-router-dom';
import AddAnswerVote from './AddAnswerVote.js';
import AddAnswer from './AddAnswer.js';
import Modal from 'react-modal';

const Div = styled.div`
  margin-top: 70px;
`;
const modalStyles = {
  content: {
    width: '400px',
    height: '60px',
    margin: 'auto',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    backgroundColor: '#fff',
  },
};

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { questionId } = useParams(); //QuestionID
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
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

    return () => {
      unsubscribe();
    };
  }, [questionId]);
  

  const [modalOpen_new, setModalOpen_new] = useState(false);
  const showModal_new = ()=>{
  setModalOpen_new(!modalOpen_new);
};


  return (
    <Div>
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
  );
};

export default AnswerVote;