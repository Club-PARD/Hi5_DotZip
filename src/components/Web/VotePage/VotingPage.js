import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where , orderBy} from 'firebase/firestore';
import styled from 'styled-components';

const Div = styled.div`
color:black;
`;
const P = styled.button`
background: #EEFF01;
 
`;
const VotingPage = () => {
    const kakaoId = localStorage.getItem("kakaoId");
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
          <p>votingpage</p>
        <h3>진행중인 .Zip</h3>
        {questions.map((question) => (
        <div key={question.questionId}>
          {question && question.question && (
          <P onClick={() => handleQuestionClick(question.questionId)}>
            Question: {question.question} <br />
            Comment: {question.comment}
          </P>
          )}
        </div>
        ))}
        </Div>
    );
};

export default VotingPage;