import line from '../../../img/Line4.png';
import React from 'react';
import styled from 'styled-components';

const Line = styled.img`
  width: 327px;
  height: 2px;
  margin-bottom: 32px;
  margin-left: 24px;
`;
const Text1 = styled.header`
  font-family: 'Pretendard';
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: #212121;
  margin-left: 24px;
  margin-bottom: 8px;
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
const SurveyShareComponent2 = () => {
    return (
        <>
            <Line src={line}/>
            <Text1>투표 현황</Text1>
            <Text2>각 답변을 눌러 이유를 함께 확인해보세요!</Text2>
        </>
    );
}
export default SurveyShareComponent2;