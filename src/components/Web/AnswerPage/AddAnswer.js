import React, { useState } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, addDoc } from "firebase/firestore";

const AddAnswer = () => {
  const [answer, setAnswer] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(dbService, "zip", "UlVihiettYAZbYXnNHxG"), 
      answer[3]);
      console.log("Document written successfully");
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
