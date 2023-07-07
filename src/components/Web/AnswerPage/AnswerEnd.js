import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { dbService } from "../../../fbase.js";
import { collection, onSnapshot, query, where, orderBy, doc, updateDoc, getDocs } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../AnswerNavbar.js';
import samllFolder1 from '../../../img/smallFolder1.png';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import makeMyAnswer from '../../../img/makeMyAnswer.png';

const FolderImageContainer = styled.div`
  position: relative;
  width: 357px;
  margin-top: 32px;

`;
const FolderImage = styled.img`

  width: 100%;
  height: 100%;
  z-index: 0;
`;
const FolderContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 40px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const IMG = styled.img`
  position: absolute;
  margin-top: 53px;
  width: 48px;
  height: 48px;
  margin-left: 6px;
`;
const QText = styled.p`
  font-family: PretendardSemi;
  font-size: 14px;
  margin: 0;
  margin-top: 56px;
  margin-left: 66px;
  font-weight: 600;
  width: 235px;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const CText = styled.p`
  font-size: 12px;
  margin-top: 8px;
  margin-left: 66px;
  font-weight: 600;
  width: 235px;
  font-family: Pretendard;
  color: #808080;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  width: 375px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  align-items: center;
  margin-top: 70px;
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
const Hr = styled.hr`
  border: 1px dashed #ABABAB; // Specify the border width: ;
  width: 327px;
  margin-bottom: 32px;
  margin-top: 24px;
`;
const Header1 = styled.div`
  color: var(--black-90, #212121);
font-size: 20px;
font-family: PretendardBold;
font-style: normal;
font-weight: 700;
line-height: 24px;
margin-left: 24px;
margin-bottom: 24px;
`;
const VoteBox = styled.div`
    height: 64px;
    width: 327px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid var(--white-80, #EFEFEF);
    background: none;
`;
const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
`;
const AnswerText = styled.p`
    margin: 0;
    margin-top: 12px;
    margin-left: 12px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    height: 20px;
    font-family: PretendardSemi;
`;
const VotePercentage = styled.p`
    margin-top: 14px;
    margin-right: 8px;
    margin-bottom: 8px;
    margin-left: auto;
    font-size: 14px;
    font-weight: 600;
    height: 18px;
    font-family: PretendardSemi;
    color: #EC582F;
`;
const Percentage = styled.p`
    margin-top: 14px;
    margin-right: 8px;
    margin-bottom: 8px;
    margin-left: auto;
    font-size: 14px;
    font-weight: 600;
    height: 18px;
    font-family: PretendardSemi;
    color: #ababab;
`;
const PercentageContainer = styled.div`
    display: flex;
    align-items: center;
`;
const VotePercentBox = styled.div`
    width: 280px;
    height: 8px;
    margin-left: 12px;
    border-radius: 10px;
    border: 0;
    background: linear-gradient(to right, #EC582F ${props => props.percentage}%, #FFF8F3 ${props => props.percentage}%);
    color: #000000;
`;
const PercentBox = styled.div`
    width: 280px;
    height: 8px;
    margin-left: 12px;
    border-radius: 10px;
    border: 0;
    background: linear-gradient(to right, #ababab ${props => props.percentage}%, #eee ${props => props.percentage}%);
    color: #000000;
`;
const VoteNumber = styled.p`
    margin: 0;
    margin-left: 3px;
    font-size: 12px;
    font-weight: 500;
    height: 16px;
    font-family: Pretendard;
    color: #ABABAB;
`;
const MakeMyAnswer = styled.img`
  width: 327px;
  height: 48px;
  margin-top: 8px;
  margin-bottom: 40px;
`;
const Warning = styled.div`
  color: var(--primary-orange, #EC582F);
/* Body/B2-12-SB */
font-size: 12px;
font-family: PretendardSemi;
font-style: normal;
font-weight: 600;
line-height: 16px;
margin-top: 30px;
`;


const AnswerEnd = () => {

  const [documents, setDocuments] = useState([]);
  const totalVotes = documents.reduce((sum, documents) => sum + documents.totalVote, 0);
  const { questionId } = useParams();
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName")
  const [questionzip, setQuestionZip] = useState();
  const [commentzip, setCommentZip] = useState();
  const [voteEnd, setVoteEnd] = useState(true);
  const [emoji, setEmoji] = useState([]);
  const updateVoteNum = async (newVoteNum) => {
    const questionRef = doc(dbService, 'zip_Question', questionId);
    await updateDoc(questionRef, {
      VoteNum: newVoteNum
    });
  };

  const onSubmit = () => {
    navigate('/');
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
  };



  return (
    <Div>
      <NavBar />
      <Container>
        <Head>답변 전달 완료!</Head>
      </Container>

      <FolderImageContainer>
        <FolderImage src={samllFolder1} />
        <FolderContent>
          <IMG src={getEmojiImage(emoji)} alt="Emoji" />
          <QText>{questionzip}</QText>
          <CText>{commentzip}</CText>
        </FolderContent>
      </FolderImageContainer>
      <Hr></Hr>
      <Container>
        <Header1>투표 결과</Header1>
      </Container>
      {documents.map(({ answer, totalVote, answerId }) => (
        // <VoteBox key={answerId} percentage={(totalVote / totalVotes) * 100}>{answer} : {totalVote}</VoteBox>
        <VoteBox key={answerId}>
          <AnswerContainer>
            <AnswerText>{answer}</AnswerText>
            {answerId === localStorage.getItem(questionId) ? (
              <VotePercentage>{((totalVote / totalVotes) * 100).toFixed(0)}%</VotePercentage>
            ) : (
              <Percentage>{((totalVote / totalVotes) * 100).toFixed(0)}%</Percentage>
            )}
          </AnswerContainer>
          <PercentageContainer>
            {answerId === localStorage.getItem(questionId) ? (
              <VotePercentBox percentage={(totalVote / totalVotes) * 100} />
            ) : (
              <PercentBox percentage={(totalVote / totalVotes) * 100} />
            )}
          </PercentageContainer>
        </VoteBox>
      ))}
      <Warning>나도 지인들에게 투표를 받아보고 싶다면?</Warning>
      <MakeMyAnswer src={makeMyAnswer} onClick={onSubmit} />

    </Div>
  );
};

export default AnswerEnd;
