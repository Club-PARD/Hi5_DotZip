// import styled from "styled-components";
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { collection, query, onSnapshot } from 'firebase/firestore';
// import { dbService } from '../../../fbase';

// const Div = styled.div`

// `;
// const VoteBox = styled.button`
//     width: 400px;
//     height: 200px;
//     margin: 5px;
//     border: 1px solid black;
//     background: skyblue;
//     color: #ffffff;
// `;
// const NextButton = styled.button`
//     width: 200px;
//     height: 100px;
//     padding: 5px;
//     background: red;
// `;
// const HomeButton = styled.button`
//     width: 200px;
//     height: 100px;
//     padding: 5px;
//     background: red;
// `;

// function CreateVotePage() {
//     const [zips1, setZips1] = useState([]);
//     useEffect(()=>{
//         const fetchData = async () => {
//         //데이터베이스에서 뭔가를 하게 되면 알 수 있도록 listener
//         const q = query(
//             collection(dbService, "zip_1"),
//         );
//         const unsubscribe = onSnapshot(q, (snapshot)=>{ 
//             const zipArr = snapshot.docs.map((doc)=>({ //Snapshot실시간으로 확인 (데이터베이스에 무슨 일이 있을 때 알림 받기)
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//             setZips1(zipArr); //새로운 snapshot을 받을 때 배열을 만들고 state에 배열 집어넣기
//         });
//         return () => {
//             unsubscribe(); // 컴포넌트가 unmount되었을 때 listener를 정리합니다.
//           };
//         }
//         fetchData();
//     },[]);

//     const navigate = useNavigate();
//     const handleNextButtonClick = () => {
//         navigate('/PickAnswer');
//     };
//     const handleHomeButtonClick = () => {
//         navigate('/home');
//     };

//     return(
//         <Div>
//             <h1>'로그인한 사람 이름'님의 이미지를 떠올렸을 때 어울리는 패션 브랜드는?</h1>
//             <h3>응답이 마감되었어요. 원하는 답변을 골라 투표를 진행해보세요!</h3>
//             {zips1.map(zip1 => (
//             <VoteBox key={zip1.id}>
//                 <text selected={zip1.selected}>{zip1.answer}</text>
//             </VoteBox>
//             ))}
//             <NextButton onClick={handleNextButtonClick}>투표생성하기</NextButton>
//             <HomeButton onClick={handleHomeButtonClick}>홈으로 돌아가기</HomeButton>
//         </Div>
//     );
// };

// export default CreateVotePage;