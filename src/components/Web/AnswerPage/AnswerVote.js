import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";

const AnswerVote = () => {
  const [answerDataList, setAnswerDataList] = useState([]);

  const Div = styled.div`
    margin-top: 70px;
  `;

  useEffect(() => {
    const fetchData = () => {
      const unsubscribe = onSnapshot(collection(dbService, 'zip'), (querySnapshot) => {
        const newDataList = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const answerData = data.questionId;
          const optionsData = data.answer.map((option, optionIndex) => {
            return {
              number: optionIndex + 1,
              value: option
            };
          });
          const totalVote = data.totalVote.map((vote, voteIndex) => {
            return {
              number: voteIndex + 1,
              value: vote
            };
          });
          if (0 === answerData) {
            newDataList.push({
              totalVote: totalVote,
              answer: answerData,
              options: optionsData
            });
          }
        });

        setAnswerDataList(newDataList);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, []);

  const handleVote = async (index) => {
    console.log(index);
    try {
      const docRef = doc(dbService, 'zip', 'UlVihiettYAZbYXnNHxG');
      await updateDoc(docRef, { totalVote: answerDataList.totalVote[index] + 1});
    } catch (error) {
      console.error("Error voting:", error);
    }
  };



  return (
    <Div>
      {answerDataList.map((data) => (
        <div key={data.answer}>
          <p>Answer: {data.answer}</p>
          <p>
            Options:
            {data.options.map((option) => (
              <button key={option.number} onClick={() => handleVote(option.number - 1)}>
                {option.number}. {option.value}
              </button>
            ))}
          </p>
        </div>
      ))}
    </Div>
  );
};

export default AnswerVote;
