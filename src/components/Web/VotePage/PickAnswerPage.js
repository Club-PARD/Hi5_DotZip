import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
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
    var kakaoId; //앞에서 넘겨받기
    var questionId; //앞에서 넘겨받기

    //답변 불러오기
    const [answerzips, setAnswerZip] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const q = query(collection(dbService, "zip"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const zipArr = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setAnswerZip(zipArr);
          });
          return () => {
            unsubscribe();
          };
        };
      
        fetchData();
    }, []);
    //이유불러오기
    const [reasonzips, setReasonZip] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const q = query(collection(dbService, "reason_zip"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const reasonArr = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setReasonZip(reasonArr);
          });
          return () => {
            unsubscribe();
          };
        };
      
        fetchData();
    }, []);

    //modal창띄우고 내리는 함수 관련
    const [keyword, setKeyword] = useState("");
    const [reasonIndex, setReasonIndex] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleVoteBoxClick = (index, answer) => {
        setReasonIndex(index);
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


    return (
        <Div>
        <h1>진행중인 .ZiP</h1> 
        <h3>사람들이 남겨둔 키워드와 이유를 확인해보세요!</h3>
        <Title>질문 타이틀 뜨기</Title>
            {answerzips.map((answerzip) => (
                <div key={answerzip.id}>
                    {answerzip.answer.map((answerItem, index) => {
                    const voteCount = answerzip.totalVote[index];
                    const totalVoteSum = answerzip.totalVote.reduce((sum, vote) => sum + vote, 0);
                    const percentage = (voteCount / totalVoteSum) * 100;

                    return (
                        <VoteBox key={`${answerzip.id}-${index}`} onClick={() => handleVoteBoxClick(index, answerItem)}>
                        <div>
                            <span>{answerItem} {percentage.toFixed(1)}%</span>
                        </div>
                        </VoteBox>
                    );
                    })}
                </div>
            ))}
        <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
            <h1>{keyword}을 선택한 사람들의 이유</h1>
            {reasonzips.map((reasonzip, index) => (
                reasonzip.answerArr === reasonIndex && (
                <ReasonBox key={index}>
                    <h3>{reasonzip.reason}</h3>
                    <h6>작성자 nickname: {reasonzip.nickname}</h6>
                </ReasonBox>
                )
            ))}
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