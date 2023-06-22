import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { dbService } from '../../../fbase';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();
    const handlePickVote = () => {
        navigate('/PickAnswer');
      };
    return(
        <Div>
            <h1>나의 .ZiP 만들기</h1>
            <h3>궁금한 질문을 담은 링크를 공유해보세요.</h3>
            <h4>'userid받아서 이름' 님의 .ZiP</h4>
            <Emoticon>이모지 구현 칸</Emoticon>
            <Title>questionId받아서 질문 타이틀 뜨기</Title>
            <Coment>questionId받아서 기본 코멘트 뜨도록 구현</Coment>
            {answerzips.map((answerzip) => (
                <div key={answerzip.id}>
                    {answerzip.answer.map((answerItem) => (
                        <VoteBox key={answerzip.id}>
                            <span>{answerItem}</span>
                        </VoteBox>
                    ))}
                </div>
            ))}
            <AddWord>항목 추가하기</AddWord> {/* 현승오빠가 구현해놓은 부분으로 => 항목 추가하는 부분 */}
            <ReturnVote onClick={handlePickVote}>투표 등록하기</ReturnVote>
        </Div>
    );
};

export default EditVotePage;