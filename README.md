<h1 align="left">webRTC와 socketIO를 활용한<br/>비대면 홈트레이닝 플랫폼</h1>
<br>
<p align='center'>
<img width='70%' src='https://user-images.githubusercontent.com/89131236/161413678-eb585245-84a0-4507-ae2a-ed56e5257322.png'>
</p>
<p align='center'>
  <img src='https://img.shields.io/badge/React-v17.0.2-blue?logo=React'/>
  <img src='https://img.shields.io/badge/ReactRouter-v5.2.1-pink?logo=React Router'/>
  <img src='https://img.shields.io/badge/StyledComponents-v^5.3.3-violet?logo=styled-components'/>
  <img src='https://img.shields.io/badge/Redux-v4.1.2-764ABC?logo=Redux'/>
  <img src='https://img.shields.io/badge/Axios-v0.26.0-pink?'/>
  <br>
  <img src='https://img.shields.io/badge/ReactPlayer-v2.9.0-red?'/>
  <img src='https://img.shields.io/badge/WebRTC-333333?logo=WebRTC'/>
  <img src='https://img.shields.io/badge/socket.io-v4.4.1-white?logo=Socket.io'/>
  <img src='https://img.shields.io/badge/CloudFront-red?'/>

  <img src="https://img.shields.io/badge/Route53-E68B49">
  <img src="https://img.shields.io/badge/AWS S3-569A31">
</p>

<br>

## 프로젝트 기간
>2월25일 부터 4월8일 까지(6주)

<br>

##  홈트게더 서비스 소개
### :runner:유튜브 영상과 함께 하는 홈트레이닝에 참여해보세요.
> - 화상캠을 통해 비대면에서도, 함께 운동하는 기분을 느껴보세요.
> - 다 같이 하나의 유튜브 운동 영상으로 운동해봐요.
### ✔️ 간편하게 나의 수준에 맞는 운동을 찾아보세요.
> - 난이도, 운동 종류에 따라 나에게 맞는 방을 찾거나 개설할 수 있어요.
> - 내가 마지막으로 했던 운동 영상, 현재 TOP3 영상을 추천해줘요. 
### 🏆 친구와 함께 운동해보세요.
> - 비밀방 기능을 통해, 친구끼리 운동할 수 있어요.
> - 링크복사 버튼을 통해 간편하게 친구를 초대해보세요.
### :date: 운동을 완료하고, 나만의 기록을 남겨보세요.
> - 달력스탬프, 랭킹, 통계시스템을 통해, 동기부여를 하고, 운동을 지속하게 해줘요. 

<br>

## <a href="https://github.com/degurrrrrr/work-out-at-home-FE/wiki">기술 및 고민 정리 - WIKI 바로가기</a>
## 주요 기능

<details>
<summary>1. 로그인</summary>
<div markdown="1">
<br>
  
+ 사용자들의 접근성을 높이기 위해 간편한 카카오 소셜 로그인을 구현했습니다.
<img width='600px' src='https://user-images.githubusercontent.com/89131236/161420316-475aa330-b002-4e44-8770-4279c347f78f.png'>
</div>
</details>
<details>
<summary>2. 필터링 및 방만들기</summary>
<div markdown="1">
<br>
  
+ 난이도, 운동 종류에 따라 방을 개설하고, 필터링 기능을 통해 찾을 수 있습니다.
+ 영상 추천 기능을 도입해 유저가 좀 더 간편하게 방을 만들 수 있게 했습니다.

![필터링및방만들기배속2](https://user-images.githubusercontent.com/89131236/161430255-88cdeac0-35f0-4d8f-b244-9255b7e2a779.gif)

</div>
</details>
<details>
<summary>3. 비밀방 및 링크공유</summary>
<div markdown="1">
<br>
   
+ 비밀방 및 링크공유 기능을 도입해, 친구와 함께 더 잘 이용할 수 있는 환경을 제공했습니다.

![비밀방및링크공유배속](https://user-images.githubusercontent.com/89131236/161424828-456a41d4-d473-4bde-a438-a2d79c337d03.gif)

</div>
</details>
<details>
<summary>4. 화상채팅</summary>
<div markdown="1">
<br>
  
   + 사용자들간의 화상채팅을 이용할 때, 카메라 끄기, 음소기 하기, 격려하기(이모티콘) 등의 기능을 통해,
<br> 자신이 원하는 대로 사용할 수 있습니다.

![기능소개_화상채팅](https://user-images.githubusercontent.com/98517680/161428260-e7cc7154-e265-4839-8e62-dfa6217d776a.gif)
  
</div>
</details>
<details>
<summary>5. 유튜브영상 및 프로그래스바</summary>
<div markdown="1">
<br>
  
   + 사용자가 처음 방을 만들 때 지정한 영상을 보면서 다같이 운동을 할 수 있습니다.
+ 현재 영상의 진행 상황에 따라 영상 위쪽에 위치한 프로그래스바를 통해 현재 진행 상황을 시각적으로 확인할 수 있습니다.
+ 또한 시간이 맞추어 사용자들에게 동기부여가 될 수 있는 여러가지 멘트들이 보일 수 있도록 하였습니다.
+ 운동이 끝나게 되면, 운동을 완료했다는 모달이 뜨면서 운동을 마무리 할 수 있습니다.

![기능소개_영상 프로그래스바](https://user-images.githubusercontent.com/98517680/161428860-6144a30a-3817-4a1d-9064-7ad145671c82.gif)

</div>
</details>
<details>
<summary>6. 운동기록 및 마이페이지</summary>
<div markdown="1">
<br>
  
   + 사용자가 해당 서비스를 이용하며, 운동을 지속할 수 있는 장치를 마련했습니다.
+ 마이페이지에서 사용자의 닉네임 및 목표설정을 변경할 수 있습니다.
+ 운동을 완료하고 나면, 축하메시지와 함께 운동기록이 저장됩니다.
+ 메인페이지에서 운동랭킹, 이만큼 운동했어요, 캘린더출석, 이런운동을많이했어요 탭에서 반영됩니다.

![운동기록및마이페이지배속](https://user-images.githubusercontent.com/89131236/161427704-b49f420e-6cbe-42be-95f7-939dfcc56ce9.gif)
</div>
</details>
<details>
<summary>7. 반응형</summary>
<div markdown="1">
<br>
  
 + 홈트게더는 태블릿 가로형 및 PC에 최적화되어 있습니다.
 + 모바일로 접속 시에는 PC로 쉽게 이동하실 수 있도록, 카카오톡 공유하기 기능을 도입했습니다.

![반응형배속](https://user-images.githubusercontent.com/89131236/161423917-e63a4981-b62b-4b46-b6cf-11e26b1b23d9.gif)
<img height='304px' src='https://user-images.githubusercontent.com/89131236/161428194-bd44b026-a24b-4154-b392-fcb6b1b3193e.png'>
</div>
</details>




## 프로젝트 구조
<!-- ![프로젝트 구조](https://user-images.githubusercontent.com/59644518/131306840-2ccd7bf7-62b8-43dd-9beb-cf4dddd13cb8.png) -->
## Front-End 기술스택
<!-- ![Stack](https://user-images.githubusercontent.com/59644518/131254702-f92170c3-6c53-4b5f-ae77-ee3eb58e71c7.png) -->

## 팀원소개
### 프론트엔드
+ 박상원: https://github.com/wkqkel
+ 고주열: https://github.com/Noah8922
+ 이규리: https://github.com/degurrrrrr
### 백엔드
+ 김정호: https://github.com/fancyers
+ 강경묵: https://github.com/G-moog
+ 김승호: https://github.com/naho199345

