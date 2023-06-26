import React, { useState } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, addDoc,updateDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';

const AddAnswer = () => {
  const [answer, setAnswer] = useState("");
  const [reason, setReason] = useState("");
  const [nickname, setNickName] = useState("");
  const {id} = useParams(); //이변수
  const road =collection(dbService, "zip_Answer");//다시 고치기
  const data = {
    answer: answer,
    totalVote: 0,
    questionId :"",//params로 받은 변수 넣기
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if(answer!==""){
    try {
      const newDocRef = await addDoc(road, 
      data);
      
      await updateDoc(newDocRef, {
        answerId : newDocRef.id,
      });
      await addDoc(collection(dbService, "zip_Reason"),{
        reason : reason,
        answerId : newDocRef.id,
        nickname : nickname,
      } 
      );
      setAnswer("");
      setReason("");
      setNickName("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }

  }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setAnswer(value);
  };

  const onChangeReason = (e) => {
    const { value } = e.target;
    setReason(value);
  };
  const onChangenickName = (e) => {
    const { value } = e.target;
    setNickName(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
      <input
          value={nickname}
          onChange={onChangenickName}
          type="text"
          placeholder="nickName"
          maxLength={120}
        />
        <input
          value={answer}
          onChange={onChange}
          type="text"
          placeholder="answer"
          maxLength={120}
        />
          <input
          value={reason}
          onChange={onChangeReason}
          type="text"
          placeholder="Reason"
          maxLength={120}
        />
        <input type="submit" value="Answer" />
      </form>
    </div>
  );
};

export default AddAnswer;
