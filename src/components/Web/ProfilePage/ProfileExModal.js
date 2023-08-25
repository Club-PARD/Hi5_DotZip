import React from 'react';
import { styled } from 'styled-components';
import X from '../../../img/CancelX.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Profile1 from "../../../img/Profile1.png";
import Profile2 from "../../../img/Profile2.png";
import Profile3 from "../../../img/Profile3.png";
import Profile4 from "../../../img/Profile4.png";
import Rectangle1 from "../../../img/Rectangle1.png";
import Rectangle2 from "../../../img/Rectangle2.png";
import Rectangle3 from "../../../img/Rectangle3.png";
import Rectangle4 from "../../../img/Rectangle4.png";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Header1 = styled.p`
  margin: 0;
  margin-bottom: 24px;
  width: 183px;
  font-family: PretendardBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  color: var(--gray-90, #EC582F);
  text-align: center;
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
`;

const SliderContainer = styled.div`
  width: 280px;
  height: 287px;
  border-radius: 22px;
  background: white;
  align-items: center;
`;

const WhiteDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8px;
  flex-direction: column;
`;

const ProfileDiv = styled.div`
  align-items: center;
  margin-left: 77px;
`;

const RectangleDiv = styled.div`
  align-items: left;
`;

const ProfileImg = styled.img`
  width: 136px;
  height: 266px;
`;

const RectangleImg = styled.img`
  margin-top: 5px;
  margin-left: 5px;
`;

const TextDiv = styled.div`
  width: 285px;
  height: 60px;
  border-radius: 6px;
  margin-top: 24px;
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
`;

const Circle = styled.div`
  width: 34px;
  height: 34px;
  border: 1px solid #EC582F;
  border-radius: 50%;
  box-shadow: 0px 2px 10px #FFE2CE;
  font-family: PretendardBold;
  font-size: 16px;
  color: var(--orange-primary, #EC582F);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const RedSpan = styled.span`
  color: #EC582F;
  font-family: PretendardBold;

`;

const ProfileExModal = ({handleCloseProfileModal }) => {
  const closeModal = () => {
    handleCloseProfileModal();
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
              <ProfileDiv>
                  <ProfileImg src={Profile1} />
              </ProfileDiv>
              <RectangleDiv>
                  <RectangleImg src={Rectangle1} />
              </RectangleDiv>
            </WhiteDiv>
            <TextDiv><Circle>1</Circle><Text>원하는 질문을 골라<br /> <RedSpan>질문 폴더</RedSpan>를 만들어요.</Text></TextDiv>
            </div>
            <div>
            <WhiteDiv>
              <ProfileDiv>
                  <ProfileImg src={Profile2} />
              </ProfileDiv>
              <RectangleDiv>
                  <RectangleImg src={Rectangle2} />
              </RectangleDiv>
            </WhiteDiv>
                <TextDiv><Circle>2</Circle><Text><RedSpan>지인들에게 공유</RedSpan>하고 투표를 받아요.</Text></TextDiv>
            </div>
            <div>
            <WhiteDiv>
              <ProfileDiv>
                  <ProfileImg src={Profile3} />
              </ProfileDiv>
              <RectangleDiv>
                  <RectangleImg src={Rectangle3} />
              </RectangleDiv>
            </WhiteDiv>
                <TextDiv><Circle>3</Circle><Text style={{ width: '206px' }}>내가 만든 질문 폴더의 응답들을 <RedSpan>실시간 득표순</RedSpan>으로 모아봐요.</Text></TextDiv>
            </div>
            <div>
            <WhiteDiv>
              <ProfileDiv>
                  <ProfileImg src={Profile4} />
              </ProfileDiv>
              <RectangleDiv>
                  <RectangleImg src={Rectangle4} style = {{width: "270px"}}/>
              </RectangleDiv>
            </WhiteDiv>
                <TextDiv><Circle>4</Circle><Text>나를 표현하는 <RedSpan>나만의 프로필</RedSpan> 완성!</Text></TextDiv>
            </div>
            </Slider>
        </SliderContainer>
    </Div>
  );
};

export default ProfileExModal;