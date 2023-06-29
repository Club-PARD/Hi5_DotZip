import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';

const AddAnswerVote = ({ totalVote,answerId }) => {

  const [reason, setReason] = useState("");
  const [nickname, setNickName] = useState("");
  const { questionId } = useParams();
  const road = doc(dbService, "zip_Answer", answerId);
  const navigate = useNavigate();
  const [cachedData, setCachedData] = useState(null); // 캐시된 데이터 상태

  useEffect(() => {
    const fetchData = async () => {
      console.log("gkdl",answerId);
      try {
        if (cachedData) {
          // 캐시된 데이터가 이미 존재하는 경우, 로컬 상태에서 가져옴
          setReason(cachedData.reason);
          setNickName(cachedData.nickname);
        } else {
          // 캐시된 데이터가 없는 경우, 파이어베이스에서 가져옴
          const docSnapshot = await getDocs(road);
          const docData = docSnapshot.docs[0]?.data();
          if (docData) {
            setReason(docData.reason);
            setNickName(docData.nickname);
            setCachedData(docData); // 가져온 데이터를 캐시에 저장
          }
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDoc(road, {
        totalVote: (totalVote || 0) + 1
      });

      await addDoc(collection(dbService, "zip_Reason"), {
        reason: reason,
        answerId: road.id,
        nickname: nickname,
      });

  
      setReason("");
      setNickName("");
      setCachedData(null); // 데이터 캐시 초기화
      navigate(`/AnswerEnd/${questionId}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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

export default AddAnswerVote;
