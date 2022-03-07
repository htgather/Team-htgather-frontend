import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { history } from '../redux/configureStore';

const { Kakao } = window;

const loginWithKakao = (props) => {
  const { history } = props;
  //scope : 수집할 사용자 정보를 명시.
  const scope = 'profile_nickname';

  // Kakao.Auth.login는 인증에 성공하면 success call back이 실행된다.
  Kakao.Auth.login({
    scope,
    // success는 인증 정보를 응답(response)으로 받는다.
    success: function (response) {
      //카카오 SDK에 사용자 토큰을 설정한다.
      window.Kakao.Auth.setAccessToken(response.access_token);
      const ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();
      console.log(ACCESS_TOKEN); //토큰 발급 완료
      // 사용자 정보 불러오기
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (response) => {
          //   console.log(response);
          //   console.log(response.id); //Number
          const _id = response.id;
          const { profile } = response.kakao_account;
          console.log(profile);
          console.log(_id);

          axios
            .post('', {
              nickname: profile.nickname,
              snsId: _id,
            })
            .then((res) => {
              console.log('랄라', res);
              // history.push("/");
              localStorage.setItem('isLogin', res.token);
            })
            .catch((error) => {
              // console.log(error);
              console.error(error);
              alert('카카오 로그인 에러?');
            });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (err) {
      console.log(err);
    },
  });
};

const logoutWithKakao = () => {
  Kakao.Auth.logout();
  console.log(Kakao.Auth.getAccessToken());
};

const KakaoLogin = () => {
  //   const uri = window.location.href;
  //   const arr = uri.split('=');
  return (
    <>
      <a id="custom-login-btn" onClick={loginWithKakao}>
        <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="250" />
      </a>
      {/* <button onClick={logoutWithKakao}>로그아웃!!!!!!!!!</button> */}
    </>
  );
};

export default KakaoLogin;
