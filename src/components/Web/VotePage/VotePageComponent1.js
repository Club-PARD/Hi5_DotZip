import React from 'react';
import styled from 'styled-components';
const Div = styled.div`
text-align: left;
margin-right: 100px;
`;

const Folder1Text = styled.header`
  font-size: 24px;
  font-weight: 700;
  height: 24px;
  font-family: PretendardBold;
  padding-top: 32px;
  padding-bottom: 8px;
  line-height: 28px;
`;
const Folder2Text = styled.header`
  color: #ABABAB;
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  padding-bottom: 32px;
  margin-top: 8px;
  font-family: PretendardSemi;

`;
const VotePageComponent1 = () => {
    return (
        <Div>
            <Folder1Text>내가 만든 질문 폴더들</Folder1Text>
            <Folder2Text>내가 생성한 폴더의 답변을 확인해보세요.</Folder2Text>
        </Div>
    );
}
export default VotePageComponent1;