import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, getDocs} from "firebase/firestore";
import {useParams } from 'react-router-dom';
import AddAnswer_Vote from './AddAnswer_Vote.js';
import AddAnswer from './AddAnswer.js';

const Div = styled.div`
  margin-top: 70px;
`;

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const road = collection(dbService, "zip_Answer");
  const [modalOpen, setModalOpen] = useState(false);
  const { questionId } = useParams(); //QuestionID
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const handleButtonClick = (answerId) => {
    setSelectedAnswerId(answerId); // 선택된 버튼의 answerId를 상태로 설정
    setModalOpen(true); // 모달 열기
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("얼마나되는지 확인");
        const querySnapshot = await getDocs(road);
        const updatedDocuments = querySnapshot.docs
          .filter((doc) => doc.data().questionId === questionId)
          .map((doc) => ({
            answer: doc.data().answer,
            voteData: doc.data().totalVote,
            ID: doc.data().answerId

          }));
        setDocuments(updatedDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchData();
  }, []);
  


  const [modalOpen_new, setModalOpen_new] = useState(false);
  const showModal_new = ()=>{
  setModalOpen_new(!modalOpen_new);
};


  return (
    <Div>
      {documents.map(({ answer, voteData, ID }, index) => (
        <div key={ID}>
          <button onClick={() => handleButtonClick(ID)}>
            Answer: {answer}, {voteData}
          </button>
          {modalOpen && selectedAnswerId === ID && (
            <AddAnswer_Vote
              setModalOpen={setModalOpen}
              voteData={voteData}
              answerId={ID}
            />
          )}
        </div>
      ))}
    {documents.length < 10 && (
      <button onClick={showModal_new}>키워드 후보 추가하기</button>
    )}
    {modalOpen_new && <AddAnswer />}
    </Div>
  );
};
export default AnswerVote;
