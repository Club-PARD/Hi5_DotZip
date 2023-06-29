import styled from 'styled-components';
import React, { useState, useEffect} from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where , orderBy } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
// import { KakaoIdContext } from '../../../KakaoIdContext.js';
// import { useParams } from 'react-router-dom';

const Div = styled.div`
  margin-top: 70px;
`;

const AnswerEnd = () => {
  const [documents, setDocuments] = useState([]);
  const road = collection(dbService, "zip_Answer");
  const {questionId} = useParams();
  const navigate= useNavigate();
  const userName = localStorage.getItem("userName")
  const onSubmit= ()=>{
    navigate('/');
  }
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
  

  return (
    <Div>
      <div>답변이 잘 전달되었어요</div>
      <div>{userName}님을 매우 잘 아시는군요?</div>
      <div>답변 결과</div>
      <div>추천 문구!</div>
      {documents.map(({ answer, totalVote, ID }) => (
        <div key={ID} >
          Answer: {answer}, {totalVote}
        </div> 
      ))}

    <button onClick={onSubmit}>헬로</button>

    </Div>

  );
};

export default AnswerEnd;
