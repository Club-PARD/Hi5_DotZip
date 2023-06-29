import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { dbService } from '../../../fbase';
import { collection, addDoc, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { KakaoIdContext } from '../../../KakaoIdContext';
import { UserNameContext } from '../../../UserNameContext';

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 375px;
  height: 812px;
  background: black;
  margin: 0 auto;
  overflow-x: hidden;
`;

const HeaderDiv = styled.header`
  width: 120px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #efefef;
  left: calc(50% - 311px / 2);
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
`;

const HeaderP = styled.p`
  width: 260px;
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 19px;
  color: #818181;
`;

const HeaderName = styled.p`
  width: 115px;
  height: 24px;
  top: 121px;
  left: 30px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #efefef;
`;

const Button = styled.button`
  width: 75px;
  height: 72px;
  top: 157px;
  left: 150px;
  background: ${({ active }) => (active ? '#d9d9d9' : '#353535')};
`;

const InputQues = styled.textarea`
  width: 320px;
  height: 68px;
  top: 240px;
  left: 28px;
  background: #d9d9d9;
  margin: 30px;
`;

const InputQues1 = styled.textarea`
  width: 320px;
  height: 68px;
  top: 316px;
  left: 28px;
  background: #d9d9d9;
  margin: 30px;
`;

const InputVote = styled.button`
  width: 320px;
  height: 68px;
  top: 423px;
  left: 28px;
`;

const Submit = styled.button`
  width: 320px;
  height: 68px;
  top: 530px;
  left: 28px;
`;

const Div = styled.div`
  margin: 0 auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
color : white;
`;


function SurveyCreate() {
    const navigate = useNavigate();
    // const [kakaoContext] = useContext(KakaoIdContext);
    // console.log("zip userId : ", kakaoContext);//userId
    const kakaoId = localStorage.getItem("kakaoId");
    //console.log(localStorage.getItem("kakaoId"));
    const [currentUser, setCurrentUser] = useState(null);
    const [question, setQuestion] = useState('');
    const [comment, setComment] = useState('');
    const [voteEnd, setIsBooleanValue] = useState(true); 
    const [userNickname] = useState(localStorage.getItem("userName"));
    //console.log("username: ", userContext);

    useEffect(() => {
      console.log(kakaoId); // Print kakaoId value only once
    }, []);

  
    const handleSubmit = async () => {
      try {
        if (!kakaoId) {
          throw new Error('User not logged in');
        }
    
        const questionId = uuidv4();
        const timestamp = serverTimestamp(); // Firebase 서버 시간으로 생성

    
        // Firestore에 데이터 저장
        await setDoc(doc(dbService, 'zip_Question', questionId), {
          kakaoId,
          questionId,
          question,
          comment,
          voteEnd,
          timestamp,
        });
    
        console.log('Data saved successfully');
      setQuestion('');
      setComment('');
      navigate(`/MyAnswer/${questionId}`);
      //navigate(`/SurveyShare/${questionId}?question=${question}&comment=${comment}`);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };
    

  return (
    <Div>
      <Survey>
        <Header2>
          <HeaderDiv>새로운 .ZiP 만들기</HeaderDiv>
          <HeaderP>궁금한 질문을 담은 링크를 공유해보세요.</HeaderP>
          <HeaderName>{userNickname}님의 .ZiP</HeaderName>
        </Header2>
        <Button>이모지선택</Button>
        <P>질문</P>
        <InputQues
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="새로운 질문을 적어주세요."
        />
        <P>답변 TIP</P>
        <InputQues1
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="답변 적을 때 참고할만한 내용이나 예시를 적어주세요."
        />
        <Submit onClick={handleSubmit}>질문 저장하기</Submit>
      </Survey>
    </Div>
  );
}

export default SurveyCreate;
