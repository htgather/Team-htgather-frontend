import React, { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const { Kakao } = window;

export const LoginWithKakao = () => {
  //scope : 수집할 사용자 정보를 명시.
  const scope = "profile_nickname";
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
        url: "/v2/user/me",
        success: (response) => {
          console.log("카카오에서", response);
          const _id = response.id;
          const { profile } = response.kakao_account;
          axios
            .post("https://test.kimjeongho-server.com/users/auth", {
              nickName: profile.nickname,
              snsId: _id,
            })
            .then((res) => {
              // console.log(res)
              localStorage.setItem("isLogin", res.data.token);
              const base64payload = localStorage
                .getItem("isLogin")
                .split(".")[1];
              const payload = Buffer.from(base64payload, "base64");
              const result = JSON.parse(payload.toString());
              const _nickname = result.nickName;

              window.alert(`반갑습니다 ${_nickname}님!😄`); // 변경하는 값 반영됨 근데 로그아웃했다가 로그인해야

              window.location.reload("/");
            })
            .catch((error) => {
              alert("카카오 로그인 에러", error.message);
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

export const logoutWithKakao = () => {
  // if (!Kakao.Auth.getAccessToken()) {
  //   console.log("로그인되어 있지 않습니다.");
  //   localStorage.clear();
  //   window.location.reload("/");
  //   return;
  // }
  Kakao.Auth.logout();
  localStorage.clear();
  window.location.reload("/");
};

// 회원탈퇴
// export const UnlinkWithKakao = () => {
// 	Kakao.API.request({
//     	url: '/v1/user/unlink',
//     	success: function(response) {
//     		console.log(response);
//     		//callback(); //연결끊기(탈퇴)성공시 서버에서 처리할 함수
//     		window.location.href='/'
//     	},
//     	fail: function(error) {
//     		console.log('탈퇴 미완료')
//     		console.log(error);
//     	},
// 	});
// };

const KakaoLogin = () => {
  return (
    <>
      <a id="custom-login-btn" onClick={LoginWithKakao}>
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="250"
        />
      </a>
    </>
  );
};

export default KakaoLogin;
