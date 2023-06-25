import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { KakaoIdContext } from '../../../KakaoIdContext.js';

const Div = styled.div`
margin-top: 70px;
`;

const AnswerVote = () => {
  const [kakaoContext] = useContext(KakaoIdContext);
  console.log("userId : ", kakaoContext);//userId
  const unsubscribe = onSnapshot(doc(dbService,"kakaoId",kakaoContext), (doc)=>{
    console.log(" data: ", doc.data());
  }
  )




  return (
    <Div>

    </Div>
  );
};

export default AnswerVote;
