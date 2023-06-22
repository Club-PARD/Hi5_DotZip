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
//     background: ${props => (props.selected ? 'pink' : 'skyblue')};
//     color: ${props => (props.selected ? '#000000' : '#ffffff')};
// `;
// const NextButton = styled.button`
//     width: 200px;
//     height: 100px;
//     padding: 5px;
//     background: red;
// `;

// function PickAnswerPage() {
//     const [zips1, setZips1] = useState([]);
//     useEffect(()=>{
//         const fetchData = async () => {
//         //데이터베이스에서 뭔가를 하게 되면 알 수 있도록 listener
//         const q = query(
//             collection(dbService, "zip"),
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
//     const [selectedVoteBoxes, setSelectedVoteBoxes] = useState([]);

//     const navigate = useNavigate();

//     const HandleButtonClick = (id) => {
//         setZips1((prevZip1) =>
//         prevZip1.map((zip) => {
//             if (zip.id === id) {
//                 return {
//                 ...zip,
//                 selected: !zip.selected,
//                 };
//             } else {
//                 return zip;
//             }
//             })
//         );
//     };

//     const handleNextButtonClick = () => {
//         const selectedBoxes = zips1.filter((p) => p.selected);
//         setSelectedVoteBoxes(selectedBoxes);

//         // 선택된 VoteBox의 개수를 확인하여 4개에서 6개 사이인 경우에만 다음 페이지로 이동합니다.
//         if (selectedBoxes.length >= 4 && selectedBoxes.length <= 6) {
//             navigate('/CompleteVote', { state: { selectedVoteBoxes: selectedBoxes } });
//         }
//     };

//     const selectedCount = zips1.filter((p) => p.selected).length;
//     const isNextButtonDisabled = selectedCount < 4 || selectedCount > 6;

//     return (
//         <Div>
//             <h1>가장 마음에 드는 답변을 골라보세요!</h1> 
//             <h3>최소 4~6개까지 가능해요^^</h3>
//             {zips1.map(zip1 => (
//             <VoteBox key={zip1.id} selected={zip1.selected} onClick={() => HandleButtonClick(zip1.id)} disabled={!zip1.selected && selectedCount >= 6}>
//                 <text selected={zip1.selected}>{zip1.answer}</text>
//             </VoteBox>
//             ))}
//             <NextButton onClick={handleNextButtonClick} disabled={isNextButtonDisabled}>다골랐어요</NextButton>
//         </Div>
//     );
// };

// export default PickAnswerPage;