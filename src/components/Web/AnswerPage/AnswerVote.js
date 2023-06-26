import styled from 'styled-components';
import React, { useState, useEffect, useContext,  } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { KakaoIdContext } from '../../../KakaoIdContext.js';
import { useNavigate, useParams } from 'react-router-dom';

const Div = styled.div`
  margin-top: 70px;
`;

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const road = collection(dbService, "zip_Answer");
  const {QID}= useParams;//QuestionID
  const navigate = useNavigate();

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

  const handleUpdate = async (totalVote, ID) => {
    const docRef = doc(road, ID);
    try {
      await updateDoc(docRef, {
        totalVote: (totalVote || 0) + 1,
      });
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) =>
          doc.ID === ID ? { ...doc, voteData: (totalVote || 0) + 1 } : doc
        )
      );
      navigate('/AnswerEnd');
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Div>
      {documents.map(({ answer, voteData, ID }) => (
        <button key={ID} onClick={() => handleUpdate(voteData, ID)}>
          Answer: {answer}, {voteData}
        </button> //버튼 클릭하면 linkto로 완료된 페이지 가기
      ))}
    </Div>
  );
};

export default AnswerVote;
