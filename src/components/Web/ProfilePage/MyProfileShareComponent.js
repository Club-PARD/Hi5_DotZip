import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
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
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  padding-bottom: 4px;
`;

const MyProfileShareComponent = () => {
    const {hashId} = useParams(); //questionid 받아오기
    const Id = (hashId / 3);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const querySnapshot = await getDocs(
            query(collection(dbService, 'kakaoId'), where('userId', '==', Id))
          );
          console.log(querySnapshot);
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setUserName(userData[0].userName);
          } else {
            console.log("No data found for the given Id");
          }}
          catch (error) {
          console.error("Error fetching document:", error);
        }
      };
    
      fetchDocuments();
    }, [userName]); // userName을 의존성 배열에 추가
    
    useEffect(() => {
      console.log("userName:", userName);
    }, [userName]); // userName이 업데이트될 때마다 실행되는 useEffect 추가
    

    return ( 
        <>
            <Profile>
                <Profile1Text><Red>{userName}</Red> 님의</Profile1Text>
            </Profile>
            <Text>프로필.ZiP</Text>
            <Profile2Text>가장 많이 선택받은 키워드를 확인해보세요!</Profile2Text>
        </>
    );
}
export default MyProfileShareComponent;