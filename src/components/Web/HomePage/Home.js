import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, onSnapshot, query, where, orderBy,setDoc,doc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import homeFolder from '../../../img/HomeFolder.png';
import banner from '../../../img/banner.png'
import NewquesButton from '../../../img/NewquesButton.png'
import Home1 from '../../../img/Home1.png';
import Home2 from '../../../img/Home2.png';
import Tip from '../../../img/Tip.png';
import LinkImage from '../../../img/Link.png';
import CopyToClipboard from 'react-copy-to-clipboard'; //링크복사
import CopyLinkMessage from '../VotePage/CopyLinkMessage';
import CopyLinkMessageHome from './HomeCopyLinkMessage';
import EndMessage from '../VotePage/EndMessage';
import Folder1 from '../../../img/Folder1.png';
import Folder2 from '../../../img/Folder2.png';
import arrow from '../../../img/arrow.png';
import buttonnew from '../../../img/buttonnew.png';
import HomeLoading from './HomeLoading';
import EmptyFold from '../../../img/EmptyFold.png'
import homeCheck from '../../../img/homeCheck.png';

const Div = styled.div`
  display: flex;
  margin: 0 auto; 
  
`;

const HeaderP = styled.header`
color: var(--gray-90, #353535);
/* Head/H2-20-B */
font-size: 20px;
font-family: Pretendardbold;
font-style: normal;
line-height: 24px;
margin-left: 24px;
margin-bottom: 44px;
`;

const HeaderDiv = styled.header`
width: 296px;
top: 152px;
margin-left: 24px;
font-family: Pretendardbold;
font-size: 20px;
line-height: 24px;
letter-spacing: 0em;
margin-top: 25px;
margin-bottom: 8px;
`;

const Header3 = styled.p`
width: 131px;
height: 24px;
top: 692px;
left: 24px;
//styleName: Head/H1-20-B;
font-family: Pretendardbold;
font-size: 20px;
line-height: 24px;
letter-spacing: 0em;
text-align: left;

`;

const Survey = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  width: 375px;
  height: 1245px;
  margin: 0 auto;
  overflow-x: hidden;
/* background-color: #00FFFF;  */
  //background-color:white;
`;

const HomeP = styled.button`
  gap: 10px;
  width: 162px;
  height: 40px;
  top: 80px;
  text-align: center;
  font-family: PretendardBold;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  color: #353535;
  background-color: white;
  border: none;
  border-bottom: 2px solid black;

`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  width: 330px;
  margin-left: 24px;
  margin-top: 60px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-left: 8px;
`;

const ButtonQ = styled.img`
  width: 156px;
  height: 156px;
  justify-self: flex-start;
  margin-left: 26px;
  cursor: pointer;
`;
const ButtonQ1 = styled.img`
  width: 156px;
  height: 156px;
  justify-self: flex-start;
  cursor: pointer;
`;

const NewQ = styled.header`
//styleName: Head/H1-20-B;
font-family: Pretendardbold;
font-size: 18px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
top: 362px;
margin-left: 16px;

`;

const Newq = styled.header`
margin-bottom: 16px;
color: var(--gray-60, #808080);
font-size: 14px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 24px;
`;

const Profile = styled.button`
  width: 165px;
  height: 40px;
  top: 80px;
  left: 186px;
  //padding: 8px 61.5px;
  gap: 10px;
  font-family: PretendardBold;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0em;
  color: #ABABAB;
  background-color: white;
  border: none;
  /* border-bottom: 2px solid white; */
  cursor: pointer;
`;

const ButtonA = styled.button`
  width: 100px;
  height: 20px;
  top: 367px;
  left: 293px;
  background: white;
  border: 1px solid white;
  margin-right: 6px;
  font-size: 14px;
  font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 18px;
color: #EC582F;
cursor: pointer;
`;
const ButtonB = styled.button`
  width: 100px;
  height: 20px;
  top: 367px;
  margin-left: 24px;
  margin-right: 7px;
  background: #F8F8F8;
  border: 1px solid #F8F8F8;
  font-size: 14px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 18px;
color: var(--gray-60, #808080);
cursor: pointer;

`;

const ButtonNew = styled.img`
width: 327px;
height: 64px;
margin-left: 24px;

cursor: pointer;

`;

const Img = styled.img`
gap: 6px;
top: 876px;
width: 154px;
height: 40px;
margin-left: 111.5px;
margin-top: 24px;
cursor: pointer;

`;



const MadeF = styled.header`
width: 240px;
height: 18px;
top: 724px;
left: 5px;
font-family: Pretendard;
font-size: 14px;
font-weight: 600;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
color: #F8F8F8;


`;

const Emoji = styled.img`
width: 48px;
height: 48px;
cursor: pointer;

`;
const RedText = styled.span`
color: #EC582F;
`;

const DIVB = styled.div`
top: 700px;
width: 375px;
height: 586px;
/* background-color: #F8F8F8; */
margin-top: 16px;
`;

const QP = styled.header`
color: var(--gray-30, #ABABAB);
font-size: 18px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 24px;
margin-left: 99px;
margin-top: 100px;

`;
const Qp = styled.header`
color: var(--gray-30, #ABABAB);

/* Body/B4-14-SB */
font-size: 14px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-left: 90px;
margin-top: 4px;

`;
const FolderImage = styled.img`
  z-index: 0;
  width: 359px;
  height: 196px;
  cursor: pointer;

`;

const FolderImageContainer = styled.div`
  position: relative;
  width: 357px;
  margin-bottom: 24px;
  margin-left: 7px;


`;

const FolderContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
const IMG = styled.img`
  position: absolute;
  padding-top: 56px;
  margin-left: 16px ;
  width: 48px;
  height: 48px;

  z-index: 1;
  cursor: pointer;
`;

const AnswerLinkContainer = styled.div`
margin-top: 30px;
  display: flex;
  align-items: flex-start;
  
`;



//폴더 안 텍스트
const QText = styled.header`
  font-size: 16px;
  margin: 0;
  margin-top: 65px;
  margin-left: 74px;
  font-weight: 600;
  width: 1155px;
  height: 36px;
  font-family: PretendardSemi;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const AnswerText = styled.header`
  font-size: 12px;
  /* margin: 0; */
  margin-left: 17px;
  font-weight: 600;
  width: 118px;
  height: 16px;
  font-family: PretendardSemi;
  color: #808080;
  line-height: 16px;
  
  //z-index: 0;
`;

const CopyLinkButton = styled.button`
  border: none;
  margin-left: 60px;
  padding: 0;
  width: 118px;
  height: 32px;
  border-radius: 20px;
  font-size: 12px;
  font-family: PretendardSemi;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  //z-index: 1;
`;
const Link = styled.img`
  width: 12px;
  height: 8px;
  margin-right: 6px;
  cursor: pointer;
`;

const Arrow = styled.img`
  width: 5px;
  height: 10px;
  /* margin-right: 4px; */
`;
const Empty = styled.img`
  width: 359px;
height: 215.2px;
margin-left: 8px;
margin-bottom: 16px;
`;



const HomePageFirst = () => {
  const navigate = useNavigate();
  const kakaoId = localStorage.getItem('kakaoId');
  //const [userContext] = useContext(UserNameContext);
  const [userNickname] = useState(localStorage.getItem("userName"));
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [emoji, setEmoji] = useState([]);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [voteEnd, setIsBooleanValue] = useState(true); 
  const [showMessage, setShowMessage] = useState(false);
  const [copiedLinkId, setCopiedLinkId] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null); // New state for the selected emoji
  const [loading, setLoading] = useState(true);
  // kakaoId가 비어있는 경우에만 새로고침
  if (!kakaoId) {
    window.location.reload();
  } 

  useEffect(() => {
    window.scrollTo(0, 0);
    const q = query(collection(dbService, 'zip_Question'), where('kakaoId', '==', kakaoId), where('voteEnd', '==', true), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const questionList = [];
      snapshot.forEach((doc) => {
        if (doc.data().kakaoId === kakaoId) {
          questionList.push(doc.data());
        }
      });
      setQuestions(questionList);
      setLoading(false);
    });
    const modalConfirmed = localStorage.getItem('modalConfirmed');
        if (modalConfirmed === 'true') {
          setShowEndMessage(true);
    
          setTimeout(() => {
            setShowEndMessage(false);
            localStorage.removeItem('modalConfirmed');
          }, 1000);
        }

    return () => {
      unsubscribe();
    };
  }, [kakaoId]);

  

  const handleQuestionClick = (questionId, index) => {
    navigate(`/PickAnswer/${questionId}`, { state: { index } });
  };

  const handleButtonClick = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };
  const handleButton4Click = () => {
    navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
  };

  const handleButton1Click = () => {
    navigate('../../../../MyProfile'); // Replace with the actual path you want to navigate to
  };
  const handleButton3Click = () => {
    navigate(`/VotingPage`); // Replace with the actual path you want to navigate to
  };
 

  const handleLinkButtonClick = (questionId) => {
    const link = `${window.location.origin}/answer/${questionId}`;
    setCopiedLinkId(questionId);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 1000);
  };

  const getEmojiImage = (emoji) => {
    switch (emoji) {
      case 'emoji1':
        return emoji1;
      case 'emoji2':
        return emoji2;
      case 'emoji3':
        return emoji3;
      case 'emoji4':
        return emoji4;
      case 'emoji5':
        return emoji5;
      default:
        return null;
    }
  };

  const emojiImage = getEmojiImage(emoji);
  const folderImages = [Folder1, Folder2];


  return (
    <Div>
      <Survey>
        <HeaderContainer>
          <HomeP>홈</HomeP>
          <Profile onClick={handleButton1Click}>프로필</Profile>
        </HeaderContainer>
        <HeaderDiv>안녕하세요,<RedText>{userNickname}</RedText>님</HeaderDiv>
        <HeaderP>나를 표현하는 키워드를 찾아가보세요!</HeaderP>
        <ButtonContainer>
          <NewQ>나만의 질문 모음집</NewQ>
          <ButtonA onClick={handleButton3Click}>전체보기 <Arrow src={arrow}/></ButtonA>
        </ButtonContainer>
        <Newq>지인들에게 나에 대해 물어보세요!</Newq>
        <DIVB>
          {loading ? (
          <HomeLoading/>
        ) : (
        <>
          {questions.length > 0 ? (
            <>
            {questions.slice(0, 2).map((question, index) => (
              <div key={question.questionId}>
                {question.question && question.voteEnd && (
                  <FolderImageContainer onClick={() => handleQuestionClick(question.questionId, index)}>
                    <FolderImage src={folderImages[index % folderImages.length]} />
                    <FolderContent>
                      <IMG src={getEmojiImage(question.emoji)} alt="Emoji" />
                      <QText>{question.question}</QText>
                      <AnswerLinkContainer>
                        <AnswerText><RedText>{question.VoteNum}명</RedText>이<br/> 답변을 남겼어요!</AnswerText>
                        <CopyToClipboard text={`${window.location.origin}/answer/${question.questionId}`}>
                          <CopyLinkButton onClick={() => handleQuestionClick(question.questionId, index)} 
                            disabled={!question.voteEnd} style={{ backgroundColor: question.voteEnd ? '#EC582F' : '#F8F8F8' , color: question.voteEnd ? 'white' : '#808080' }}>
                              
                            {question.voteEnd ? (
                              <>
                                <Link src={homeCheck} />
                                답변보러가기 
                              </>
                            ) : (
                              '종료된 투표'
                            )}
                          </CopyLinkButton>
                        </CopyToClipboard>
                      </AnswerLinkContainer>
                    </FolderContent>
                    
                  </FolderImageContainer>
                  
                )}
                
              </div>
              
            ))}
          </>
          ) : (
            // <Questionp>
            //   {/* <QP>아직 만든 질문이 없어요.</QP>
            //   <Qp>새로운 질문을 만들고 공유해보세요.</Qp> */}
            //   <img src={EmptyFold}></img>
            //   //<Img src={NewquesButton} onClick={() => navigate(`/SurveyFirst`)} />
            // </Questionp>
            <Empty src={EmptyFold}></Empty>
          )
        }
          </>
        )}
        <ButtonNew src={buttonnew} onClick={handleButton4Click} />
        </DIVB>
      </Survey>
    </Div>
  );
}
  

export default HomePageFirst;
