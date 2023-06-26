import styled from 'styled-components';
import React, { useState, useEffect, useContext,  } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
// import { KakaoIdContext } from '../../../KakaoIdContext.js';
// import { useParams } from 'react-router-dom';

const Div = styled.div`
  margin-top: 70px;
`;

const AnswerEnd = () => {
  const [documents, setDocuments] = useState([]);
  const road = collection(dbService, "zip_Answer");

  useEffect(() => {
    const unsubscribe = onSnapshot(road, (querySnapshot) => {
      const updatedDocuments = [];
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().questionId === "") {
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
      {documents.map(({ answer, voteData, ID }) => (
        <div key={ID} >
          Answer: {answer}, {voteData}
        </div> 
      ))}
    </Div>
  );
};

export default AnswerEnd;
