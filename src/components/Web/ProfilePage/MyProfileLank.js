import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs, where} from "firebase/firestore";
import { dbService } from "../../../fbase.js";
import MyProfileNoQ from '../ProfilePage/MyProfileNoQ';
import Loading from '../ProfilePage/Loding';
import MyProfileFolderImage from '../../../img/MyProfileFolder.png';

//랭킹 top3 키워드
const Wrapper = styled.div`
  position: relative;
  width: 359px;
  height: 329px;
  margin-top: 32px;
  margin-left: 8px;
`;

const MyProfileFolder = styled.img`
  width: 100%;
  height: 100%;
`;
const ProfileWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const VoteKewordBox = styled.div`
  display: flex;
  align-items: center;
  width: 295px;
  height: 80px;
  border-radius: 8px;
  border: 1px solid var(--gray-10, #F8F8F8);
  background: var(--background-orange, #FFF8F3);
  margin-left: 32px;
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 295px;
`;
const QText = styled.p`
  color: var(--gray-60, #808080);
  font-size: 12px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  margin: 0;
  margin-top: 16px;
  margin-bottom: 8px;
  text-align: center;
`;
const AText = styled.p`
  color: var(--primary-orange, #EC582F);
  margin: 0;
  font-size: 24px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  text-align: center;
`;


const MyProfileLank = () => {
    const road = collection(dbService, 'zip_Answer');
    const [top3Answer, setTop3Answer] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDocuments = async () => {
          const q = query(road, orderBy('totalVote', 'desc'), limit(3));
          try {
            const querySnapshot = await getDocs(q);
            const topThreeDocuments = [];
    
            for (const doc of querySnapshot.docs) {
              const data = doc.data();
              const document = {
                answer: data.answer,
                ID: data.answerId,
                questionId: data.questionId,
              };
    
              // 질문 가져오기
              console.log(document);
              const questionSnapshot = await getDocs(
                query(collection(dbService, "zip_Question"), where('questionId', '==', document.questionId))
              );
                const questionData = questionSnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                }));
                const question = questionData[0].question;
                console.log("확인", question);
                document.question = question;
    
              topThreeDocuments.push(document);
            }
            setTop3Answer(topThreeDocuments);
            setLoading(false);
            console.log("확인", topThreeDocuments);
            // 여기서 상태(state)로 할당하거나 렌더링할 수 있습니다.
          } catch (error) {
            console.error('Error getting documents:', error);
            setLoading(false);
          }
        };
    
        fetchDocuments();
      }, []);
    return (
      <>
  {loading ? (
    <Loading /> // 로딩 중인 경우에 표시할 로딩 스피너
  ) : (
    // 데이터 로딩이 완료된 경우에 렌더링
    <>
      {top3Answer.length > 0 ? (
        <>
        <Wrapper>
          <MyProfileFolder src={MyProfileFolderImage} alt="Profile Image" />
            <ProfileWrapper>
              {top3Answer.map(({ answer, ID, question }, index) => (
                <VoteKewordBox key={ID} style={{ marginTop: index === 0 ? '41px' : '11px' }}>
                  <TextContainer>
                    <QText>{question}</QText>
                    <AText>{answer}</AText>
                  </TextContainer>
                </VoteKewordBox>
              ))}
            </ProfileWrapper>
        </Wrapper>
        </>
      ) : (
        <MyProfileNoQ />
      )}
    </>
  )}
</>

    );
}
export default MyProfileLank;