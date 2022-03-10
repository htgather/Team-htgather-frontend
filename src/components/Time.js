export function makeStartTime(currentTime, addMinutes) {
  /* Date 형식으로 넣었을때 처리하는 함수 */
  let M;
  let S;
  let current =
    currentTime.getHours() +
    ":" +
    currentTime.getMinutes() +
    ":" +
    currentTime.getSeconds();

  let laterTime = new Date(
    currentTime.setMinutes(currentTime.getMinutes() + addMinutes)
  );

  if (laterTime.getMinutes() < 10) {
    M = "0" + laterTime.getMinutes();
  } else {
    M = laterTime.getMinutes();
  }
  if (laterTime.getSeconds() < 10) {
    S = "0" + laterTime.getSeconds();
  } else {
    S = laterTime.getSeconds();
  }
  let later = laterTime.getHours() + ":" + M + ":" + S;

  return later;
}

//현재시간 HH:MM:SS 가져오기
export function getTime() {
  const time = new Date();
  const hour = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return `${hour < 10 ? `0${hour}` : hour}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

//초를 시분초로 바꿔주는 함수_ 플레이타임을 바꿔줌
export function getTimeStringSeconds(seconds) {
  let hour, min, sec;
  hour = parseInt(seconds / 3600);
  min = parseInt((seconds % 3600) / 60);
  sec = seconds % 60;
  if (hour.toString().length === 1) hour = "0" + hour;
  if (min.toString().length === 1) min = "0" + min;
  if (sec.toString().length === 1) sec = "0" + sec;
  return hour + ":" + min + ":" + sec;
}

// 타이머에 표시할 시작시간-현재시간_HH:MM:SS를 받아서 MM:SS로 표기
export function calCount(startTime, nowTime) {
  let h = startTime.split(":")[0] - nowTime.split(":")[0];
  let m = startTime.split(":")[1] - nowTime.split(":")[1];
  let s = startTime.split(":")[2] - nowTime.split(":")[2];
  if (s < 0) {
    m = m - 1;
    s = s + 60;
  }
  if (m < 0) {
    h = h - 1;
    m = m + 60;
  }
  if (s < 10) {
    s = "0" + s;
  }
  if (m < 10) {
    m = "0" + m;
  }
  let result = m + ":" + s;
  return result;
}
