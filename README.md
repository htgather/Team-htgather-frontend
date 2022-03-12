# react-setting

1. 사용방법
   yarn install
   yarn start

2. 폴더구조
   src > components / elements / pages / redux / shared
   redux > modules 폴더와 configureStore.js
   shared > App.js / App.css / Request.js(axios통신)

   설명:
   components 폴더 생성 (컴포넌트 단위 ex: 카드,헤더 등)
   elements 폴더 생성 (최소단위 컴포넌트 ex : 버튼, input,text,Grid 등)
   pages 폴더생성 (페이지 단위 ex: main, detail 등)
   redux 풀더 생성 (redux )
   shared 폴더 생성 (페이지에서 전범위에 적용될 것들 ex: App, api,Cookie 등등 )

3. 사용 패키지

   yarn add styled-components react-router-dom@5.2.1 history@4.10.1 connected-react-router@6.8.0 redux react-redux redux-actions redux-thunk immer redux-logger axios

   보통 필수적으로 설치하는 라이브러리
   css관련
   yarn add styled-components // js에서 css를 작성할 수 있음.
   페이지이동관련
   yarn add react-router-dom@5.2.1 // 주소창의 url에 따라 페이지를 보여줌
   yarn add history@4.10.1 // 새로고침없이 페이지이동 가능
   yarn add connected-react-router@6.8.0 // 히스토리를 전역에서 사용가능하게 해줌
   상태관리관련
   yarn add redux react-redux //상태관리 라이브러리인 리덕스 설치
   yarn add redux-actions // 리덕스 액션 관리를 용이하게 해줌.
   yarn add redux-thunk // 비동기 작업을 처리할 때 많이 사용되는 thunk라이브러리 설치
   yarn add immer // 불변성관리를 위한 immer
   yarn add redux-logger // 리덕스 실행 전과 후를 콘솔 창에서 볼 수 있게해줌.
   서버통신
   yarn add axios // 서버와의 통신을 위한 axios설치
   npm add buffer // 토큰값 해독을 위한 buffer 설치

   추가 사용 라이브러리
   아이콘 관련
   yarn add react-icons // 참고 : https://react-icons.github.io/react-icons/icons?name=fc
   yarn add react-player // 유튜브 api플레이어를 리액트에서 좀 더 쉽게 쓰게 해줌. 참고: https://www.npmjs.com/package/react-player/v/2.9.0
   yarn add moment // 시간데티터 관리를 쉽게
   yarn add jwt-decode // jwt 디코딩
