import styled from "styled-components";
import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../../../fbase';
import { useNavigate, useParams } from 'react-router-dom';
import { UserNameContext } from '../../../UserNameContext';

const Div = styled.div`

`;
//이모지
const Emoticon = styled.div`
    width: 400px;
    height: 100px;
    padding: 5px;
    background: pink;
    margin: 10px;
`;
//질문 제목, 기본 코멘트
const Title = styled.div`
    width: 400px;
    height: 100px;
    padding: 5px;
    background: pink;
    margin: 10px;
`;
const Coment = styled.div`
    width: 400px;
    height: 70px;
    padding: 5px;
    background: yellow;
    margin: 10px;
`;
//투표박스
const VoteBox = styled.button`
    width: 200px;
    height: 100px;
    margin: 5px;
    border: 1px solid black;
    background: skyblue;
    color: #ffffff;
`;
//버튼들
const AddWord = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const ReturnVote = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;

function EditVotePage() {
    const [userContext] = useContext(UserNameContext);
    const {questionId} = useParams(); //questionid 받아오기
    const [questionzip, setQuestionZip] = useState();
    const [targetQid, setTargetQidZip] = useState();
    const [commentzip, setCommentZip] = useState();
    //답변 불러오기
    const [answerzips, setAnswerZip] = useState([]);
    useEffect(() => {
        fetchDataQuestion();
    });
    const fetchDataQuestion = async () => {
        const zipCollection = collection(dbService, "zip_Question");
        getDocs(zipCollection)
        .then((zipSnapshot) => {
            const QuestionzipArr = zipSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
        }));
        const targetQ = QuestionzipArr.find((user) => user.id === questionId);
        setTargetQidZip(targetQ.id);
        setQuestionZip(targetQ.question); //질문 questionzip에 저장
        setCommentZip(targetQ.comment); //comment commentzip에 저장
        });
        fetchDataAnswer();
        return () => {
            zipCollection(); // 감시 중지
        };
    };
    const fetchDataAnswer = async () => {
        const answerZipCollection = collection(dbService, "zip_Answer");
        getDocs(answerZipCollection)
        .then((answerZipSnapshot) => {
            const answerZipArr = answerZipSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
        }));
        const targetAnswers = answerZipArr.filter(
            (answer) => answer.questionId === questionId
          );
          setAnswerZip(targetAnswers);
        });
        return () => {
          answerZipCollection(); // 감시 중지
        };
    };

    const navigate = useNavigate();
    const handlePickVote = () => {
        navigate('/PickAnswer/');
    };
    return(
        <Div>
            <h1>나의 .ZiP 만들기</h1>
            <h3>궁금한 질문을 담은 링크를 공유해보세요.</h3>
            <h4>{userContext}님의 .ZiP</h4>
            <Emoticon>이모지 구현 칸</Emoticon>
            <Title>{questionzip}</Title>
            <Coment>{commentzip}</Coment>
            {answerzips.map((answerzip) => (
            <div key={answerzip.id}>
                <VoteBox>
                <div>
                    <span>
                    {answerzip.answer}
                    </span>
                </div>
                </VoteBox>
            </div>
        ))}
            <AddWord>항목 추가하기</AddWord> {/* 현승오빠가 구현해놓은 부분으로 => 항목 추가하는 부분 */}
            <ReturnVote onClick={handlePickVote}>투표 등록하기</ReturnVote>
        </Div>
    );
};

export default EditVotePage;