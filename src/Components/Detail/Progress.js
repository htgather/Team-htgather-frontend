import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styled from "styled-components";
import { changeToSeconds } from "../Common/Functions/YoutubeDataAPI";
import { getTimeStringSeconds } from "../Common/Functions/YoutubeDataAPI";
import { useSelector } from "react-redux";

function Progress(props) {
  const { roomInfo, isDone } = props;
  // console.log("프로그래스바");
  let curYoutubeTime = useSelector(
    (state) => state.common.playInfo.curYoutubeTime
  );

  const [text, setText] = useState("오늘도 운동하는 여러분👍🏻");

  const leftSeconds =
    changeToSeconds(roomInfo.videoLength) - 1 - curYoutubeTime;

  // JavaScript에 미디어쿼리를 사용하는 matchMedia()
  const NewMedia = window.matchMedia("screen and (max-width: 1360px)");

  // 타이머 표시 _ 총길이 - 현재시간을 시분초로

  // 프로그래스 단위 초
  useEffect(() => {
    if (curYoutubeTime >= (changeToSeconds(roomInfo.videoLength) - 1) * 0.245) {
      setText("화이팅!!");
    }
    if (curYoutubeTime >= (changeToSeconds(roomInfo.videoLength) + 1) * 0.5) {
      setText("벌써 절반이나 왔어요!");
    }
    if (curYoutubeTime >= (changeToSeconds(roomInfo.videoLength) - 1) * 0.745) {
      setText("회원님 진짜 마지막 한세트만 더! 힘내세요!");
    }
    if (curYoutubeTime >= changeToSeconds(roomInfo.videoLength)) {
      setText("👏🏻 오늘도 운동 완료! 다들 수고하셨습니다!");
    }
  }, [leftSeconds]);
  useEffect(() => {
    if (isDone) {
      setText("👏🏻 오늘도 운동 완료! 다들 수고하셨습니다!");
    }
  }, [isDone]);
  return (
    <div className="App" style={{ color: "black" }}>
      <div style={{ margin: "0px 0px 1px 0px" }}>
        <TextWrap>{text}</TextWrap>
      </div>

      <Contents style={{ justifyContent: NewMedia.matches ? "center" : "" }}>
        <ProgressWrap>
          <ProgressBar
            completed={curYoutubeTime ? curYoutubeTime : 0}
            isLabelVisible={false}
            maxCompleted={changeToSeconds(roomInfo.videoLength) - 2}
            height="12px"
            bgColor="#0028fa"
          />
        </ProgressWrap>
        <TextWrap style={{ marginLeft: NewMedia.matches ? "2px" : "" }}>
          {leftSeconds >= 0
            ? `${
                getTimeStringSeconds(leftSeconds).split(":")[0] == "00"
                  ? getTimeStringSeconds(leftSeconds).substring(3)
                  : getTimeStringSeconds(leftSeconds)
              }`
            : roomInfo.videoLength}
        </TextWrap>
      </Contents>
    </div>
  );
}

const Contents = styled.div`
  width: 1095px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1440px) {
    width: 758px;
    height: 50px;
  }
  margin-bottom: 24px;
`;

const ProgressWrap = styled.div`
  position: relative;
  width: 100%;
  margin-right: 10px;
`;

const TextWrap = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 1.4;
`;

export default React.memo(Progress);
