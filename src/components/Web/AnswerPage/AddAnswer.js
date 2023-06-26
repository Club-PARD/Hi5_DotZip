import React, { useState } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, addDoc,updateDoc } from "firebase/firestore";

const AddAnswer = () => {
  const [answer, setAnswer] = useState("");
  const kakaoId = "2861055889";
  const questionId = "Dz8akNMoanATfITviinB";
  const road =collection(dbService, "zip_Answer", "zip",  "zip_answer");//다시 고치기
  const data = {
    answer: answer,
    totalVote: 0,
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if(answer!==""){
    try {
      const newDocRef = await addDoc(road, 
      data);
      
      await updateDoc(newDocRef, {
        docID : newDocRef.id,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setAnswer("");
  }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setAnswer(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={answer}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Answer" />
      </form>
    </div>
  );
};

export default AddAnswer;
