import React from 'react';
import styled from 'styled-components';

const Folder1Text = styled.div`
  font-size: 24px;
  font-weight: 700;
  height: 24px;
  font-family: Pretendard;
  padding-top: 32px;
  padding-bottom: 8px;
  padding-left: 14px;
  line-height: 28px;
`;
const Folder2Text = styled.div`
  color: #ABABAB;
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  padding-bottom: 32px;
  padding-left: 14px;
`;
const VotePageComponent1 = () => {
    return (
        <>
            <Folder1Text>내가 만든 질문 폴더들</Folder1Text>
            <Folder2Text>내가 생성한 폴더의 답변을 확인해보세요.</Folder2Text>
        </>
    );
}
export default VotePageComponent1;