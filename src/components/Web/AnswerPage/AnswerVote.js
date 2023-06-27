import styled from 'styled-components';
import React, { useState, useEffect, useContext } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { KakaoIdContext } from '../../../KakaoIdContext.js';
import { useNavigate, useParams } from 'react-router-dom';

const Div = styled.div`
  margin-top: 70px;
`;

const AnswerVote = () => {
  const [documents, setDocuments] = useState([]);
  const road = collection(dbService, "zip_Answer");
  const { QID } = useParams(); //QuestionID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(road);
        const updatedDocuments = querySnapshot.docs
          .filter((doc) => doc.data().questionId === "")
          .map((doc) => ({
            answer: doc.data().answer,
            voteData: doc.data().totalVote,
            ID: doc.data().answerId
          }));
        setDocuments(updatedDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (totalVote, ID) => {
    const docRef = doc(road, ID);
    try {
      await updateDoc(docRef, {
        totalVote: (totalVote || 0) + 1
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
        </button>
      ))}
    </Div>
  );
};

export default AnswerVote;
