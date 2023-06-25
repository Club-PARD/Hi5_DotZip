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
  // console.log("userId : ", kakaoContext); // userId
  const [documents, setDocuments] = useState([]);
  const road =collection(dbService, "kakaoId", "2861055889", "zip", "Dz8akNMoanATfITviinB", "zip_answer");
  useEffect(() => {
    const unsubscribe = onSnapshot(road, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data().answer);
      const voteData = querySnapshot.docs.map((doc) => doc.data().totalVote);
      const ID = querySnapshot.docs.map((doc) => doc.data().docID);
      const combinedData = data.map((answer, index) => ({
        answer,
        votedata: voteData[index],
        ID : ID[index]
      }));
      setDocuments(combinedData);
      // console.log("KakaoId documents:", data);
      // console.log("Vote:", voteData);
    });

    return () => {
      unsubscribe(); // 감시 중지
    };
  }, []);

  const handleUpdate = async (totalVote, ID) => {
    const docRef = doc(road, ID);//여기에다가 각자의 문서 ID를 넣어야 함ㄴ
    try {
      await updateDoc(docRef, {
        totalVote: (totalVote || 0) + 1,
        
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  }

  return (
    <Div>
      {documents.map(({ answer, votedata, ID }) => (
        <button key={answer} onClick={() => handleUpdate(votedata, ID)}>
          Answer: {answer} , {votedata}
        </button>
      ))}
    </Div>
  );
};

export default AnswerVote;
