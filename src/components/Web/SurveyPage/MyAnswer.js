import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, addDoc,updateDoc, doc, onSnapshot,serverTimestamp } from 'firebase/firestore';
import styled from 'styled-components';
import { KakaoIdContext } from '../../../KakaoIdContext';
import KakaoShareButton from '../ProfilePage/ShareKakao';




const Div = styled.div`
  margin-top: 70px;
  height: 1000px;
  
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

const HeaderDiv = styled.header`
  
  height: 19px;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #efefef;
  left: calc(50% - 311px/2);
`;

const Header3 = styled.p`
  width: 110px;
  height: 24px;
  font-family: Pretendard;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #efefef;
`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
`;

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
const Button2 = styled.button`
  box-sizing: border-box;
  position: absolute;
  width: 375px;
  height: 60px;
  left: calc(50% - 375px/2);
  top: 648px;
  background: #212121;
  border: 1px solid #ABABAB;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #ABABAB;
  
`;
const P = styled.p`

background: #EEFF01;
  
`;



const MyAnsewer = () => {
    const { questionId } = useParams();
    const navigate = useNavigate();
    const [kakaoContext] = useContext(KakaoIdContext);
    // const [userContext] = useContext(UserNameContext);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [question, setQuestion] = useState('');
    const [comment, setComment] = useState('');
    const [userNickname] = useState(localStorage.getItem("userName"));
    const [answer, setAnswer] = useState("");
  const [reason, setReason] = useState("");
  const [nickname, setNickName] = useState("");
  const road =collection(dbService, "zip_Answer");//다시 고치기
  const timestamp = serverTimestamp();
  const data = {
    answer: answer,
    totalVote: 1,
    questionId :questionId,//params로 받은 변수 넣기
    timestamp,
  }

  
    useEffect(() => {
      const unsubscribe = onSnapshot(doc(dbService, 'zip_Question', questionId), (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setQuestion(data.question);
          setComment(data.comment);
        } else {
          // Handle case when document does not exist
        }
      });
  
      return () => {
        unsubscribe();
      };
    }, [questionId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        if(answer!==""){//안썻을경우
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
          navigate(`/SurveyShare/${questionId}`);
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
      const handleButtonClick = () => {
        navigate(`/SurveyShare/${questionId}`);
      };
    

    return (
        <Div>
          <Survey>
            <Header2>
              <HeaderDiv>나에 대해 생각해보세요!</HeaderDiv>
              <HeaderP>{userNickname}님이 생각하는 질문의 키워드는 무엇인가요?</HeaderP>

              <HeaderDiv>내가 생각하는 내 모습 항목 추가하기</HeaderDiv>
              <HeaderP>답변에 내가 생각하는 키워드를 추가할 수 있어요.</HeaderP>
            </Header2>
            

            <Button2 onClick={() => navigate('/home')}>
            홈으로 돌아가기
          </Button2>
          <button >+ 키워드 후보 추가하기</button>
          <form onSubmit={onSubmit}>
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
        <input type="submit" value="등록하기" />
        </form>   
        <button onClick={handleButtonClick}>추가 안할래요</button>
          </Survey>
        </Div>
      );
    };

export default MyAnsewer;





