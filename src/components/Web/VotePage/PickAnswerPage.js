import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc , where, orderBy, query} from "firebase/firestore";
import { dbService } from '../../../fbase';
import Modal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard'; //링크복사
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import KakaoShareButton from '../ProfilePage/ShareKakao';
import BackNavBar from '../../BackNavbar';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import Folder1 from '../../../img/Folder1.png';
import Folder2 from '../../../img/Folder2.png';
import Folder3 from '../../../img/Folder3.png';
import Folder4 from '../../../img/Folder4.png';
import Tip from '../../../img/Tip.png';
import HeartTip from '../../../img/HeartTip.png';
import LinkImage from '../../../img/Link.png';
import HomeButtonImage from '../../../img/GoHome.png';
import ModalImoticon from '../../../img/ModalImoticon.png';

//기본틀
const DDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 812px;
`;
const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 375px;
    margin: 0;
    padding: 0;
    margin-left: 8px;
    margin-right: 8px;
`;
//버튼들
const LinkButton = styled.button` //링크복사
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
    display: inline-block;
`;
const LinkMessage = styled.div` //링크복사
    width: 200px;
    background: white;
    padding: 10px;
    border: 1px solid black;
`;
//text
const Text1 = styled.div`
  font-size: 24px;
  font-weight: 700;
  height: 28px;
  font-family: Pretendard;
  margin-left: 16px;
  margin-top: 30px;
  margin-bottom: 8px;
`;
const RedText = styled.span`
  color: #EC582F;
`;
const Text2 = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  font-family: Pretendard;
  margin-left: 16px;
  padding-bottom: 32px;
  color: #808080;
`;
const Text3 = styled.div`
  font-size: 20px;
  font-weight: 700;
  height: 24px;
  font-family: Pretendard;
  margin-left: 16px;
  padding-bottom: 8px;
`;
const Text4 = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  font-family: Pretendard;
  margin-left: 16px;
  padding-bottom: 8px;
  color: #808080;
`;
//폴더
const FolderImageContainer = styled.div`
  position: relative;
  width: 375px;
  height: 196px;
  margin-bottom: 24px;
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
  margin-left: 32px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;
const IMG = styled.img`
  position: absolute;
  padding-top: 58px;
  width: 48px;
  height: 48px;
  z-index: 1;
`;
const TipImage = styled.img`
  position: absolute;
  margin-top: 115px;
  width: 53px;
  height: 23px;
  z-index: 1;
`;
//폴더 안 텍스트
const QText = styled.p`
  font-size: 14px;
  margin: 0;
  margin-top: 63px;
  margin-left: 60px;
  margin-bottom: 19px;
  weight: 600;
  width: 235px;
  height: 36px;
  font-family: Pretendard;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
const CText = styled.p`
  font-size: 12px;
  margin: 0;
  margin-left: 60px;
  weight: 600;
  width: 235px;
  height: 14px;
  font-family: Pretendard;
  color: #808080;
  z-index: 1;
  word-break: keep-all;
  display: flex;
  align-items: center;
`;
//링크복사
const AnswerLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CopyLinkButton = styled.button`
  border: none;
  margin-top: 13px;
  padding: 0;
  width: 97px;
  height: 32px;
  border-radius: 20px;
  color: white;
  background: #EC582F;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Link = styled.img`
  width: 16px;
  height: 16px;
`;
//tip box
const TipBox = styled.div`
    width: 327px;
    height: 40px;
    margin-left: 16px;
    margin-bottom: 16px;
    border-radius: 30px;
    background: var(--background-orange, #FFF8F3);
    display: flex;
    align-items: center;
`;
const HeartTipImage = styled.img`
    margin-left: 16px;
    width: 55px;
    height: 24px;
`;
const TipText = styled.p`
    margin-left: 8px;
    margin-top: 12px;
    font-size: 12px;
    font-weight: 600;
    height: 16px;
    font-family: Pretendard;
    color: #808080;
`;
//답변들 box
const AnswerBox = styled.div`
    width: 327px;
    height: 64px;
    width: 327px;
    margin-left: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid var(--white-80, #EFEFEF);
`;
const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
`;
const AnswerText = styled.p`
    margin-top: 12px;
    margin-left: 12px;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    height: 20px;
    font-family: Pretendard;
`;
const Percentage = styled.p`
    margin-top: 14px;
    margin-right: 8px;
    margin-bottom: 8px;
    margin-left: auto;
    font-size: 14px;
    font-weight: 600;
    height: 18px;
    font-family: Pretendard;
    color: #EC582F;
`;
const PercentageContainer = styled.div`
    display: flex;
    align-items: center;
`;
const VoteBox = styled.button`
    width: 280px;
    height: 8px;
    margin-left: 12px;
    border-radius: 10px;
    border: 0;
    background: linear-gradient(to right, #EC582F ${props => props.percentage}%, #FFF8F3 ${props => props.percentage}%);
    color: #000000;
`;
const VoteNumber = styled.p`
    margin: 0;
    margin-top: 4px;
    margin-right: 12px;
    margin-left: auto;
    font-size: 12px;
    font-weight: 500;
    height: 16px;
    font-family: Pretendard;
    color: #ABABAB;
`;
const TotalNumber = styled.p`
    margin-right: 24px;
    margin-left: auto;
    font-size: 12px;
    font-weight: 500;
    height: 16px;
    font-family: Pretendard;
    color: #353535;
`;
//아래 버튼
const BackHomeButton = styled.button`
    width: 327px;
    height: 48px;
    margin-top: 80px;
    margin-left: 12px;
    margin-bottom: 8px;
`;
const EndButton = styled.button`
    margin-left: 12px;
    width: 327px;
    height: 48px;
`;
//모달 안에 내용들
const modalStyles = {
    content: {
        position: 'absolute',
        width: '343px',
        height: '300px',
        borderRadius: '10px',
        background: 'white',
        margin: '180px',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '2',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        zIndex: '2',
      },
};
const ModalImg = styled.img`
    width: 48px;
    height: 48px;
    margin-top: 40px;
    margin-left: 147px;
    margin-bottom: 16px;
`;
const ReasonBox = styled.div`
    width: 200px;
    height: 100px;
    background: yellow;
`;
const ModalCheck = styled.button`
    width: 100px;
    height: 50px;
    padding: 5px;
    background: white;
    color: black;
`;
const ModalText1 = styled.p`
    margin-left: 7px;
    font-size: 20px;
    font-weight: 700;
    height: 24px;
    font-family: Pretendard;
    color: #353535;
`;



function PickAnswerPage() {
    // 답변 불러오기
    const [questionzip, setQuestionZip] = useState();
    const [commentzip, setCommentZip] = useState();
    const [answerzips, setAnswerZip] = useState([]);
    const [reasonzips, setReasonZip] = useState([]);
    const {questionId} = useParams(); //questionid 받아오기
    const [voteEnd, setVoteEnd] = useState(true);
    const [userNickname] = useState(localStorage.getItem("userName"));
    const [emoji, setEmoji] = useState([]);

    //폴더 이미지 가져오기
    const location = useLocation();
    const { index } = location.state;
    let selectedFolderImage;
    switch ((index) % 4) {
      case 0:
        selectedFolderImage = Folder1;
        break;
      case 1:
        selectedFolderImage = Folder2;
        break;
      case 2:
        selectedFolderImage = Folder3;
        break;
      case 3:
        selectedFolderImage = Folder4;
        break;
      default:
        selectedFolderImage = Folder1;
    }

    useEffect(() => {
        fetchDataQuestion();
        fetchDataAnswer();
    }, []);

    const fetchDataQuestion = async () => {
        const zipCollection = collection(dbService, "zip_Question");
        const zipQSnapshot = await getDocs(zipCollection);
        const QuestionzipArr = zipQSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const targetQ = QuestionzipArr.find((user) => user.id === questionId);
        console.log(targetQ);
        setQuestionZip(targetQ.question);
        setCommentZip(targetQ.comment);
        setEmoji(targetQ.emoji); 
        setVoteEnd(targetQ.voteEnd); // 투표 종료 여부 판단
    };

    const fetchDataAnswer = async () => {
        const answerZipCollection = collection(dbService, "zip_Answer");
        const q = query(answerZipCollection, where("questionId", "==", questionId), orderBy("timestamp", "desc"));
        const answerZipSnapshot = await getDocs(q);
        
        const targetAnswers = answerZipSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      
        setAnswerZip(targetAnswers);
        console.log(targetAnswers);
      
        return () => {
          answerZipCollection(); // Stop listening
        };
      };
      
    

    const fetchReasons = (answerID) => {
        if (!answerID) {return;}
        const reasonZipCollection = collection(dbService, "zip_Reason");
        getDocs(reasonZipCollection)
        .then((reasonZipSnapshot) => {
            const reasonZipArr = reasonZipSnapshot.docs.map((doc) => ({
                ...doc.data(),
        }));
        const targetReason = reasonZipArr.filter(
            (reason) => reason.answerId === answerID
          );
          setReasonZip(targetReason);
          console.log(targetReason);
        });
        return () => {
            reasonZipCollection();
        };
    };

    //modal창띄우고 내리는 함수 관련
    Modal.setAppElement('#root'); // 예시로 root 요소를 App 요소로 설정
    const [keyword, setKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleVoteBoxClick = (answer, answerID) => {
        setKeyword(answer);
        setIsModalOpen(true);
        fetchReasons(answerID); //zip_reason컬렉션에서 해당 정보와 일치하는 이유 불러오기
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //투표종료하기
    const navigate = useNavigate();
    const [confirmEndVoteModalOpen, setConfirmEndVoteModalOpen] = useState(false);
    const handleEndVote = () => {
        const docRef = doc(dbService, "zip_Question", questionId);
        updateDoc(docRef, { voteEnd: false })
        .then(() => {
        // Update the local state after successful update in Firebase
        setVoteEnd(false);
            navigate('/MyProfile');
        })
        .catch((error) => {
        // Handle the error
        console.error("Error updating voteEnd field:", error);
        });
    };
    const handleCloseEndModal = () => {
        setConfirmEndVoteModalOpen(false);
    };
    
    //홈으로 돌아가기
    const handleBackHome = () => {
        navigate('/Home');
    };
    const totalVotes = answerzips.reduce((sum, answerzip) => sum + answerzip.totalVote, 0);

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
    //링크 복사하기
    const [showMessage, setShowMessage] = useState(false);
    const [copiedLinkId, setCopiedLinkId] = useState('');

    const handleLinkButtonClick = () => {
    const link = `${window.location.origin}/answer/${questionId}`;
    setCopiedLinkId(questionId);
    setShowMessage(true);
    setTimeout(() => {
        setShowMessage(false);
    }, 1000);
    };

    return (
        <>
        <BackNavBar/>
        <DDiv>
            <Div>
                <Text1><RedText>{userNickname}</RedText> 님의 진행중인 폴더</Text1> 
                <Text2>내가 생성한 폴더의 답변과 이유를 확인해보세요!</Text2>
                <FolderImageContainer>
                  <FolderImage src={selectedFolderImage} />
                  <FolderContent>
                    <IMG src={getEmojiImage(emoji)} alt="Emoji" />
                    <TipImage src={Tip} />
                    <QText>{questionzip}</QText>
                    <CText>{commentzip}</CText>
                    <AnswerLinkContainer>
                    <KakaoShareButton />
                    <CopyToClipboard text={`${window.location.origin}/answer/${questionId}`}>
                        <CopyLinkButton onClick={(event) => {event.stopPropagation(); handleLinkButtonClick(questionId);}} 
                        disabled={!voteEnd} style={{ backgroundColor: voteEnd ? '#EC582F' : 'gray' }}>
                          <Link src={LinkImage} />링크 복사
                        </CopyLinkButton>
                      </CopyToClipboard>
                      {showMessage && copiedLinkId === questionId && <LinkMessage>링크가 복사되었습니다</LinkMessage>}
                    </AnswerLinkContainer>
                  </FolderContent>
                </FolderImageContainer>
                <Text3>투표결과</Text3>
                <Text4>각 답변을 눌러 이유를 함께 확인해보세요!</Text4>
                <TipBox>
                    <HeartTipImage src = {HeartTip}></HeartTipImage>
                    <TipText>키워드를 작성한 이유는 나에게만 보여요.</TipText>
                </TipBox>
                {answerzips.map((answerzip) => (
                    <div key={answerzip.id}>
                        <AnswerBox>
                            <AnswerContainer>
                                <AnswerText>{answerzip.answer}</AnswerText>
                                <Percentage>{((answerzip.totalVote / totalVotes) * 100).toFixed(0)}%</Percentage>
                            </AnswerContainer>
                            <PercentageContainer>
                                <VoteBox percentage={(answerzip.totalVote / totalVotes) * 100} onClick={() => handleVoteBoxClick(answerzip.answer, answerzip.id)} />
                                <VoteNumber>{answerzip.totalVote}명</VoteNumber>
                            </PercentageContainer>
                        </AnswerBox>
                    </div>
                ))}
                <TotalNumber>총 <RedText>{totalVotes}명</RedText>이 참여했어요.</TotalNumber>
                <BackHomeButton onClick={handleBackHome}>홈으로 돌아가기</BackHomeButton>
                {voteEnd ? (<EndButton onClick={() => setConfirmEndVoteModalOpen(true)}>투표 종료하기</EndButton>) : null}
                <Modal isOpen={confirmEndVoteModalOpen} onRequestClose={handleCloseEndModal} contentLabel="투표 종료 확인" style={modalStyles}>
                    <ModalImg src = {ModalImoticon}/>
                    <ModalText1>진짜로 투표를 종료하시겠습니까?</ModalText1>
                    <button onClick={handleEndVote}>진짜 종료하기</button>
                    <button onClick={handleCloseEndModal}>취소</button>
                </Modal>

                <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
                    <h1>{keyword}으로 답변한 <br></br>사람들의 이유</h1>
                    {reasonzips.map(({ reason, nickname }) => (
                        <ReasonBox key={reason}>
                            <h6>작성자 nickname: {nickname}</h6>
                            <h3>{reason}</h3>
                        </ReasonBox>
                    ))}
                    <ModalCheck isopen="false" onClick={handleCloseModal}>확인</ModalCheck>
                </Modal>
            </Div>
        </DDiv>
        </>
    );
};
//questionID가 같으면 이유는 answerArr비교해서 해당 모듈 창 띄우기 + 해당 사람의 별명
export default PickAnswerPage;