import styled from "styled-components";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { collection, query, orderBy, limit, getDocs, where} from "firebase/firestore";
import { dbService } from "../../../fbase.js";
import MyProfileNoQ from '../ProfilePage/MyProfileNoQ';
import Loading from '../ProfilePage/Loding';

//랭킹 top3 키워드
const VoteKewordBox = styled.div`
    white-space: pre-line;
    width: 200px;
    height: 100px;
    margin: 5px;
    border: 1px solid black;
    background: skyblue;
    color: #ffffff;
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
            top3Answer.map(({ answer, ID, question }, index) => (
              <VoteKewordBox key={ID}>{`질문 : ${question} \n ${index + 1}위 ${answer}`}</VoteKewordBox>
            ))
          ) : (
            <MyProfileNoQ />
          )}
        </>
      )}
    </>
    );
}
export default MyProfileLank;