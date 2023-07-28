import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc , where, orderBy, query} from "firebase/firestore";
import { dbService } from '../../../fbase';
import Modal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard'; //링크복사
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import KakaoShareButton from '../ProfilePage/ShareKakao';
import AnswerNavBar from '../../AnswerNavbar';
import CopyLinkMessage from './CopyLinkMessage';
import emoji1 from '../../../img/emoji1.png';
import emoji2 from '../../../img/emoji2.png';
import emoji3 from '../../../img/emoji3.png';
import emoji4 from '../../../img/emoji4.png';
import emoji5 from '../../../img/emoji5.png';
import Folder1 from '../../../img/Folder1.png';
import Folder2 from '../../../img/Folder2.png';
import Folder3 from '../../../img/Folder3.png';
import Folder4 from '../../../img/Folder4.png';
import EndVoteBox from '../../../img/EndVoteBox.png';
import LinkImage from '../../../img/Link.png';
import HomeButtonImage from '../../../img/GoHome.png';
import ModalImoticon from '../../../img/ModalImoticon.png';
import X from '../../../img/CancelX.png';
import ReasonBoxImage from '../../../img/ReasonBox.png';
import Line4 from '../../../img/Line4.png';
import Arrow from '../../../img/화살표.png';
import CheckAnswer from '../../../img/AnswerCheck.png';

//기본틀
const DDiv = styled.div`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 911px;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  margin: 0;
  padding: 0;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 70px;
`;

//text
const Text1 = styled.div`
  font-size: 24px;
  font-weight: 700;
  height: 60px;
  font-family: PretendardBold;
  margin-left: 16px;
  margin-bottom: 8px;
`;
const RedText = styled.span`
  color: #EC582F;
`;
const Text2 = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  font-family: PretendardSemi;
  margin-left: 16px;
  padding-bottom: 32px;
  color: #808080;
`;
const Text3 = styled.div`
  font-size: 20px;
  font-weight: 700;
  height: 24px;
  font-family: PretendardBold;
  margin-left: 16px;
  padding-bottom: 8px;
`;
const Text4 = styled.div`
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  font-family: PretendardSemi;
  margin-left: 16px;
  padding-bottom: 24px;
  color: #808080;
`;
//폴더
const FolderImageContainer = styled.div`
  position: relative;
  width: 359px;
  height: 196px;
  margin-bottom: 24px;
`;
const FolderImage = styled.img`
  width: 100%;
  height: 100%;
`;
const Font = styled.div`
color: var(--white-100, #FFF);
text-align: right;
/* Body/B4-14-SB */
font-family: PretendardSemi;
font-size: 14px;
font-style: normal;
font-weight: 600;
line-height: 18px;
display: flex;
justify-content: center;
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
  padding-top: 65px;
  width: 48px;
  height: 48px;
  z-index: 1;
`;
//폴더 안 텍스트
const QText = styled.p`
  font-size: 16px;
  margin: 0;
  margin-top: 70px;
  margin-left: 60px;
  margin-bottom: 19px;
  font-weight: 600;
  width: 235px;
  height: 36px;
  font-family: PretendardSemi;
  color: #212121;
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
  font-family: Pretendard;
  margin-top: 3px;
  padding: 0;
  width: 220px;
  height: 40px;
  border-radius: 8px;
  background: var(--orange-primary, #EC582F);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Link = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 4px; 
`;
//라인
const Line = styled.img`
  width: 327px;
  height: 1px;
  margin-left: 16px;
  margin-bottom: 32px;
`;
//답변들 box
const AnswerBox = styled.button`
  width: 327px;
  height: 64px;
  margin-left: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  border: 1px solid var(--white-80, #EFEFEF);
  background: none;
  cursor: pointer;
`;
const AnswerContainer = styled.div`
  display: flex;
  align-items: center;
`;
const AnswerText = styled.p`
  margin: 0;
  margin-top: 3px;
  margin-left: 12px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
  height: 20px;
  font-family: PretendardSemi;
  color: var(--gray-90, #353535);
`;
const CheckAnswerImg = styled.img`
  width: 13px;
  height: 8px;
  margin-left: 6px;
`;
const Percentage = styled.p`
  margin: 0;
  margin-left: 17px;
  width: 30px;
  font-size: 12px;
  font-weight: 600;
  height: 18px;
  font-family: Pretendard;
`;
const PercentageContainer = styled.div`
  display: flex;
  align-items: center;
`;
const VoteBox = styled.div`
  width: 260px;
  height: 8px;
  margin: 0;
  padding: 0;
  margin-left: 12px;
  border-radius: 10px;
  border: 0;
  background: ${({ percentage, isLargest }) =>
  isLargest
    ? `linear-gradient(to right, #EC582F ${percentage}%, #FFF8F3 ${percentage}%)`
    : `linear-gradient(to right, #ABABAB ${percentage}%, #EEE ${percentage}%)`};
  color: #000000;
`;
const VoteNumber = styled.p`
  margin: 0;
  margin-top: 3px;
  margin-bottom: 8px;
  margin-left: auto;
  font-size: 12px;
  font-weight: 500;
  width: 90px;
  height: 16px;
  font-family: Pretendard;
  color: #ABABAB;
`;
const ArrowImg = styled.img`
  width: 5px;
  height: 9px;
`;
const TotalNumber = styled.p`
  margin: 0;
  margin-right: 32px;
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
  margin-top: 64px;
  margin-left: 16px;
  margin-bottom: 8px;
  border: none;
  background: none;
  cursor: pointer;
`;
const HomeImage = styled.img`
  width: 100%;
  height: 100%;
`;
const EndButton = styled.button`
  width: 327px;
  height: 48px;
  margin-left: 16px;
  margin-bottom: 53px;
  border: none;
  background: none;
  cursor: pointer;
`;
const EndVoteImage = styled.img`
  width: 100%;
  height: 100%;
`;
//종료 모달 안에 내용들
const modalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '300px',
      borderRadius: '10px',
      borderStyle : 'none',
      background: 'white',
      margin: 'auto',
      padding: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex: '2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: '2',
    },
};
const ModalImg = styled.img`
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
`;
const ModalText1 = styled.p`
  margin: 0;
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 700;
  height: 24px;
  font-family: PretendardBold;
  color: #353535;
`;
const ModalText2 = styled.p`
  margin-bottom: 40px;
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  font-family: PretendardSemi;
  color: #808080;
  text-align: center;
`;
const ModalCancelButton = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 24px;
  margin-left: 20px;
  margin-right: 24px;
  background: var(--gray-10, #F8F8F8);
  text-align: center;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  font-family: PretendardSemi;
`;
const ModalCheckButton = styled.button`
  width: 120px;
  height: 40px;
  background: var(--background-orange, #FFF8F3);
  border-radius: 24px;
  text-align: center;
  border: 0;
  cursor: pointer;
  font-size: 14px;
  font-family: PretendardSemi;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CancelButton = styled.button`
  width: 35px;
  height: 24px;
  margin-left: auto;
  margin-right: 28px;
  padding-right: 10px;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 12px;
  font-family: PretendardSemi;
`;
const CancelX = styled.img`
  width: 100%;
  height: 100%;
`;
//이유 모달 안에 내용들
const reasonModalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '600px',
      borderRadius: '10px',
      borderStyle : 'none',
      background: 'var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))',
      margin: 'auto',
      padding: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex: '2',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: '2',
    },
};
const Box2Image = styled.img`
  width: 295px;
  height: 200px;
  margin-top: 30px;
`;
const ReasonBox = styled.div`
  width: 240px;
  height: 320px;
  border-radius: 10px;
  background: var(--white-100, #FFF);
  box-shadow: 0px 2px 10px 0px #FFE2CE;
  margin-top: -250px;
`;
const ReasonModalText1 = styled.p`
  text-align: center;
  width: 235px;
  font-size: 18px;
  font-weight: 600;
  font-family: PretendardSemi;
  color: #353535;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const Point = styled.div`
  display: inline-block;
  padding: 0 16px;
  height: 36px;
  margin-top: 16px;
  margin-bottom: 48px;
  border-radius: 22px;
  border: 2px solid var(--primary-orange, #EC582F);
`;
const ReasonModalText2 = styled.p`
  color: #EC582F;
  text-align: center;
  margin-top: 8px;
  font-size: 16px;
  font-family: PretendardBold;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
`;
const ReasonModalText3 = styled.p`
  color: #ABABAB;
  text-align: center;
  font-size: 14px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
  padding-top: 25px;
`;
const ReasonModalText3Point = styled.span`
  color: var(--gray-60, #808080);
  font-size: 18px;
`;
const ReasonModalText4 = styled.p`
  color: var(--primary-orange, #EC582F);
  text-align: center;
  font-size: 18px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
  width: 148px;
  height: 126px;
  margin: 0;
  margin-left: 16px;
  margin-bottom: 48px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
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
    const { index } = location.state || { index: 0 };
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
        window.scrollTo(0, 0);
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
            localStorage.setItem('modalConfirmed', 'true'); //Message띄우기
            navigate('/VotingPage');
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

    //링크 복사하기
    const [showMessage, setShowMessage] = useState(false);
    const [copiedLinkId, setCopiedLinkId] = useState('');

    const handleLinkButtonClick = () => {
    setCopiedLinkId(questionId);
    setShowMessage(true);
    setTimeout(() => {
        setShowMessage(false);
    }, 1500);
    };

  const [currentReasonIndex, setCurrentReasonIndex] = useState(0);

  const handleNextReason = () => {
    if (currentReasonIndex < reasonzips.length - 1) {
      setCurrentReasonIndex(currentReasonIndex + 1);
    }
  };

  const handlePreviousReason = () => {
    if (currentReasonIndex > 0) {
      setCurrentReasonIndex(currentReasonIndex - 1);
    }
  };

  //totalVote최대 골라내기
  const maxTotalVote = answerzips.reduce((max, answerzip) => {
    return answerzip.totalVote > max ? answerzip.totalVote : max;
  }, 0);
    

    return (
        <>
        <AnswerNavBar/>
        <DDiv>
            <Div>
                <Text1><RedText>{userNickname}</RedText> 님의 <br></br> 진행중인 질문</Text1> 
                <Text2>내가 생성한 질문의 답변과 이유를 확인해보세요!</Text2>
                <FolderImageContainer>
                  <FolderImage src={selectedFolderImage} />
                  <FolderContent>
                    <IMG src={getEmojiImage(emoji)} alt="Emoji" />
                    <QText>{questionzip}</QText>
                    <AnswerLinkContainer>
                    {voteEnd && <KakaoShareButton questionId={questionId}/>}
                    <CopyToClipboard text={`${window.location.origin}/answer/${questionId}`}>
                      <CopyLinkButton onClick={(event) => {event.stopPropagation(); handleLinkButtonClick(questionId); }} 
                      disabled={!voteEnd} style={{ backgroundColor: voteEnd ? '#EC582F' : '#F8F8F8' , marginLeft: voteEnd ? '0' : '44px' ,  borderRadius: voteEnd ? '8px' : '20px',
                      color: voteEnd ? 'white' : '#808080', cursor: voteEnd ? 'pointer' : 'default', border: voteEnd ? '1px solid #CF4823' : 'none' }}>
                        {voteEnd ? (
                          <Font>
                            <Link src={LinkImage} /> 링크 복사
                          </Font>
                        ) : (
                          '종료된 투표'
                        )}
                      </CopyLinkButton>
                    </CopyToClipboard>
                      {showMessage && copiedLinkId === questionId && <CopyLinkMessage />}
                    </AnswerLinkContainer>
                  </FolderContent>
                </FolderImageContainer>
                <Line src = {Line4} />
                <Text3>투표 현황</Text3>
                <Text4>각 답변을 눌러 이유를 함께 확인해보세요!</Text4>
                {answerzips.map((answerzip, index) => (
                    <div key={answerzip.id}>
                        <AnswerBox onClick={() => handleVoteBoxClick(answerzip.answer, answerzip.id)}>
                            <AnswerContainer>
                                <AnswerText>{answerzip.answer} {index === answerzips.length - 1 && <CheckAnswerImg src={CheckAnswer}/>}</AnswerText>
                                <VoteNumber>{answerzip.totalVote}명의 이유보기 <ArrowImg src={Arrow}/></VoteNumber>
                            </AnswerContainer>
                            <PercentageContainer>
                                <VoteBox percentage={(answerzip.totalVote / totalVotes) * 100} isLargest={answerzip.totalVote === maxTotalVote}/>
                                <Percentage style={{ color: answerzip.totalVote === maxTotalVote ? '#EC582F' : '#808080' }}>{((answerzip.totalVote / totalVotes) * 100).toFixed(0)}%</Percentage>
                            </PercentageContainer>
                        </AnswerBox>
                    </div>
                ))}
                <TotalNumber>총 <RedText>{totalVotes}명</RedText>이 참여했어요.</TotalNumber>
                <BackHomeButton onClick={handleBackHome}><HomeImage src = {HomeButtonImage} /></BackHomeButton>
                {voteEnd ? (<EndButton onClick={() => setConfirmEndVoteModalOpen(true)}><EndVoteImage src = {EndVoteBox} /></EndButton>) : null}
                <Modal isOpen={confirmEndVoteModalOpen} onRequestClose={handleCloseEndModal} contentLabel="투표 종료 확인" style={modalStyles}>
                    <CancelButton onClick={handleCloseEndModal}><CancelX src={X}/></CancelButton>
                    <ModalImg src = {ModalImoticon}/>
                    <ModalText1>충분히 답변을 받으셨나요?</ModalText1>
                    <ModalText2>투표를 종료하시면<br></br>더 이상 답변을 받을 수 없어요.</ModalText2>
                    <ButtonContainer>
                      <ModalCancelButton onClick={handleCloseEndModal} style={{color: '#808080'}}>취소</ModalCancelButton>
                      <ModalCheckButton onClick={handleEndVote} style={{color: '#EC582F'}}>확인</ModalCheckButton>
                    </ButtonContainer>
                </Modal>


                <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={reasonModalStyles}>
                  <CancelButton onClick={handleCloseModal} style={{marginTop: '28px', marginBottom: '4px'}}><CancelX src={X}/></CancelButton>
                    <ReasonModalText1>{questionzip}</ReasonModalText1>
                    <Point><ReasonModalText2>{keyword}</ReasonModalText2></Point>
                      <Box2Image src = {ReasonBoxImage}></Box2Image>
                        <ReasonBox>
                        {reasonzips[currentReasonIndex] && (
                          <>
                            <ReasonModalText3><ReasonModalText3Point>{reasonzips[reasonzips.length - 1 - currentReasonIndex].nickname}</ReasonModalText3Point> 님의 답변</ReasonModalText3>
                            <ReasonModalText4>{reasonzips[reasonzips.length - 1 - currentReasonIndex].reason}</ReasonModalText4>
                          </>
                        )}
                            <ModalCancelButton style={{width: '72px', height: '32px', marginLeft:'16px', marginRight:'16px', cursor: currentReasonIndex === 0 ? 'default' : 'pointer', color: currentReasonIndex === 0 ? '#808080' : '#EC582F',
                             background: currentReasonIndex === 0 ? 'var(--gray-10, #F8F8F8)':'var(--gradation-back, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))', fontSize: '12px'}} 
                            onClick={handlePreviousReason} disabled={currentReasonIndex === 0}>이전</ModalCancelButton>
                            <ModalCheckButton style={{width: '72px', height: '32px', margin: '0', cursor: currentReasonIndex === reasonzips.length - 1 ? 'default' : 'pointer', color: currentReasonIndex === reasonzips.length - 1 ? '#808080' : '#EC582F',
                            background: currentReasonIndex === reasonzips.length - 1 ? 'var(--gray-10, #F8F8F8)':'var(--gradation-back, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))', fontSize: '12px'}}
                            onClick={handleNextReason} disabled={currentReasonIndex === reasonzips.length - 1}>다음</ModalCheckButton>
                        </ReasonBox>
                    <ModalCheckButton isopen="false" onClick={handleCloseModal} style={{ width: '247px', marginBottom: '24px', marginTop: 'auto' }}> <RedText>확인</RedText> </ModalCheckButton>
                </Modal>
            </Div>
        </DDiv>
        </>
    );
};
//questionID가 같으면 이유는 answerArr비교해서 해당 모듈 창 띄우기 + 해당 사람의 별명
export default PickAnswerPage;