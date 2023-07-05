import React, { useState } from 'react';
import styled from 'styled-components';


const Profile1Text = styled.p`
  font-size: 24px;
  font-weight: 700;
  height: 24px;
  font-family: Pretendard;
  padding: 0;
  margin: 0;
  margin-top: 32px;
  margin-left: 24px;
  line-height: 24px;
`;
const Text = styled.p`
  font-size: 24px;
  font-weight: 700;
  height: 24px;
  font-family: Pretendard;
  padding: 0;
  margin: 0;
  margin-top: 4px;
  margin-left: 24px;
  line-height: 24px;
`;
const Profile2Text = styled.div`
  color: #ABABAB;
  font-size: 14px;
  font-weight: 600;
  height: 18px;
  margin-top: 8px;
  margin-left: 24px;
`;
const Red = styled.span`
  font-size: 24px;
  color: #EC582F;
  border: none;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  padding-bottom: 4px;
`;


const MyProfileShareComponent = () => {
    const [userNickname] = useState(localStorage.getItem("userName"));
    return (
        <>
            <Profile>
                <Profile1Text><Red>{userNickname}</Red> 님의</Profile1Text>
            </Profile>
            <Text>프로필.ZiP</Text>
            <Profile2Text>가장 많이 선택받은 키워드를 확인해보세요!</Profile2Text>
        </>
    );
}
export default MyProfileShareComponent;