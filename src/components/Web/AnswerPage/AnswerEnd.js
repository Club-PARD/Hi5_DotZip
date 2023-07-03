import styled from 'styled-components';
import React, { useState, useEffect} from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where , orderBy, doc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
// import { KakaoIdContext } from '../../../KakaoIdContext.js';
// import { useParams } from 'react-router-dom';

const Div = styled.div`
  margin-top: 70px;
`;
const Header1 = styled.div`
  font-family: 'Pretendard', sans-serif;  
 font-size: 18px;

`;

const VoteBox = styled.div`
    width: 500px;
    height: 60px;
    margin: 5px;
    border: 1px solid black;
    background: linear-gradient(to right, pink ${props => props.percentage}%, yellow ${props => props.percentage}%);
    color: #000000;
`;

const AnswerEnd = () => {
  
  const [documents, setDocuments] = useState([]);
  const totalVotes = documents.reduce((sum, documents) => sum + documents.totalVote, 0);
  const {questionId} = useParams();
  const navigate= useNavigate();
  const userName = localStorage.getItem("userName")
  const updateVoteNum = async (newVoteNum) => {
    const questionRef = doc(dbService, 'zip_Question', questionId);
    await updateDoc(questionRef, {
      VoteNum: newVoteNum
    });
  };

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
  updateVoteNum(totalVotes);
  
  localStorage.setItem("questionId",questionId);

  return (
    <Div>
      <Header1>답변이 잘 전달되었어요</Header1>
      <div>{userName}님을 매우 잘 아시는군요?</div>
      <div>답변 결과</div>
      <div>추천 문구!</div>
      {documents.map(({ answer, totalVote, answerId }) => (
  <VoteBox key={answerId} percentage={(totalVote / totalVotes) * 100}>{answer} : {totalVote}</VoteBox>
      ))}

    <button onClick={onSubmit}>내 ZIP도 만들어보시는거 어떤가요?</button>

    </Div>

  );
};

export default AnswerEnd;
