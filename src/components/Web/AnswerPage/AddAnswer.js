import React, { useState } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, addDoc,updateDoc ,serverTimestamp, getDoc, doc} from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import cancleX from "../../../img/CancelX.png"
const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;
const Header1 = styled.div `
font-family: PretendardBold;
position : relative;
font-size: 20px;
font-weight: 700px;
line-height: 24px;
cursor: default;
display: flex;
`;
const X = styled.img`
width: 24px;
height: 24px;
  position: absolute;
  right: 1px;
  cursor: pointer;
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
const Header2 = styled.div`
font-size: 16px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 20px;
margin-top: 32px;
`;

const Input = styled.input`
  ::placeholder {
    /* placeholder 스타일 */
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
    outline: none;
    border: 1px solid var(--primary-orange, #EC582F);
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
    outline: none;
    border: 1px solid var(--primary-orange, #EC582F);
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
margin-top: 8px;
`;
const DDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center; /* 가로 중앙 정렬 */
`;
const Submit = styled.input`
border-radius: 24px;
background: ${({ isAnswerEmpty }) => (isAnswerEmpty ? "var(--white-100, #FFF)" : 'var(--background-orange, #FFF8F3);')};
color: ${({ isAnswerEmpty }) => (isAnswerEmpty ? 'var(--gray-60, #808080)' : '#EC582F')};
width: 180px;
height: 40px;
border-style: none;

/* Body/B1-14-SB */
font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-top: 8px;
text-align: center;
  cursor: pointer;
`;
const Warning = styled.div`
  color: var(--primary-orange, #EC582F);
/* Body/B2-12-SB */
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 16px;
margin-top: 15px;
`;


const AddAnswer = ({handleCloseModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answer, setAnswer] = useState("");
  const [reason, setReason] = useState("");
  const [nickname, setNickName] = useState("");
  const [kakao , setKakao] = useState("");
  const closeModal = () => {
    // 모달 닫기 로직 구현
    handleCloseModal(); // handleCloseModal 함수 호출
  };
  const {questionId} = useParams(); //이변수
  const road =collection(dbService, "zip_Answer");//다시 고치기
  const navigate = useNavigate();
  const timestamp = serverTimestamp();
  let [inputCount, setInputCount] = useState(0);
  let [inputCountReason, setInputCountReason] = useState(0);
  let [inputCountName, setInputCountName] = useState(0);

  const collectionRef =doc(dbService, "zip_Question",questionId);
  getDoc(collectionRef).then((docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const kakaoId = data.kakaoId;
      setKakao(kakaoId);
    } 
  }).catch((error) => {
    console.log("Error getting document: ", error);
  });
  const data = {
    answer: answer,
    totalVote: 1,
    questionId :questionId,//params로 받은 변수 넣기
    timestamp,
    kakaoId:kakao
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return; // 이미 제출 중인 경우 더 이상의 제출 방지
    }
    if(answer!=="" && reason!=="" && nickname!==""){//안썻을경우
      setIsSubmitting(true);
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
      setIsSubmitting(false);
      localStorage.setItem(questionId,newDocRef.id);
      navigate(`/AnswerLoading/${questionId}`);
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsSubmitting(false);
    }

  }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setAnswer(value);
    setInputCount(e.target.value.length);
  };

  const onChangeReason = (e) => {
    const { value } = e.target;
    setReason(value);
    setInputCountReason(e.target.value.length);
  };
  const onChangenickName = (e) => {
    const { value } = e.target;
    setNickName(value);
    setInputCountName(e.target.value.length);
  };
  const isAnswerEmpty = ()=> {
    return answer === "" || reason==="" || nickname === "";
  }
  return (
    <Div>
      <Form onSubmit={onSubmit}>
      <Header1>새로운 답변 추가하기 <X src={cancleX} onClick={closeModal}/></Header1>
      <Header2>닉네임</Header2>
      <Input
          value={nickname}
          onChange={onChangenickName}
          type="text"
          placeholder="10자 이내로 원하는 닉네임을 적어주세요."
          maxLength={10}
        />
      <InputNum>{inputCountName}/10</InputNum>
        <Header2>새로운 답변</Header2>
        <Input
          value={answer}
          onChange={onChange}
          type="text"
          placeholder="10자 이내로 새로운 답변을 적어주세요"
          maxLength={10}
        />
      <InputNum>{inputCount}/10</InputNum>
        <Header2>이유</Header2>
          <InputReason
          value={reason}
          onChange={onChangeReason}
          type="text"
          placeholder="답변을 작성한 이유를 적어보세요"
          maxLength={100}
        />
      <InputNum>{inputCountReason}/100</InputNum>
      <DDiv >
        <Warning>답변은 1인당 1개만 투표할 수 있어요</Warning>
      <Submit type="submit" value="추가하기" isAnswerEmpty={isAnswerEmpty()}  />
      </DDiv>
      </Form>
    </Div>
  );
};

export default AddAnswer;
