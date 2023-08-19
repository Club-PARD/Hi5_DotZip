import React from 'react';
import { styled } from 'styled-components';
import X from '../../../img/CancelX.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CircleNum from "../../../img/CircleNum.png";
import Profile1 from "../../../img/Profile1.png";
import Profile2 from "../../../img/Profile2.png";
import Profile3 from "../../../img/Profile3.png";
import Profile4 from "../../../img/Profile4.png";


const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header1 = styled.p`
  margin: 0;
  margin-top: 8px;
  margin-bottom: 49px;
  width: 183px;
  font-family: PretendardBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  color: var(--gray-90, #EC582F);
  text-align: center;
`;
const Container = styled.div`
  display: flex;
`;

const CancelX = styled.img`
  width: 100%;
  height: 100%;
`;

const CancelButton = styled.button`
  width: 24px;
  height: 24px;
  margin-top: 16px;
  margin-left: auto;
  margin-right: 12px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  font-size: 12px;
  font-family: PretendardSemi;
`;

const SliderContainer = styled.div`
  width: 263px;
  height: 254px;
  border-radius: 22px;
  background: white;
  align-items: center;
`;

const CircleImg = styled.img`
    width: 50px;
    height: 50px;
`;

const WhiteDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 22px;
`;

const ProfileImg = styled.img`
    width: 114px;
    height: 219px;
    object-fit: contain;
`;

const TextDiv = styled.div`
    width: 279px;
    height: 60px;
    border-radius: 6px;
    margin-top: 48px;
    background: var(--orange-back, #FFF8F3);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Text = styled.p`
    color: var(--gray-90, #353535);
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
    font-family: Pretendard;
    text-align: center;
`;


const ProfileExModal = ({handleCloseProfileModal }) => {
  const closeModal = () => {
    handleCloseProfileModal(); // handleCloseModal 함수 호출
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Div>
        <CancelButton onClick={closeModal}><CancelX src={X}/></CancelButton>
        <Header1>나를 표현하는 프로필을 만드는 방법</Header1>
        <SliderContainer>
            <Slider {...settings}>
            <div>
            <WhiteDiv>
                <ProfileImg src = {Profile1} />
            </WhiteDiv>
                <TextDiv><Text>질문 폴더를 만들어요</Text></TextDiv>
            </div>
            <div>
            <WhiteDiv>
                <ProfileImg src = {Profile2} />
            </WhiteDiv>
                <TextDiv><Text>지인들에게 공유하고 투표를 받아요.</Text></TextDiv>
            </div>
            <div>
            <WhiteDiv>
                <ProfileImg src = {Profile3} />
            </WhiteDiv>
                <TextDiv><Text style={{ width: '206px' }}>내가 만든 질문 폴더의 응답들을 실시간으로 득표순으로 모아봐요.</Text></TextDiv>
            </div>
            <div>
            <WhiteDiv>
                <ProfileImg src = {Profile4} />
            </WhiteDiv>
                <TextDiv><Text>나를 표현하는 나만의 프로필 완성!</Text></TextDiv>
            </div>
            </Slider>
        </SliderContainer>
    </Div>
  );
};

export default ProfileExModal;