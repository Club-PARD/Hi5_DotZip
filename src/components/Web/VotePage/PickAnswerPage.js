import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, onSnapshot } from "firebase/firestore";
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
    const [targetQid, setTargetQidZip] = useState();
    const [commentzip, setCommentZip] = useState();
    const [answerzips, setAnswerZip] = useState([]);
    const [reasonzips, setReasonZip] = useState([]);
    const TargetUserId = 2861906505; // userid 받아오기
    const QuestionId = '9q3B1MVPokmOv92z54Q7'; //questionid 받아오기

    useEffect(() => {
        fetchDataKaKao();
    });

    const fetchDataKaKao = async () => {
        const kakaoId = query(collection(dbService, "kakaoId"));
        const unsubscribe = onSnapshot(kakaoId, (snapshot) => {
        const idArr = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        const targetUser = idArr.find((user) => user.userId === TargetUserId);
        setUserIdZip(targetUser.userId);
        setUserNameZip(targetUser.userName);
        fetchDataQuestion(targetUser); // fetchDataQ 함수 호출
        });
        return () => {
            unsubscribe();
        };
    };

    const fetchDataQuestion = async (targetUser) => {
        const zipCollection = collection(dbService, "kakaoId", targetUser.id, "zip");
        getDocs(zipCollection)
        .then((zipSnapshot) => {
            const zipArr = zipSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
        }));
        const targetQ = zipArr.find((user) => user.id === QuestionId);
        setTargetQidZip(targetQ.id);
        setQuestionZip(targetQ.question);
        setCommentZip(targetQ.comment);
        fetchDataAnswer(targetUser, targetQ); // fetchDataAnswer 함수 호출
        });
        return () => {
            zipCollection(); // 감시 중지
        };
    };

    
    const fetchDataAnswer = async (targetUser, targetQ) => {
        const answerZipCollection = collection(dbService,"kakaoId", targetUser.id,"zip", targetQ.id,"zip_answer");
        getDocs(answerZipCollection)
        .then((answerZipSnapshot) => {
            const answerZipArr = answerZipSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
        }));
        setAnswerZip(answerZipArr);
        });
        return () => {
            answerZipCollection(); // 감시 중지
        };
    };
    

    const fetchReasons = (useridzips, targetQid, answerID) => {
        if (!useridzips || !targetQid || !answerID) {
        return;
        }
        console.log(useridzips.toString());
        console.log(targetQid.toString());
        console.log(answerID.toString());
        const reasonZipCollection = collection(dbService, "kakaoId", useridzips.toString(), "zip", targetQid.toString(),"zip_answer", answerID.toString(),"zip_reason");
        const unsubscribe = onSnapshot(reasonZipCollection, (querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data().reason);
            const name = querySnapshot.docs.map((doc) => doc.data().nickname);
            console.log(data);
            const combinedData = data.map((reason, index) => ({
                reason,
                nickname: name[index],
            }));
            setReasonZip(combinedData);
            // console.log("KakaoId documents:", data);
            // console.log("Vote:", voteData);
        });
        return () => {
            unsubscribe(); // 감시 중지
        };

    };

    //modal창띄우고 내리는 함수 관련
    const [keyword, setKeyword] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleVoteBoxClick = (answer, answerID) => {
        setKeyword(answer);
        setIsModalOpen(true);
        fetchReasons(useridzips, targetQid, answerID); //zip_reason컬렉션에서 해당 정보와 일치하는 이유 불러오기
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
                <VoteBox onClick={() => handleVoteBoxClick(answerzip.answer, answerzip.id)}>
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
            {reasonzips.map(({ reason, nickname }) => (
                <ReasonBox key={reason}>
                    <h3>{reason}</h3>
                    <h6>작성자 nickname: {nickname}</h6>
                </ReasonBox>
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