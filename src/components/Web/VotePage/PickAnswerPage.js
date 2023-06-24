import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, collectionGroup, where, onSnapshot } from "firebase/firestore";
import { dbService } from '../../../fbase';
import Modal from 'react-modal';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';



const Div = styled.div`

`;
//제목
const Title = styled.div`
    width: 400px;
    height: 100px;
    padding: 5px;
    background: pink;
`;
//투표 박스
const VoteBox = styled.button`
    width: 400px;
    height: 200px;
    margin: 5px;
    border: 1px solid black;
    background: skyblue;
    color: #ffffff;
`;
//버튼들
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
const EndButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const EditButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
//모달 안에 내용들
const modalStyles = {
    content: {
      width: '400px',
      height: '600px',
      margin: 'auto',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      backgroundColor: '#fff',
    },
};
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


function PickAnswerPage() {
// 답변 불러오기
const [useridzips, setUserIdZip] = useState();
const [usernamezips, setUserNameZip] = useState();
const [questionzip, setQuestionZip] = useState();
const [commentzip, setCommentZip] = useState();
const [answerzips, setAnswerZip] = useState([]);
const [reasonzips, setReasonZip] = useState();
const TargetUserId = 2861906505; // userid 받아오기
const QuestionId = 'iIOd2xPHp5yMQwOvoSTw'; //questionid 받아오기


useEffect(() => {
    //모든 kakaoId정보 가져오기
        const fetchData = async () => {
            //모든 kakao사용자 불러오기
            const kakaoId = query(collection(dbService, "kakaoId"));
            const unsubscribe = onSnapshot(kakaoId, (snapshot) => {
            const idArr = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            //일치하는 사용자 찾기
            const targetUser = idArr.find(user => user.userId === TargetUserId);
            setUserIdZip(targetUser.userId);
            setUserNameZip(targetUser.userName);
            //일치하는 사용자의 zip(질문컬렉션)으로 이동하기
            if (targetUser) {
                const zipCollection = collection(dbService, "kakaoId", targetUser.id, "zip");
                getDocs(zipCollection)
                  .then((zipSnapshot) => {
                    const zipArr = zipSnapshot.docs.map((doc) => ({
                      id: doc.id,
                      ...doc.data(),
                    }));
                    //console.log(zipArr);
                    //일치하는 질문 찾기
                    const targetQ = zipArr.find(user => user.id === QuestionId);
                    setQuestionZip(targetQ.question);
                    setCommentZip(targetQ.comment);
                    //console.log(targetQ);



                    // 이유 불러오기



                    //일치하는 질문의 zip_answers(답변 컬렉션)으로 이동하기
                    if(targetQ) {
                        const answerZipCollection = collection(dbService, "kakaoId", targetUser.id, "zip", targetQ.id,"zip_answers");
                        getDocs(answerZipCollection)
                        .then((answerZipSnapshot) => {
                            const answerZipArr = answerZipSnapshot.docs.map((doc) => ({
                              id: doc.id,
                              ...doc.data(),
                        }));
                        //console.log(answerZipArr);
                        setAnswerZip(answerZipArr);
                        // 이유 불러오기



                        });
                    } //if(targetQ)
                  });
            };
            return () => {
                unsubscribe();
            };
        })}
    fetchData();
}, []);

    //modal창띄우고 내리는 함수 관련
    const [keyword, setKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleVoteBoxClick = (answer) => {
        setKeyword(answer);
        setIsModalOpen(true);
        
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    //링크 복사하기
    const voteLink = window.location.href;
    const [showMessage, setShowMessage] = useState(false);
    const handleCopyLink = () => {
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1000);
    };

    //투표수정하기
    const navigate = useNavigate();
    const handleEditVote = () => {
        navigate('/EditVotePage');
    };
  
    //투표종료하기
    const handleEndVote = () => {
      navigate('/MyProfile');
    };
    const totalVotes = answerzips.reduce((sum, answerzip) => sum + answerzip.totalVote, 0);


    return (
        <Div>
        <h1>{usernamezips}.ZiP</h1> 
        <h3>사람들이 남겨둔 키워드와 이유를 확인해보세요!</h3>
        <Title>{questionzip}</Title>
        <h3>{commentzip}</h3>
        {answerzips.map((answerzip) => (
            <div key={answerzip.id}>
                <VoteBox onClick={() => handleVoteBoxClick(answerzip.answer)}>
                <div>
                    <span>
                    {answerzip.answer} {((answerzip.totalVote / totalVotes) * 100).toFixed(1)}%
                    </span>
                </div>
                </VoteBox>
            </div>
        ))}
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
            <h1>{keyword}을 선택한 사람들의 이유</h1>
            {/* {reasonzips.map((reasonzip) => (
                <ReasonBox key={reasonzip.id}>
                    <h3>{reasonzip.reason}</h3>
                    <h6>작성자 nickname: {reasonzip.nickname}</h6>
                </ReasonBox>
            ))} */}
            <ModalCheck isOpen={isModalOpen} onClick={handleCloseModal}>확인</ModalCheck>
        </Modal>
            <EditButton onClick={handleEditVote}>투표 수정하기</EditButton>
            <EndButton onClick={handleEndVote}>투표 종료하기</EndButton>
            <CopyToClipboard text={voteLink}>
                <LinkButton onClick={handleCopyLink}>링크 복사하기</LinkButton>
            </CopyToClipboard>
            {showMessage && <LinkMessage>링크가 복사되었습니다</LinkMessage>}
        </Div>
    );
};
//questionID가 같으면 이유는 answerArr비교해서 해당 모듈 창 띄우기 + 해당 사람의 별명
export default PickAnswerPage;