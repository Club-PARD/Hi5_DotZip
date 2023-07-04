import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

const Warning = styled.div`
  color: var(--primary-orange, #EC582F);
/* Body/B2-12-SB */
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 16px;
margin-top: 32px;
`;
const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
const AnswerDiv = styled.div`
`;
const Answer = styled.div`
width: ${props => props.answerLength * 30}px;
height: 40px;
border-radius: 24px;
border: 2px solid var(--primary-orange, #EC582F);
text-align:center;
display: flex;
  align-items: center;
  justify-content: center;
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
position : relative;
font-size: 20px;
font-weight: 700px;
line-height: 24px;
cursor: default;
&::after {
      content: 'X'; //이미지
      position: absolute;
      top: 50%;
      right: 24px;
      transform: translateY(-50%);
      cursor: pointer;
  }
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
 color :var(--black-90, #212121);
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
const InputReason = styled.textarea`
 ::placeholder {
    /* placeholder 스타일 */
    color:  var(--gray-60, #808080);
 }
 color :var(--black-90, #212121);
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 500;
line-height: 18px;
border-radius: 8px;
border: 1px solid var(--gray-60, #808080);
backdrop-filter: blur(2px);
width: 295px;
height: 102px;
background-color: transparent;
padding-left: 16px;
padding-top : 15px;
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
width: 180px;
height: 40px;
border-style: none;
background: ${({ isAnswerEmpty }) => (isAnswerEmpty ? "var(--white-100, #FFF)" : 'var(--background-orange, #FFF8F3);')};
color: ${({ isAnswerEmpty }) => (isAnswerEmpty ? 'var(--gray-60, #808080)' : '#EC582F')};

/* Body/B1-14-SB */
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-top: 8px;
margin-bottom: 20px;
`;
const DDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center; /* 가로 중앙 정렬 */
`;

const Prac = styled.textarea`
/* 기존 스타일 */
resize: vertical;
overflow: hidden;
width: 5ch; 
border-radius: 24px;
border: 2px solid var(--primary-orange, #EC582F);
background-color: transparent;
`;

const AddAnswerVote = ({ totalVote,answerId,handleCloseModal, answer }) => {

const closeModal = () => {
  // 모달 닫기 로직 구현
  handleCloseModal(); // handleCloseModal 함수 호출
};

const [reason, setReason] = useState("");
const [nickname, setNickName] = useState("");
const { questionId } = useParams();
const road = doc(dbService, "zip_Answer", answerId);
const navigate = useNavigate();
let [inputCountName, setInputCountName] = useState(0);
let [inputCountReason, setInputCountReason] = useState(0);
const [isSubmitting, setIsSubmitting] = useState(false);



const onSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) {
    return; // 이미 제출 중인 경우 중복 제출 방지
  }

  setIsSubmitting(true);

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
    navigate(`/AnswerLoading/${questionId}`);
  } catch (error) {
    console.error("Error adding document: ", error);
  } finally {
    setIsSubmitting(false);
  }
};

const onChangeReason = (e) => {
  const { value } = e.target;
  if (value.length <= 100) {
    setReason(value);
    setInputCountReason(value.length);
  } else {
    setReason(value.slice(0, 100));
    setInputCountReason(100);
  }
};

const onChangenickName = (e) => {
  const { value } = e.target;
  setNickName(value);
  setInputCountName(e.target.value.length);
};
const isAnswerEmpty = ()=> {
  return reason==="" || nickname === "";
}


return (
  <Div>
    <Form onSubmit={onSubmit}>
      <Header1  onClick={closeModal} >투표하기</Header1>
      <Header2>선택한 답변</Header2>
      <AnswerDiv>
      <Answer answerLength = {answer.length}>{answer}</Answer>
      </AnswerDiv>
      <Header2>닉네임</Header2>
      <Input
        value={nickname}
        onChange={onChangenickName}
        type="text"
        placeholder="10자 이내로 닉네임를 적어주세요."
        maxLength={10}
      />
      <InputNum>{inputCountName}/10</InputNum>
      <Header2>이유</Header2>
      <InputReason
        value={reason}
        onChange={onChangeReason}
        type="text"
        placeholder="키워드를 작성한 이유를 적어보세요."
        maxLength={100}
      />
              <InputNum>{inputCountReason}/100</InputNum>
              <DDiv >
      <Warning>답변은 1인당 1개만 투표할 수 있어요</Warning>
      <Submit type="submit" value="투표하기" isAnswerEmpty={isAnswerEmpty()}  disabled={isAnswerEmpty()} />
      </DDiv>
    </Form>
  </Div>
);
};

export default AddAnswerVote;
