import styled from 'styled-components';
import React, { useState, useEffect} from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot  } from "firebase/firestore";
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
    const unsubscribe = onSnapshot(road, (querySnapshot) => {
      console.log("durleh answp djqtrpTwl?");
      const updatedDocuments = [];
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().questionId === questionId) {
          const data = doc.data().answer;
          const voteData = doc.data().totalVote;
          const ID = doc.data().answerId;
          const combinedData = {
            answer: data,
            voteData: voteData,
            ID: ID,
          };
          updatedDocuments.push(combinedData);
        }
      });
      setDocuments(updatedDocuments);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Div>
      <div>답변이 잘 전달되었어요</div>
      <div>{userName}님을 매우 잘 아시는군요?</div>
      <div>답변 결과</div>
      <div>추천 문구!</div>
      {documents.map(({ answer, voteData, ID }) => (
        <div key={ID} >
          Answer: {answer}, {voteData}
        </div> 
      ))}

    <button onClick={onSubmit}>헬로</button>

    </Div>

  );
};

export default AnswerEnd;
