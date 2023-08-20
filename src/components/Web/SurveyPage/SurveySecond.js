import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc,serverTimestamp } from 'firebase/firestore';
import { dbService } from '../../../fbase';
import 'firebase/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import BackNavBar from "../../BackNavbar"
import CreateMyques from '../../../img/CreateMyques.png'
import NewReg from '../../../img/NewReg.png'

const DDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
  

const Div = styled.div`
display: flex;
  flex-direction: column;
  width: 375px;
  height: 812px;
  margin: 0 auto;
  /* background-color:aqua; */
`;
const Top = styled.header`
margin-top: 32px;
    color: var(--orange-primary, #EC582F);

/* Head/H3-24-B */
font-family: PretendardBold;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: 28px; /* 116.667% */
margin-left: 24px;
margin-bottom: 8px;
`;

const TopP = styled.header`
//styleName: Body/B4-14-SB;
font-family: PretendardSemi;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
color: #808080;
margin-left: 24px;
`;
const NewQues = styled.header`
//styleName: Body/B6-16-B;
font-family: PretendardBold;
font-size: 16px;
font-weight: 700;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
margin-top: 80px;
margin-left: 26px;
margin-bottom: 12px;
color: #353535;
`;


const InputQues = styled.textarea`
&:focus {
  border: none;
  outline: 1px solid var(--primary-orange, #EC582F);
}
::placeholder {
  /* placeholder 스타일 */
  color:  var(--gray-60, #808080);
}
width: 295px;
height: 66px;
top: 361px;
margin-left: 24px;
border-radius: 8px;
border: 1px solid #808080;
font-family: Pretendard;
font-size: 14px;
font-weight: 500;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
padding-left: 16px;
padding-top: 15px;
padding-right: 16px;
`;


const InputNum = styled.span`
text-align: right;
color: var(--gray-60, #808080);
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 500;
line-height: 16px;
padding-right:25px;
margin-top: 8px;

`;

const NewComm = styled.header`
//styleName: Body/B6-16-B;
font-family: PretendardBold;
font-size: 16px;
font-weight: 700;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
margin-top: 48px;
margin-left: 26px;
margin-bottom: 12px;
color: #353535;

`;

const InputQues1 = styled.textarea`
&:focus {
  border: none;
  outline: 1px solid var(--primary-orange, #EC582F);
}
::placeholder {
  /* placeholder 스타일 */
  color:  var(--gray-60, #808080);
}
width: 295px;
height: 84px;
top: 361px;
margin-left: 24px;
border-radius: 8px;
border: 1px solid #808080;
font-family: Pretendard;
font-size: 14px;
font-weight: 500;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
padding-left: 16px;
padding-top: 15px;
padding-right: 16px;
`;
const ButtonNew = styled.img`
width: 327px;
height: 48px;
margin-top: 100px;
margin-left: 24px;
cursor: pointer;

`;
const GrayButton = styled.button`
  width: 327px;
  height: 48px;
  margin-top: 100px;
  margin-left: 24px;
  background-color: #F8F8F8;
  border: 1px;
  border-radius: 10px;
  cursor: not-allowed;
  opacity: 0.5;
  font-family: PretendardSemi;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  color: #808080;
`;



function SurveySecond() {
    const navigate = useNavigate();
    const kakaoId = localStorage.getItem("kakaoId");
    const [Newquestion, setNewQuestion] = useState('');
    const [NewquestionId, setNewQuestionId] = useState(0);
    const [comment, setComment] = useState('');


    let [inputCountReason, setInputCountReason] = useState(0);
    let [inputCountName, setInputCountName] = useState(0);


    useEffect(() => {
      window.scrollTo(0, 0); // Scroll to top when the component mounts
    }, []);
  

  
    const handleSubmit = async () => {
      try {
        if (!kakaoId) {
          throw new Error('User not logged in');
        }
        setNewQuestionId((prevId) => prevId + 1);
        // Firestore에 데이터 저장
        await setDoc(doc(dbService, 'zip_New', Newquestion), {
            kakaoId,
            Newquestion,
            comment,
          });
    
        console.log('Data saved successfully');
      setNewQuestion('');
      setComment('');
      navigate(`/SurveyNew`);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const onChange = (e) => {
    const { value } = e.target;
    setNewQuestion(value);
    setInputCountName(e.target.value.length);
  };
  const onChangeComment = (e) => {
    const { value } = e.target;
    setComment(value);
    setInputCountReason(e.target.value.length);
  };
  const isQuestionEmpty = Newquestion.trim() === '';
  
    


    return(
        <>
        <DDiv>
        <BackNavBar/>
        <Div>
        <Top>나만의 질문 만들기</Top>
        <TopP>내가 직접 질문을 작성하고 싶으신가요?</TopP>
        <TopP>전달해주신 질문 중 선발해 매주 질문이 업데이트 됩니다!</TopP>
        <NewQues>새로운 질문 전달하기</NewQues>
        <InputQues
          value={Newquestion}
          onChange={onChange}
          placeholder="평소 궁금했던 내 모습이 있나요?"
          maxLength={40}
        />
        <InputNum>{inputCountName}/40</InputNum>
        <NewComm>이유 작성하기</NewComm>
        <InputQues1
          value={comment}
          onChange={onChangeComment}
          placeholder="이 질문을 물어보고 싶은 이유를 작성해주세요.(선택)"
          maxLength={80}
        />
        <InputNum>{inputCountReason}/80</InputNum>
        {isQuestionEmpty ? (
                        <GrayButton disabled>새로운 질문 전달하기</GrayButton>
                    ) : (
                        <ButtonNew src={NewReg} onClick={handleSubmit} />
                    )}
        </Div>
        </DDiv>
        
        </>

    )

}
export default SurveySecond;

