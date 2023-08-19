import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserNameImoticon from '../../../img/UserNameImoticon.png';
import { updateDoc , doc} from "firebase/firestore";
import { dbService } from "../../../fbase.js";
import NameModal from './NameModal';
import ProfileExModal from './ProfileExModal';
import Modal from 'react-modal';
import whatProfile from '../../../img/whatProfile.png'


const Profile1Text = styled.p`
  font-size: 24px;
  font-weight: 700;
  height: 24px;
  font-family: PretendardBold;
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
  font-family: PretendardBold;
  padding: 0;
  margin: 0;
  margin-top: 4px;
  margin-left: 24px;
  line-height: 24px;
`;
const Profile2Text = styled.div`
  color: #808080;
  font-size: 14px;
  font-family: Pretendard;
  font-weight: 600;
  height: 18px;
  margin-top: 9px;
  margin-left: 3px;
`;
const Red = styled.span`
  font-size: 24px;
  color: #EC582F;
  border: none;
  border-bottom: 2px solid #EC582F;
  cursor: pointer;
`;
const Img = styled.img`
    margin-top: 32px;
    margin-left: 2px;
    width: 22px;
    height: 22px;
    cursor: pointer;
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-top: '80px';
  padding-bottom: 4px;
`;
const ProfileContainer = styled.div`
  display: flex;
  width: 90px;
  margin-left: 24px;
  border-bottom: 1px solid #808080;
  cursor: pointer;
`;
const ProfileVector = styled.img`
  width: 16px;
  height: 16px;
  margin-top: 9px;
`;
const modalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '300px',
      borderRadius: '10px',
      background: 'var(--background-gra, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))',
      margin: 'auto',
      padding: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex: '2',
      borderStyle : 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: '2',
    },
};
const profileModalStyles = {
  content: {
      position: 'absolute',
      width: '343px',
      height: '523px',
      borderRadius: '10px',
      background: 'var(--gradation-back, linear-gradient(135deg, #FFEDE9 0%, #FFEAD3 51.04%, #FFF7DD 99.99%))',
      margin: 'auto',
      padding: '0',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      zIndex: '2',
      borderStyle : 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: '2',
    },
};


const MyProfileComponent = () => {
  const userId = localStorage.getItem("kakaoId");
  const [userNickname, setuserNickname] = useState(localStorage.getItem("userName"));

    const updateFirestoreUserName = async (newUserName) => {
      try {
        const docRef = doc(dbService, 'kakaoId', userId);
        await updateDoc(docRef, {
          userName: newUserName
        });
        setuserNickname(newUserName); // userNickname 값을 업데이트
      } catch (error) {
        console.error('Error updating Firestore userName:', error);
      }
    };

    useEffect(() => {
      localStorage.setItem('userName', userNickname);
      updateFirestoreUserName(userNickname);
    }, [userNickname]);
    //name update
    const [modalOpen, setModalOpen] = useState(false);
    const handleCloseModal = () => {
      setModalOpen(false);
    };
    const showModal = ()=>{
      setModalOpen(!modalOpen);
    };
    const handleNicknameUpdate = (newNickname) => {
      setuserNickname(newNickname);
    };

    //profile modal
    const [profilemModalOpen, setprofilemModalOpen] = useState(false);
    const handleCloseProfileModal = () => {
      setprofilemModalOpen(false);
    };
    const showProfileModal = ()=>{
      setprofilemModalOpen(!profilemModalOpen);
    };
    return (
        <>
            <Profile>
                <Profile1Text><Red onClick={showModal}>{userNickname}</Red> 님의</Profile1Text>
                <Img src = {UserNameImoticon} onClick={showModal} />
                <Modal isOpen={modalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
                  {modalOpen && <NameModal key="update-name"  handleCloseModal={handleCloseModal} handleNicknameUpdate={handleNicknameUpdate}/>}
                </Modal>
            </Profile>
            <Text>프로필.ZiP</Text>
            <ProfileContainer onClick={showProfileModal}>
              <ProfileVector src={whatProfile} /> <Profile2Text>프로필이란?</Profile2Text>
            </ProfileContainer>
            <Modal isOpen={profilemModalOpen} onRequestClose={handleCloseProfileModal} style={profileModalStyles}>
              {profilemModalOpen && <ProfileExModal handleCloseProfileModal={handleCloseProfileModal}/>}
            </Modal>

        </>
    );
}
export default MyProfileComponent;