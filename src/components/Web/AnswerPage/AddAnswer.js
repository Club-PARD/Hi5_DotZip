import React, { useState } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, addDoc,updateDoc } from "firebase/firestore";

const AddAnswer = () => {
  const [answer, setAnswer] = useState("");
  const road =collection(dbService, "kakaoId", "2861055889", "zip", "Dz8akNMoanATfITviinB", "zip_answer");
  const data = {
    answer: answer,
    totalVote: 0,
  }
  const onSubmit = async (e) => {
    e.preventDefault();
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
