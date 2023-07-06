import progress from '../../../img/Line3.png';
import React, {useState} from 'react';
import styled from 'styled-components';


const Progress = styled.img`
  width: 375px;
  height: 2px;
  margin-bottom: 32px;
`;
const Text1 = styled.header`
  font-family: 'Pretendard';
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #353535;
  height: 64px;
  margin-left: 24px;
  margin-bottom: 8px;
`;
const RedText = styled.span`
  color: #EC582F;
`;
const Text2 = styled.header`
  font-family: 'Pretendard';
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: #808080;
  height: 18px;
  margin-left: 24px;
  margin-bottom: 32px;
`;

const SurveyShareComponent = () => {
    const [userNickname] = useState(localStorage.getItem("userName"));
    return (
        <>
            <Progress src={progress}/>
            <Text1><RedText>{userNickname} </RedText>님의 질문 폴더</Text1>
            <Text2>링크를 공유하고 투표를 통해 답변을 받아보세요!</Text2>
        </>
    );
}
export default SurveyShareComponent;