import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from "../../../fbase.js";
import { addDoc, collection, onSnapshot } from "firebase/firestore";

const AnswerVote = () => {
    const [answer, setAnswer] = useState("");
    const [answerOptions, setAnswerOptions] = useState([]);
    
    const Div = styled.div`
    height: 1000px;
    margin-top: 70px;
    `
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(dbService, 'zip'), (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        const answerData = data.questionId;
        const optionsData = data.answer;

        setAnswer(answerData);
        setAnswerOptions(optionsData);
      });
    });

    return () => {
      // 컴포넌트가 언마운트될 때 구독 해제
      unsubscribe();
    };
  }, []);

  return (
    <Div>
      <p>answer: {answer}</p>
      <p>Options: {answerOptions.join(', ')}</p>
    </Div>
  );
};


export default AnswerVote;
