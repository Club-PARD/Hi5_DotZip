import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where , orderBy } from "firebase/firestore";
import {useParams } from 'react-router-dom';
import AddAnswerVote from './AddAnswerVote.js';
import AddAnswer from './AddAnswer.js';

const Div = styled.div`
  margin-top: 70px;
`;

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { questionId } = useParams(); //QuestionID
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const handleButtonClick = (answerId) => {
    setSelectedAnswerId(answerId); // 선택된 버튼의 answerId를 상태로 설정
    setModalOpen(true); // 모달 열기
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
        <div >
          <button onClick={() => handleButtonClick(answerId)}>
            Answer: {answer}, {totalVote},{answerId}
          </button>
          {modalOpen && selectedAnswerId === answerId && (
            <AddAnswerVote
              key={answerId} // 고유한 key prop 추가
              setModalOpen={setModalOpen}
              totalVote={totalVote}
              answerId={answerId}
            />
          )}
        </div>
      ))}
      {documents.length < 10 && (
        <button onClick={showModal_new} key="add-button">키워드 후보 추가하기</button>
      )}
      {modalOpen_new && <AddAnswer key="add-answer" />}
    </Div>
  );
};

export default AnswerVote;