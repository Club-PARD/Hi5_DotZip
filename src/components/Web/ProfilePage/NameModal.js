import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { updateDoc , doc} from "firebase/firestore";
import { styled } from 'styled-components';
import X from '../../../img/CancelX.png';

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

const Header1 = styled.p`
  margin: 0;
  font-family: PretendardBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  color: var(--gray-90, #353535);
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header2 = styled.div`
  font-size: 16px;
  font-family: PretendardBold;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  margin-top: 32px;
  color: var(--gray-90, #353535);
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
  margin-top: 10px;
  margin-bottom: 8px;
  border: 1px solid var(--gray-60, #808080);
  backdrop-filter: blur(2px);
  width: 250px;
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
  margin-right:6px;
`;

const Submit = styled.input`
  border-radius: 24px;
  background: var(--background-orange, #FFF8F3);
  width: 180px;
  padding: 11px 80px;
  border-style: none;
  gap: 4px;
  color: #EC582F;
  font-size: 14px;
  font-family: PretendardSemi;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  margin-top: 24px;
  cursor: pointer;
  &:disabled {
    background: var(--gray-10, #F8F8F8);;
    color: #808080;
    cursor: not-allowed;
  }
`;

const DDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가로 중앙 정렬 */
`;
const CancelX = styled.img`
  width: 100%;
  height: 100%;
`;
const CancelButton = styled.button`
  width: 24px;
  height: 24px;
  margin-left: auto;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 12px;
  font-family: PretendardSemi;
`;

const NameModal = ({handleCloseModal, handleNicknameUpdate }) => {
  const closeModal = () => {
    // 모달 닫기 로직 구현
    handleCloseModal(); // handleCloseModal 함수 호출
    if (name) {
      handleNicknameUpdate(name); // handleNicknameUpdate 콜백 함수 호출
    }
  };
  const [confirmEndVoteModalOpen, setConfirmEndVoteModalOpen] = useState(false);
  const handleCloseEndModal = () => {
    setConfirmEndVoteModalOpen(false);
  };  

  const [name, setName] = useState("");
  const [inputCountName, setInputCountName] = useState(0);
  const userId = localStorage.getItem("kakaoId");
  const [userNickname, setUserName] = useState(localStorage.getItem("userName"));

  useEffect(() => {
    localStorage.setItem('userName', userNickname);
    setUserName(userNickname);
    console.log(localStorage.getItem("userName"));
  }, [userNickname]);


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(dbService, 'kakaoId', userId);
      await updateDoc(docRef, {
        userName: name
      });
      setName("");
      setUserName(name);
      localStorage.setItem("userName", name);
      closeModal();
      console.log('Firestore userName updated:', name);
    } catch (error) {
      console.error('Error updating Firestore userName:', error);
    }
  };

  const onChangeName = (e) => {
    const { value } = e.target;
    setName(value);
    setInputCountName(e.target.value.length);
  };

  const isAnswerEmpty = () => {
    return name === "";
  };

  return (
    <Div>
      <Form onSubmit={onSubmit} isOpen={confirmEndVoteModalOpen}>
        <Container>
          <Header1>이름 수정하기</Header1>
          <CancelButton onClick={handleCloseModal}><CancelX src={X}/></CancelButton>
        </Container>
        <Header2>이름</Header2>
        <Input
          value={name}
          onChange={onChangeName}
          type="text"
          placeholder="10자 이내로 원하는 닉네임을 적어주세요."
          maxLength={10}
        />
        <InputNum>{inputCountName} / 10</InputNum>
        <DDiv>
          <Submit type="submit" value="저장" disabled={isAnswerEmpty()} />
        </DDiv>
      </Form>
    </Div>
  );
};

export default NameModal;