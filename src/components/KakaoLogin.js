import React from 'react';
import axios from 'axios';

const { Kakao } = window;

const loginWithKakao = () => {
  const scope = 'profile_nickname';
  Kakao.Auth.login({
    scope,
    // success는 인증 정보를 응답(response)으로 받는다.
    success: function (response) {
      //카카오 SDK에 사용자 토큰을 설정한다.
      window.Kakao.Auth.setAccessToken(response.access_token);
      console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

      var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();

      window.Kakao.API.request({
        url: '/v2/user/me',
        success: function ({ kakao_account }) {
          //어떤 정보 넘어오는지 확인
          console.log(kakao_account);
          const { profile } = kakao_account;

          console.log(profile.nickname);

          //   axios.post('/auth/sns',{
          //       nickname: profile.nickname,
          //     })
          // .then((res) => {
          //   console.log('랄라', res);
          //   // history.push("/main/feed");
          // localStorage.setItem('token',res)
          // })
          // .catch((error) => {
          //   // console.log(error);
          //   console.error(error);
          //   alert('카카오 로그인 에러?');
          // });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (error) {
      console.log(error);
    },
  });
};

const KakaoLogin = () => {
  const uri = window.location.href;
  const arr = uri.split('=');
  return (
    <div>
      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="222" />
      </a>
      <div>{arr[1]}</div>
    </div>
  );
};

export default KakaoLogin;
