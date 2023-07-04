import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserNameImoticon from '../../../img/UserNameImoticon.png';
import { updateDoc , doc} from "firebase/firestore";
import { dbService } from "../../../fbase.js";

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
  border-bottom: 2px solid #EC582F;
`;
const Img = styled.img`
    margin-top: 32px;
    margin-left: 2px;
    width: 22px;
    height: 22px;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 4px;
`;

const MyProfileComponent = () => {
  const userId = localStorage.getItem("kakaoId");
    const [userNickname, setUserName] = useState(localStorage.getItem("userName"));
    useEffect(() => {
      localStorage.setItem('userName', userNickname);
      updateFirestoreUserName(userNickname);
      console.log(localStorage.getItem("userName"));
    }, [userNickname]);
    const updateFirestoreUserName = async (newUserName) => {
      try {
        const docRef = doc(dbService, 'kakaoId', userId);
        await updateDoc(docRef, {
          userName: newUserName
        });
        console.log('Firestore userName updated:', newUserName);
      } catch (error) {
        console.error('Error updating Firestore userName:', error);
      }
    };

    const handleButtonClick = () => {
        const newUserName = prompt('Enter your new name:');
        if (newUserName) {
          setUserName(newUserName);
        }
      };
    return (
        <>
            <Profile>
                <Profile1Text><Red>{userNickname}</Red> 님의</Profile1Text>
                <Img src = {UserNameImoticon} onClick={handleButtonClick}/>
            </Profile>
            <Text>프로필.ZiP</Text>
            <Profile2Text>가장 많이 선택받은 키워드를 확인해보세요!</Profile2Text>
        </>
    );
}
export default MyProfileComponent;