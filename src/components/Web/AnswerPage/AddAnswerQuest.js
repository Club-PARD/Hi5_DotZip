import React, { useState } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, updateDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { css, styled } from 'styled-components';
import cancleX from "../../../img/CancelX.png"

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 32px;
  & > div {
    text-align: left;
    margin-bottom: 5px;
  }
`;

const Header1 = styled.div `
  font-family: PretendardBold;
  position: relative;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  cursor: default;
`;
const X = styled.img`
width: 24px;
height: 24px;
  position: absolute;
  right: 1px;
  cursor: pointer;
`;

const Header2 = styled.div`
  font-size: 16px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  margin-top: 32px;
`;

const Input = styled.input`
  ::placeholder {
    /* placeholder 스타일 */
    color:  var(--gray-60, #808080);
  }
  color: var(--black-90, #212121);
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  border-radius: 8px;
  border: 1px solid var(--gray-60, #808080);
  backdrop-filter: blur(2px);
  width: 295px;
  height: 48px;
  background-color: transparent; 
  padding-left: 16px;

  &:focus {
    border: none;
    outline: 1px solid var(--primary-orange, #EC582F);
  }
`;

const InputNum = styled.span`
  text-align: right;
  color: var(--gray-60, #808080);
  font-size: 12px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

const Submit = styled.input`
  border-radius: 24px;
  background: ${({ isAnswerEmpty }) => (isAnswerEmpty ? "var(--white-100, #FFF)" : 'var(--background-orange, #FFF8F3);')};
  width: 180px;
  height: 48px;
  border-style: none;
  gap: 4px;
  color: ${({ isAnswerEmpty }) => (isAnswerEmpty ? 'var(--gray-60, #808080)' : '#EC582F')};

  /* Body/B1-14-SB */
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  margin-top: 24px;
`;

const DDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
`;

const AddAnswerQuest = ({ handleCloseModal }) => {
  const closeModal = () => {
    // 모달 닫기 로직 구현
    handleCloseModal(); // handleCloseModal 함수 호출
  };

  const [answer, setAnswer] = useState("");
  const { questionId } = useParams();
  const road = collection(dbService, "zip_Answer");
  const navigate = useNavigate();
  const nickname = localStorage.getItem("userName");
  const timestamp = serverTimestamp();
  const [inputCountName, setInputCountName] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const kakaoId = localStorage.getItem("kakaoId");
  const data = {
    answer: answer,
    totalVote: 1,
    questionId: questionId, //params로 받은 변수 넣기
    timestamp,
    kakaoId: kakaoId
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return; // 이미 제출 중인 경우 중복 제출 방지
    }
    setIsSubmitting(true);
    try {
      const newDocRef = await addDoc(road, data);
      await updateDoc(newDocRef, {
        answerId: newDocRef.id,
      });
      await addDoc(collection(dbService, "zip_Reason"), {
        reason: "내가 선택한건\n이유를 작성하지 않아요.\n\n 다른 사람들의\n 답변을 받고\n 이유를 확인해보세요!",
        answerId: newDocRef.id,
        nickname: nickname,
      });
      setAnswer("");
      navigate(`/PickAnswer/${questionId}`);
    } catch (error) {
      console.error("Error adding document: ", error);
    }finally {
      setIsSubmitting(false);
    }
  };

  const onChangeAnswer = (e) => {
    const { value } = e.target;
    setAnswer(value);
    setInputCountName(e.target.value.length);
  };

  const isAnswerEmpty = () => {
    return answer === "";
  };

  return (
    <Div>
      <Form onSubmit={onSubmit}>
        <Header1 >투표항목 추가하기 <X src={cancleX} onClick={closeModal} /></Header1>
        <Header2>키워드</Header2>
        <Input
          value={answer}
          onChange={onChangeAnswer}
          type="text"
          placeholder="10자 이내로 키워드를 적어보세요."
          maxLength={10}
        />
        <InputNum>{inputCountName}/10</InputNum>
        <DDiv>
        <Submit type="submit" value="추가하기" isAnswerEmpty={isAnswerEmpty()} disabled={isAnswerEmpty()} />
        </DDiv>
      </Form>
    </Div>
  );
};

export default AddAnswerQuest;
