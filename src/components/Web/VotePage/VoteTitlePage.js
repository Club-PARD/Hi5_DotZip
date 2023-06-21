import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../../../fbase';

const Div = styled.div`

`;
const InuptTitle = styled.textarea`
    width: 500px;
    height: 300px;
`;
const NextButton = styled.button`
    width: 200px;
    height: 100px;
    padding: 5px;
    background: red;
`;

function VoteTitlePage() {
    const navigate = useNavigate();
    const handleNextButtonClick = () => {
        // 홈으로 이동
        navigate('/home');
    };
    return(
        <Div>
            <h1>투표 제목을 적어주세요.</h1>
            <h3>투표 제목</h3>
            <InuptTitle></InuptTitle>
            <NextButton onClick={handleNextButtonClick}></NextButton>
        </Div>
    );
};

export default VoteTitlePage;