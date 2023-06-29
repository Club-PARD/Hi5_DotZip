import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where , orderBy} from 'firebase/firestore';
import styled from 'styled-components';

const Div = styled.div`

`;
const Question = styled.button`
    background: #EEFF01;
    width : 400px;
    height : 100px;
    margin : 5px;
`;
const VotingPage = () => {
    const kakaoId = localStorage.getItem("kakaoId");
    const [userNickname] = useState(localStorage.getItem("userName"));
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const q = query(
          collection(dbService, 'zip_Question'),
          where('kakaoId', '==', kakaoId),
          orderBy('timestamp', 'desc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const questionList = [];
          snapshot.forEach((doc) => {
            if (doc.data().kakaoId === kakaoId) {
              questionList.push(doc.data());
            }
          });
          setQuestions(questionList);
        });
      
        return () => {
          unsubscribe();
        };
      }, [kakaoId]);

      const navigate = useNavigate();
      const handleQuestionClick = (questionId) => {
        navigate(`/PickAnswer/${questionId}`);
      };
    return(
        <Div>
        <h1>VOTE ME!</h1>
        <h2>{userNickname}님의 만든 폴더</h2>
        <h3>내가 생성한 폴더의 답변을 확인해보세요.</h3>
        {questions.map((question) => (
        <div key={question.questionId}>
          {question && question.question && (
          <Question onClick={() => handleQuestionClick(question.questionId)}>
            Question: {question.question} <br />
            Comment: {question.comment}
          </Question>
          )}
        </div>
        ))}
        </Div>
    );
};

export default VotingPage;