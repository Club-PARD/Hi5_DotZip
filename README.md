# Pard-Longkerton-Project-DotZiP

<p align="center">
  <br>
  <img src="./readme/logobanner.png">
  <br>
</p>

## 💻 프로젝트 소개
<p align="justify">
나를 발견할 수 있는 질문들을 통해 지인들이 바라보는 모습, <br/>나도 몰랐던 나의 새로운 모습을 키워드로 발견하도록 투표 기반의 서비스를 제공합니다.
</p>

## 🖥️ 배포 주소
[.ZiP 방문하기📂](https://dotzip.swygbro.com)

## 🕰️ 개발 기간
* 23.06.19일 ~ 23.07.08일 (3주 프로젝트)

### 🧑‍🤝‍🧑 맴버구성
###### 이미지 클릭 시 각 팀원의 소개 페이지로 이동
|  기획자 배예진    |  디자이너 조세희     |   웹개발자 김현승   |   웹개발자 이한나  |  웹개발자 김지수  |
|   :--------:   |    :--------:    |    :--------:  |    :--------:   |   :--------:  |
|   <a href="https://www.notion.so/c214bca8c6fe4322ab5b6e77e6dd9365?pvs=4"><img src="./readme/YJ.PNG.png" width="300" height="150"></a>  |  <a href="https://www.notion.so/f4d63cf63e7c4360917a26a2e129667f?pvs=4"><img src="./readme/Say.png" width="300" height="150"></a>    | <a href="https://www.notion.so/37942b37e5414b06a578e99a44052ea4?pvs=4"><img src="./readme/H.png" width="300" height="150"></a>         | <a href="https://www.notion.so/65eed5b6553a4d03a55e19cd82ffb8e1?pvs=4"><img src="./readme/HN.png" width="300" height="150"></a>        | <a href="https://www.notion.so/6e29f9775a3f4394a2e68e280275c69a?pvs=4"><img src="./readme/JS.png" width="300" height="150"></a>        |

<br>

## ⚙️ 기술 스택

|  Notion    |  Figma     |  React   |  Firebase |
| :--------: | :--------: | :------: | :----:    |
|   ![nt]    |   ![fm]    | ![react] | ![fb]     |

<br>

## 📌 주요 기능

###  🔗 [로그인](https://github.com/Club-PARD/Hi5_DotZip/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(%EB%A1%9C%EA%B7%B8%EC%9D%B8))
- 카카오톡 로그인
- 최초 로그인한 유저일 경우 firestore에 정보 저장
### 🔗 [홈 페이지 & 생성한 질문 폴더 페이지](https://github.com/Club-PARD/Hi5_DotZip/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(%ED%99%88-%ED%8E%98%EC%9D%B4%EC%A7%80-&-%EC%A7%84%ED%96%89%EC%A4%91%EC%9D%B8-%EC%A7%88%EB%AC%B8-%ED%8E%98%EC%9D%B4%EC%A7%80))
- 최근 생성한 질문 2개 
- 질문 생성 시간 순으로 질문 폴더 나열
- 해당 질문 폴더 링크 복사하기
- 종료된 질문 폴더는 아래로 이동
### 🔗 [질문만들기](https://github.com/Club-PARD/Hi5_DotZip/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(%EC%A7%88%EB%AC%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0))
- 주어진 질문으로 질문 폴더 만들기
- 유저가 새로운 질문 생성하여 질문 폴더 만들기
- 본인 질문에 답변 추가하기 (투표 항목 추가)
### 🔗 [투표하기](https://github.com/Club-PARD/Hi5_DotZip/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(%ED%88%AC%ED%91%9C%ED%95%98%EA%B8%B0))
- 투표 항목 새롭게 추가하기 (닉네임, 새로운 답변, 이유 추가)
- 기존 투표 항목에 투표하기 (닉네임, 이유 추가)
- 새로운 질문 만들기
### 🔗 [투표 결과 확인 페이지](https://github.com/Club-PARD/Hi5_DotZip/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(%ED%88%AC%ED%91%9C-%EA%B2%B0%EA%B3%BC-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0))
- 총 투표 참여자와 각 항목 득표수와 이유 공개 (%로 항목들 비교)
- 질문자 본인이 추가한 투표 항목 표시 (체크)
- 최대 득표 항목 표시
- 카카오톡 공유
- 링크 복사
- 투표 종료하기
### 🔗 [마이 프로필 페이지](https://github.com/Club-PARD/Hi5_DotZip/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C-(%EB%A7%88%EC%9D%B4-%ED%94%84%EB%A1%9C%ED%95%84--%ED%8E%98%EC%9D%B4%EC%A7%80))
- 모든 투표 항목 중 top3를 랭킹으로 공개
- 닉네임 수정하기
- 카카오톡 마이프로필 랭킹3 공유하기
- 이미지 저장하기
### 🔗 [환경 설정 페이지]
- 문의하기
- 팀소개
- 약관
- 로그아웃

<br>

 

<!-- Stack Icon Refernces -->

[nt]: /readme/notion.svg
[fm]: /readme/figma.svg
[react]: /readme/react.svg
[fb]: /readme/firebase.svg

git PR