import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';

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
color: var(--gray-60, #808080);
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
`;
const InputReason = styled.textarea`
color: var(--gray-60, #808080);
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
background: var(--gray-10, #F8F8F8);
width: 180px;
padding: 11px 80px;
border-style: none;
gap: 4px;
color: var(--gray-60, #808080);

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

const Prac = styled.textarea`
/* 기존 스타일 */
resize: vertical;
overflow: hidden;
width: 5ch;

`;

const AddAnswerVote = ({ totalVote,answerId,handleCloseModal }) => {

const closeModal = () => {
  // 모달 닫기 로직 구현
  handleCloseModal(); // handleCloseModal 함수 호출
};

const [reason, setReason] = useState("");
const [nickname, setNickName] = useState("");
const { questionId } = useParams();
const road = doc(dbService, "zip_Answer", answerId);
const navigate = useNavigate();
const [cachedData, setCachedData] = useState(null); // 캐시된 데이터 상태
let [inputCountName, setInputCountName] = useState(0);
let [inputCountReason, setInputCountReason] = useState(0);

useEffect(() => {
  const fetchData = async () => {
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
    navigate(`/AnswerLoading/${questionId}`);
  } catch (error) {
    console.error("Error adding document: ", error);
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

const prac = (e) => {
  const { value } = e.target;
  setNickName(value);
  setInputCountName(e.target.value.length);
  if (e.target.value.length >= 5) {
    var length = e.target.value.length + "ch";
    e.target.style.width = length;
  }
}; //나중에 이거 긁어가자

return (
  <Div>
    <Form onSubmit={onSubmit}>
      <Header1  onClick={closeModal} >투표항목 추가하기</Header1>
      <Header2>키워드</Header2>
      <Input
        value={nickname}
        onChange={onChangenickName}
        type="text"
        placeholder="10자 이내로 키워드를 적어보세요."
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
      <Submit type="submit" value="추가" />
      </DDiv>
      <Prac onChange={prac}></Prac>
    </Form>
  </Div>
);
};

export default AddAnswerVote;
