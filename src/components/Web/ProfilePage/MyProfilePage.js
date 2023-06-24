import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoShareButton from '../ProfilePage/ShareKakao';


const Div = styled.div`

`;
//랭킹 top3 키워드
const VoteKewordBox = styled.div`
    width: 200px;
    height: 100px;
    margin: 5px;
    border: 1px solid black;
    background: skyblue;
    color: #ffffff;
`;
//버튼들
const ShareButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const SaveButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const CreateZipButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;
const BackHomeButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;

function MyProfilePage() {
    //홈으로 돌아가기
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/Home');
    };

    return(
        <Div>
            <h1>'로그인한 사람 이름' 님의 .ZiP</h1>
            {/* 사용자 id받아와서 넣어 줄 부분 */}
            <h2>나의 ZiP 랭킹</h2>
            <VoteKewordBox>1위</VoteKewordBox>
            <VoteKewordBox>2위</VoteKewordBox>
            <VoteKewordBox>3위</VoteKewordBox>
            <KakaoShareButton/> 
            <SaveButton>이미지 저장하기</SaveButton>
            <CreateZipButton>다른 .ZiP 만들기</CreateZipButton>
            <BackHomeButton onClick={handleBackHome}>홈으로 돌아가기</BackHomeButton>
        </Div>
    );
};

export default MyProfilePage;