import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { dbService } from '../../../fbase';
import { collection, addDoc, setDoc, doc, serverTimestamp} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import BackNavbar from '../../BackNavbar'
import progress from '../../../img/Line2.png';
import check from '../../../img/CreateCheck.png';
import tip from '../../../img/Tip.png'




const Survey = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: 812px;
  margin: 0 auto;
  //background-color:aqua;
`;

const HeaderDiv = styled.header`
width: 246px;
height: 28px;
top: 126px;
margin-left: 24px;
font-family: Pretendardbold;
font-size: 24px;
font-weight: 700;
line-height: 28px;
letter-spacing: 0em;
text-align: left;
color: #353535;

`;

const Header2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 32px;
`;

const HeaderP = styled.header`
  width: 260px;
  height: 19px;
  font-size: 14px;
font-family: Pretendard;
font-style: normal;
font-weight: 600;
line-height: 18px;
  color: #818181;
  width: 220px;
height: 18px;
top: 162px;
margin-left: 24px;

`;

const ProfileEmoji = styled.p`
width: 87px;
height: 20px;
top: 212px;
margin-left: 26px;
  font-family: Pretendardbold;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
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
font-family: Pretendard;
font-size: 14px;
font-weight: 500;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
/* background-color: transparent;  */
padding-left: 16px;
}
width: 327px;
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
padding-left: 8px;
padding-top: 8px;
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
width: 327px;
height: 48px;
top: 505px;
margin-left: 24px;
border-radius: 8px;
border: 1px solid #808080;
//styleName: Body/B3-14-M;
font-family: Pretendard;
font-size: 14px;
font-weight: 500;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
padding-left: 8px;
padding-top: 8px;
`;


const Submit = styled.button`
  width: 327px;
height: 48px;
flex-shrink: 0;
border-radius: 10px;
background: var(--gray-10, #F8F8F8);
margin-left: 24px;
margin-top: 132px;
  border: white;
  background:${({ isAnswerEmpty }) => (isAnswerEmpty ? 'var(--gray-10, #F8F8F8)' : '#FFF8F3')};
  color: ${({ isAnswerEmpty }) => (isAnswerEmpty ? 'var(--gray-60, #808080)' : '#EC582F')};
  cursor: ${({ isAnswerEmpty }) => (isAnswerEmpty ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ isAnswerEmpty }) => (isAnswerEmpty ? 'none' : 'auto')};
`;


const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 320px;
  margin-top: 20px;
  margin-left:24px;
`;

const EmojiButton = styled.div`
position: relative;
  width: 56px;
  height: 56px;
`;
const EmojiImage = styled.img`
position: absolute;
  width: 60px;
  height: 60px;
`;
const Check = styled.img `
  position: absolute;
  width : 64px;
  height : 65px;
  opacity : ${({ active }) => (active ? 1 : 0)};
`

const Progres = styled.img`
  width: 185px;
  height: 1.5px;
  margin-right: 175px;
`;
const QuestionP = styled.p`
width: 28px;
height: 20px;
top: 329px;
margin-left: 26px;
font-family: Pretendardbold;
font-size: 16px;
font-weight: 700;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
margin-top: 29px;


`;

const TipP = styled.p`
width: 56px;
height: 20px;
top: 473px;
margin-left: 26px;
font-family: Pretendardbold;
font-size: 16px;
font-weight: 700;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
`;

const InputNum = styled.span`
text-align: right;
color: var(--gray-60, #808080);
font-size: 12px;
font-family: Pretendard;
font-style: normal;
font-weight: 500;
line-height: 16px;
padding-right:20px;
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
    const [selectedEmoji, setSelectedEmoji] = useState(null); // New state for the selected emoji

    let [inputCountReason, setInputCountReason] = useState(0);
  let [inputCountName, setInputCountName] = useState(0);


    // useEffect(() => {
    //   console.log(kakaoId); // Print kakaoId value only once
    // }, []);

  
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
          emoji: selectedEmoji, // Include the selected emoji value in the data
          timestamp,
          VoteNum:1
        });
    
        console.log('Data saved successfully');
      setQuestion('');
      setComment('');
      setSelectedEmoji(null);
      navigate(`/MyAnswer/${questionId}`);
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };
  const onChangeComment = (e) => {
    const { value } = e.target;
    setComment(value);
    setInputCountReason(e.target.value.length);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setQuestion(value);
    setInputCountName(e.target.value.length);
  };
  const isAnswerEmpty = () => {
    return question.trim() === '' || comment.trim() === '' || selectedEmoji === null;
  };
  
    

  return (
    <Div>
      <BackNavbar/>
      <Progres src={progress}/>
      <Survey>
        <Header2>
          <HeaderDiv>직접 질문을 만들어보세요.</HeaderDiv>
          <HeaderP>프로필 이모지와 질문,Tip을 적어보세요.</HeaderP>
        </Header2>
        <ProfileEmoji>프로필이미지</ProfileEmoji>
        <ButtonContainer>
        <EmojiButton onClick={() => setSelectedEmoji('emoji1')} >
            <EmojiImage src={emoji1} alt="Emoji" active={selectedEmoji === 'emoji1'} />
            <Check src={check} active={selectedEmoji === 'emoji1'}  />
          </EmojiButton>
          <EmojiButton onClick={() => setSelectedEmoji('emoji2')} >
            <EmojiImage src={emoji2} alt="Emoji"active={selectedEmoji === 'emoji2'} />
            <Check src={check} active={selectedEmoji === 'emoji2'}  />
          </EmojiButton>
          <EmojiButton onClick={() => setSelectedEmoji('emoji3')} >
            <EmojiImage src={emoji3} alt="Emoji" active={selectedEmoji === 'emoji3'} />
            <Check src={check} active={selectedEmoji === 'emoji3'}  />
          </EmojiButton>
          <EmojiButton onClick={() => setSelectedEmoji('emoji4')} >
            <EmojiImage src={emoji4} alt="Emoji" active={selectedEmoji === 'emoji4'} />
            <Check src={check} active={selectedEmoji === 'emoji4'}  />
          </EmojiButton>
          <EmojiButton onClick={() => setSelectedEmoji('emoji5')}  alt="Emoji" active={selectedEmoji === 'emoji5'}>
            <EmojiImage src={emoji5}/>
            <Check src={check} active={selectedEmoji === 'emoji5'}  />
          </EmojiButton>
        </ButtonContainer>
        <QuestionP>질문</QuestionP>
        <InputQues
          value={question}
          onChange={onChange}
          placeholder="40자 이내의 새로운 질문을 적어주세요."
          maxLength={40}
        />
        <InputNum>{inputCountName}/40</InputNum>
        <TipP>답변 TIP</TipP>
        <InputQues1
          value={comment}
          onChange={onChangeComment}
          placeholder="답변 적을 때 참고할만한 내용이나 예시를 적어주세요."
          maxLength={20}
        />
        <InputNum>{inputCountReason}/20</InputNum>
        <Submit onClick={handleSubmit} isAnswerEmpty={isAnswerEmpty()}>다음</Submit>
  
      </Survey>
    </Div>
  );
}

export default SurveyCreate;
