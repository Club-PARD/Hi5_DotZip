import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import makeMyAnswer from '../../../img/makeMyAnswer.png';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where, orderBy, doc, updateDoc, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import doneFolder from '../../../img/endFolder.png'
const Div = styled.div`
display: flex;
flex-direction: column;
width: 100%;
align-items: center;
margin-top: 70px;
`;
const Container = styled.div`
  width: 375px;
`;
const Head = styled.div`
  color: var(--gray-90, #353535);
/* Head/H4-24-32-B */
font-size: 24px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 32px;
margin-left:18px;
`;
const Head3 = styled.div`
color: var(--gray-90, #353535);

/* Body/B6-16-B */
font-family: PretendardBold;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: 20px; /* 125% */
margin-left:24px;
margin-top: 32px;
`;

const FolderImageContainer = styled.div`
  position: relative;
  width: 327px;
  height: 96px;
  margin-top: 16px;

`;
const FolderContent = styled.div`
  display: flex;
  flex-direction: column;
border-radius: 10px;
border: 1px solid var(--gray-30, #ABABAB);
  width: 100%;
  height: 100%;
`;
const IMG = styled.img`
  position: absolute;
  width: 48px;
  height: 48px;
  margin-top: 24px;
  margin-left: 16px;
`;
const QText = styled.p`
  font-family: PretendardSemi;
  font-size: 14px;
  margin: 0;
  margin-left: 76px;
  font-weight: 600;
  width: 235px;
  word-break: keep-all;
  display: flex;
  margin-top: 27px;
`;
const CText = styled.p`
  font-size: 12px;
  margin-top: 6px;
  margin-left: 76px;
  font-weight: 600;
  width: 235px;
  font-family: Pretendard;
  color: #808080;
  word-break: keep-all;
  display: flex;
`;
const MakeMyAnswer = styled.img`
width: 327px;
height: 48px;
margin-top: 8px;
`;
const Warning = styled.div`
  color: var(--primary-orange, #EC582F);
/* Body/B2-12-SB */
font-size: 12px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 16px;
margin-top: 120px;
`;

const Hr = styled.hr`
  border: 1px dashed #ABABAB; // Specify the border width: ;
  width: 327px;
  margin-bottom: 120px;
  margin-top: 32px;
`;
const Body = styled.div`
color: var(--gray-60, #808080);
text-align: center;

/* Body/B5-16-SB */
font-size: 16px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 20px;
`;
const Body8 = styled.p`
overflow: hidden;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
color: var(--gray-60, #808080);
text-overflow: ellipsis;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 18px;
margin-right: 6px;
cursor: default;
`;
const Body9 = styled.p`
overflow: hidden;
-webkit-box-orient: vertical;
-webkit-line-clamp: 1;
color: var(--gray-60, #808080);
text-overflow: ellipsis;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 18px;
text-decoration-line: underline;
cursor: pointer;
`;
const PContainer = styled.div`
  display: flex;
margin-bottom: 100px;

`;

const EndVote = () => {
    const [documents, setDocuments] = useState([]);
    const totalVotes = documents.reduce((sum, documents) => sum + documents.totalVote, 0);
    const { questionId } = useParams();
    const navigate = useNavigate();
    const userName = localStorage.getItem("userName")
    const [questionzip, setQuestionZip] = useState();
    const [commentzip, setCommentZip] = useState();
    const [voteEnd, setVoteEnd] = useState(true);
    const [emoji, setEmoji] = useState([]);
    const[kakaoId,setKakaoId] = useState("");
    const updateVoteNum = async (newVoteNum) => {
      const questionRef = doc(dbService, 'zip_Question', questionId);
      await updateDoc(questionRef, {
        VoteNum: newVoteNum
      });
    };
  
    const onSubmit = () => {
      navigate('/');
    }
    const myPage = () =>{
      if(kakaoId===localStorage.getItem("kakaoId")) navigate(`/PickAnswer/${questionId}`);
      else navigate('/');
    }
    useEffect(() => {
      const q = query(
        collection(dbService, 'zip_Answer'),
        where('questionId', '==', questionId),
        orderBy('timestamp', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const answerList = [];
        snapshot.forEach((doc) => {
          if (doc.data().questionId === questionId) {
            answerList.push(doc.data());
          }
        });
        setDocuments(answerList);
      });
      fetchDataQuestion();
  
      return () => {
        unsubscribe();
  
      };
    }, [questionId]);
  
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
    updateVoteNum(totalVotes);
  
    localStorage.setItem("questionId", questionId);
  
    const fetchDataQuestion = async () => {
      const zipCollection = collection(dbService, "zip_Question");
      const zipQSnapshot = await getDocs(zipCollection);
      const QuestionzipArr = zipQSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const targetQ = QuestionzipArr.find((user) => user.id === questionId);
      setQuestionZip(targetQ.question);
      setCommentZip(targetQ.comment);
      setEmoji(targetQ.emoji);
      setVoteEnd(targetQ.voteEnd); // 투표 종료 여부 판단
      setKakaoId(targetQ.kakaoId);
    };
  
  
    return (
        <Div>
            <Container>
            <Head>이제는 답변을</Head>
            <Head>남길 수 없는 투표에요😭</Head>
            <Head3>받은 질문</Head3>
            </Container>
            <FolderImageContainer>
                <FolderContent>
                    <IMG src={
                        getEmojiImage(emoji)
                    }
                        alt="Emoji" />
                    <QText>{questionzip}</QText>
                    <CText>{commentzip}</CText>
                </FolderContent>
            </FolderImageContainer>
            <Hr/>
            <Body>다른 투표에 참여해보거나 </Body>
            <Body>나의 질문을 만들어 공유해보세요!</Body>
            <Warning>나도 지인들에게 투표를 받아보고 싶다면?</Warning>
            <MakeMyAnswer src={makeMyAnswer}
                onClick={onSubmit} />
            <PContainer>
              <Body8 onClick={myPage}>내가 만든 질문이라면? </Body8>
              <Body9 onClick={myPage}> 답변확인하러 가기</Body9>
            </PContainer>
        </Div>
    );
}

export default EndVote;

