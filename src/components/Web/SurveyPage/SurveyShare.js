import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { dbService } from '../../../fbase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import styled from 'styled-components';
import { KakaoIdContext } from '../../../KakaoIdContext';
import { UserNameContext } from '../../../UserNameContext';
import AddAnswer from '../AnswerPage/AddAnswer';
import CopyToClipboard from 'react-copy-to-clipboard';
import KakaoShareButton from '../ProfilePage/ShareKakao';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';

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

const LinkButton = styled.button`
  width: 200px;
  height: 100px;
  padding: 5px;
  background: red;
`;

const LinkMessage = styled.div`
  width: 200px;
  background: white;
  padding: 10px;
  border: 1px solid black;
`;

const SurveyShare = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [kakaoContext] = useContext(KakaoIdContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [question, setQuestion] = useState('');
  const [comment, setComment] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [userNickname] = useState(localStorage.getItem("userName"));
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(dbService, 'zip_Question', questionId), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setQuestion(data.question);
        setComment(data.comment);
        setEmoji(data.emoji); // Retrieve the "emoji" variable from Firestore
      } else {
        // Handle case when document does not exist
      }
    });

    return () => {
      unsubscribe();
    };
  }, [questionId]);

  const showModal = () => {
    setModalOpen(!modalOpen);
  };

  const voteLink = `${window.location.origin}/answer/${questionId}`;
  const [showMessage, setShowMessage] = useState(false);
  const handleCopyLink = () => {
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

  return (
    <Div>
      <Survey>
        <Header2>
          <HeaderDiv>{userNickname}님의 폴더 생성 완료!</HeaderDiv>
          <HeaderP>링크를 공유하고 답변을 받아보세요!</HeaderP>
        </Header2>
        <div>
          <P>Question: {question}</P>
          <P>Comment: {comment}</P>
          {emoji && <img src={emojiImage} alt="Emoji" />}
        </div>
        <CopyToClipboard text={voteLink}>
          <div>
            <KakaoShareButton />
            <LinkButton onClick={handleCopyLink}>링크 복사하기</LinkButton>
            {showMessage && <LinkMessage>링크가 복사되었습니다</LinkMessage>}
          </div>
        </CopyToClipboard>

        <Button2 onClick={() => navigate(`/PickAnswer/${questionId}`)}>
          답변보러가기
        </Button2>
        {/* <h2>투표하기</h2> <p>키워드 후보는 1인 1개만 추가할 수 있어요.</p>
          <button onClick={showModal}>키워드 후보 추가하기</button>
            {modalOpen && <AddAnswer setModalOpen={setModalOpen} />} */}
      </Survey>
    </Div>
  );
};

export default SurveyShare;
