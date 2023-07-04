import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewquesButton from '../../../img/NewquesButton.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const Text1 = styled.div`
    width: 167px;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    color: var(--gray-30, #ABABAB);
    text-align: center;
    margin-top: 92px;
`;
const Text2 = styled.div`
    width: 196px;
    font-size: 14px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 600;
    line-height: 18px;
    color: var(--gray-30, #ABABAB);
    text-align: center;
    margin-top: 8px;
`;
const NewQusetion = styled.img`
  width: 152px;
  height: 40px;
  margin-top: 24px;
`;

const MyProfileNoQ = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('../../../../SurveyFirst'); // Replace with the actual path you want to navigate to
      };
    return (
        <Container>
            <Text1>프로필을 완성하려면<br></br> 질문 폴더가 필요해요🥲</Text1>
            <Text2>새로운 질문을 만들고 공유해보세요.</Text2>
            <NewQusetion src={NewquesButton} onClick={handleButtonClick}/>
        </Container>
    );
}
export default MyProfileNoQ;