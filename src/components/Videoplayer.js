import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { history } from "../redux/configureStore";
import HiFive from "../Images/Videoplayer_emoji.png";
import Screensaver from "../Images/Videoplayer_screensaver.png";
import Mute from "../Images/Videoplayer_mute.png";
//Style
import styled from "styled-components";

const Videoplayer = React.forwardRef((props, ref) => {
  console.log("영상통화");
  const roomName = props.roomId;
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [Audio, setAudio] = useState([]);
  const [Video, setVideo] = useState([]);
  const [socketID, setSocketID] = useState("");
  // const [checkCurStatus, setCheckCurStatus] = useState();
  const checkCurStatus = useRef();
  const videoGrid = useRef();
  // const muteBtn = useRef();
  // const cameraBtn = useRef();
  // const leaveBtn = useRef();
  const cameraSelect = useRef();
  // const call = useRef();
  const changeNumberOfUsers = props.changeNumberOfUsers;
  const myvideo = useRef();
  const mystream = useRef();

  let nickname = props.nickname;

  let myPeerConnection;
  let myStream;
  let pcObj = {};
  let peopleInRoom = 1;

  const socket = io("https://test.kimjeongho-server.com", {
    cors: { origin: "*" },
  }); //Server adress

  //페이지가 마운트되고 "join_room" Event 함수 실행 1
  useEffect(() => {
    const name = document.getElementById("name");
    name.innerText = `${nickname}`;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        socket.emit("join_room", roomName, nickname);
      })
      .catch(() => {
        window.alert("카메라 또는 마이크 장치를 확인 후 다시 입장해주세요");
        history.push("/");
        window.location.reload();
      });

    return () => {
      LeaveRoom();
    };
  }, []);

  //서버로부터 accept_join 받음
  socket.on("accept_join", async (userObjArr, socketIdformserver) => {
    const length = userObjArr.length;
    //카메라, 마이크 가져오기
    await getMedia();
    setSocketID(socketIdformserver);
    changeNumberOfUsers(`${peopleInRoom}/5`);
    // const title = document.getElementById("numberOfusers");
    // title.innerText = `현재인원 : ${peopleInRoom}`;
    if (length === 1) {
      return;
    }
    for (let i = 0; i < length - 1; i++) {
      //가장 최근 들어온 브라우저 제외
      try {
        const newPC = makeConnection(
          //RTCPeerconnection 생성
          userObjArr[i].socketId,
          userObjArr[i].nickname
        );
        const offer = await newPC.createOffer(); // 각 연결들에 대해 offer를 생성
        await newPC.setLocalDescription(offer);
        socket.emit("offer", offer, userObjArr[i].socketId, nickname); // offer를 보내는 사람의 socket id와 닉네임
      } catch (error) {
        console.log(error);
      }
    }
  });

  //사용자의 stream 가져오는 함수
  async function getMedia(deviceId) {
    const initialConstraints = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };
    try {
      myStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? cameraConstraints : initialConstraints
      );
      addVideoStream(myvideo.current, myStream);
      mystream.current.append(myvideo.current);
      videoGrid.current.append(mystream.current);
      myvideo.current.muted = true;
      setAudio(myStream.getAudioTracks());
      setVideo(myStream.getVideoTracks());
      if (!deviceId) {
        await getCameras();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 영상 스트림을 DOM 비디오 엘리먼트에 넣어주는 함수
  async function addVideoStream(video, stream) {
    try {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function makeConnection(remoteSocketId, remoteNickname) {
    myPeerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });

    //2명 이상일 때만 실행 됨.

    myPeerConnection.addEventListener("icecandidate", (event) => {
      handleIce(event, remoteSocketId);
    });

    myPeerConnection.addEventListener("track", (data) => {
      handleAddStream(data, remoteSocketId, remoteNickname);
    });

    myStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, myStream));

    // pcObj에 각 사용자와의 connection 정보를 저장함
    pcObj[remoteSocketId] = myPeerConnection;

    peopleInRoom++;

    // const title = document.getElementById("numberOfusers");
    // title.innerText = `현재인원 : ${peopleInRoom}`;
    changeNumberOfUsers(`${peopleInRoom}/5`);
    return myPeerConnection;
  }

  function handleAddStream(data, remoteSocketId, remoteNickname) {
    const peerStream = data.streams[0];
    if (data.track.kind === "video") {
      paintPeerFace(peerStream, remoteSocketId, remoteNickname);
    }
  }

  async function paintPeerFace(peerStream, id, remoteNickname) {
    try {
      const videoGrid = document.querySelector("#video-grid");
      const video = document.createElement("video");
      const nickNameContainer = document.createElement("div");
      const peername = document.createElement("div");
      const div = document.createElement("div");
      div.id = id;
      video.autoplay = true;
      video.playsInline = true;
      video.srcObject = peerStream;
      peername.innerText = `${remoteNickname}`;
      peername.style.color = "white";
      nickNameContainer.appendChild(peername);
      div.appendChild(nickNameContainer);
      div.appendChild(video);
      video.className = "memberVideo";
      peername.className = "nickName";
      nickNameContainer.className = "nickNameContainer";
      div.className = "videoBox";
      videoGrid.appendChild(div);

      // 입장시 현재인원들의 카메라 및 음소거 상태 확인

      if (checkCurStatus.current[id].screensaver) {
        const screensaver = document.createElement("div");
        screensaver.className = "screensaver";
        div.appendChild(screensaver);
      }
      if (checkCurStatus.current[id].muted) {
        const muteIcon = document.createElement("div");
        muteIcon.className = "muteIcon";
        nickNameContainer.prepend(muteIcon);
      }
    } catch (error) {
      console.log(error);
    }
  }

  socket.on("checkCurStatus", (object) => {
    // console.log(object);
    // setCheckCurStatus(object);
    checkCurStatus.current = object;
  });

  // 두명이상이 들어올때부터 실행이 되는데, 누가 들어올 때마다 처음 사람빼고 실행되는 듯
  socket.on("offer", async (offer, remoteSocketId, remoteNickname) => {
    try {
      const newPC = makeConnection(remoteSocketId, remoteNickname);
      await newPC.setRemoteDescription(offer);
      const answer = await newPC.createAnswer();
      await newPC.setLocalDescription(answer);
      socket.emit("answer", answer, remoteSocketId);
    } catch (error) {
      console.log(error);
    }
  });

  //방 만든 브라우저에서 일어나는 일 (참가한 방에서 보낸 answer을 받아 저장함.)
  socket.on("answer", async (answer, remoteSocketId) => {
    await pcObj[remoteSocketId].setRemoteDescription(answer);
  });

  function handleIce(event, remoteSocketId) {
    if (event.candidate) {
      socket.emit("ice", event.candidate, remoteSocketId);
    }
  }

  socket.on("ice", async (ice, remoteSocketId) => {
    await pcObj[remoteSocketId].addIceCandidate(ice);
  });

  async function getCameras() {
    try {
      const devieces = await navigator.mediaDevices.enumerateDevices();
      const cameras = devieces.filter((device) => device.kind === "videoinput");

      cameras.forEach((camera) => {
        const option = document.createElement("option");
        option.value = cameras[0].deviceId;
        option.innerText = camera.label;
        cameraSelect.current.append(option);
      });
    } catch (error) {
      console.log(error);
    }
  }

  // 이후 참가한 방에 일어나는 일

  socket.on("reject_join", () => {
    // setReject(true);
    alert("정원이 초과되었습니다.");
    history.replace("/");
  });

  socket.on("exception", () => {
    peopleInRoom++;
    changeNumberOfUsers(`5/5`);
  });

  //나가기를 누르면 나한테 벌어지는 일
  function LeaveRoom() {
    // dispatch(roomActions.exitRoomDB(roomName));
    socket.disconnect();
    myStream.getTracks().forEach((track) => track.stop());
    clearAllVideos();
  }

  function clearAllVideos() {
    const streams = document.querySelector("#video-grid");
    const streamArr = streams.querySelectorAll("div");
    streamArr.forEach((streamElement) => {
      if (streamElement.id !== "mystream") {
        streams.removeChild(streamElement);
      }
    });
  }

  //내가 나갈때 다른 사람들에게 일어나는 일
  socket.on("leave_room", (leavedSocketId) => {
    removeVideo(leavedSocketId);
    peopleInRoom--;
    changeNumberOfUsers(`${peopleInRoom}/5`);
    // const title = document.getElementById("numberOfusers");
    // title.innerText = `현재인원 : ${peopleInRoom}`;
  });

  function removeVideo(leavedSocketId) {
    const streams = document.querySelector("#video-grid");
    const streamArr = streams.querySelectorAll("div");

    streamArr.forEach((streamElement) => {
      if (streamElement.id === leavedSocketId) {
        streams.removeChild(streamElement);
      }
    });
  }

  //////////////////////////////////////
  React.useImperativeHandle(ref, () => ({
    handleCameraClick: () => {
      Video.forEach((track) => (track.enabled = !track.enabled));
      if (cameraOff === false) {
        // 카메라 오프가 false이면 켜진상태
        setCameraOff(true);
        // 스크린 세이버 온 오프
        socket.emit("screensaver", roomName, socketID, true);
        let screensaver = document.querySelector("#myscreensaver");
        screensaver.style.display = "flex";
      } else if (cameraOff === true) {
        setCameraOff(false);
        let screensaver = document.querySelector("#myscreensaver");
        screensaver.style.display = "none";
        socket.emit("screensaver", roomName, socketID, false);
      }
    },
    handleMuteClick: () => {
      Audio.forEach((track) => (track.enabled = !track.enabled));
      const nickNameContainer = document.querySelector("#nickNameContainer");
      if (muted === false) {
        setMuted(true);
        const muteIcon = document.createElement("div");
        muteIcon.className = "muteIcon";
        nickNameContainer.prepend(muteIcon);
        socket.emit("mic_check", roomName, socketID, true);
      } else if (muted === true) {
        setMuted(false);
        const muteIcon = nickNameContainer.querySelector(".muteIcon");
        nickNameContainer.removeChild(muteIcon);
        socket.emit("mic_check", roomName, socketID, false);
      }
    },

    showEmoji: () => {
      const myArea = document.querySelector("#mystream");
      // const emojiBox = document.createElement("h1");
      // emojiBox.innerText = "👍";
      const emojiBox = document.createElement("img");
      emojiBox.src = HiFive;
      myArea.appendChild(emojiBox);
      setTimeout(() => {
        myArea.removeChild(emojiBox);
      }, 2000);
      emojiBox.className = "emojiBox";
      console.log(roomName, socketID);
      socket.emit("emoji", roomName, socketID);
    },
  }));
  // 여긴 다른 사람들에게 띄우는 부분
  socket.on("emoji", (remoteSocketId) => {
    // console.log(remoteSocketId);
    const remoteDiv = document.getElementById(`${remoteSocketId}`);
    const emojiBox = document.createElement("img");
    emojiBox.src = HiFive;

    emojiBox.className = "emojiBox";
    if (remoteDiv) {
      remoteDiv.appendChild(emojiBox);
      setTimeout(() => {
        remoteDiv.removeChild(emojiBox);
      }, 2000);
    }
  });

  // 여긴 다른 사람들에게 띄우는 부분
  socket.on("screensaver", (remoteSocketId, boolean) => {
    const remoteDiv = document.getElementById(`${remoteSocketId}`);
    if (boolean) {
      const screensaver = document.createElement("div");
      screensaver.className = "screensaver";
      remoteDiv.appendChild(screensaver);
    } else {
      const screensaver = remoteDiv.querySelector(".screensaver");
      setTimeout(() => {
        remoteDiv.removeChild(screensaver);
      }, 100);
    }
  });

  socket.on("mic_check", (remoteSocketId, boolean) => {
    const remoteDiv = document.getElementById(`${remoteSocketId}`);
    const nickNameContainer = remoteDiv.querySelector(".nickNameContainer");
    if (boolean) {
      const muteIcon = document.createElement("div");
      muteIcon.className = "muteIcon";
      nickNameContainer.prepend(muteIcon);
    } else {
      const muteIcon = remoteDiv.querySelector(".muteIcon");
      nickNameContainer.removeChild(muteIcon);
    }
  });

  return (
    <>
      <MemberWrap ref={videoGrid} id="video-grid">
        <div ref={mystream} id="mystream" className="videoBox">
          <video
            ref={myvideo}
            autoPlay
            playsInline
            id="myvideo"
            className="memberVideo myVideo"
          ></video>
          <div id="nickNameContainer" className="nickNameContainer">
            {/* <div className="mutedIcon" /> */}
            <div id="name" className="nickName"></div>
          </div>
          <div
            id="myscreensaver"
            style={{ display: "none" }}
            className="screensaver"
          ></div>
        </div>
      </MemberWrap>
    </>
  );
});



const MemberWrap = styled.div`
  height: 616px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1440px) {
    position: absolute;
    right: 0px;
    top: -76px;
  }

  .memberVideo {
    margin-bottom: 8px;
    width: 200px;
    height: 112px;
    border-radius: 8px;
    position: relative;
    object-fit: cover;
    @media screen and (max-width: 1440px) {
      width: 202px;
      height: 113px;
    }
  }
  .nickNameContainer {
    display: flex;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    padding: 5px 8px;
    border-radius: 4px;
    z-index: 3;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.26px;
    align-items: center;
  }

  .videoBox {
    position: relative;
  }
  .emojiBox {
    position: absolute;
    z-index: 2;
    width: 77px;
    height: 60px;
    left: -77px;
    top: 31px;
  }
  .myVideo {
    // 사파리
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  .screensaver {
    display: flex;
    position: absolute;
    background-image: url(${Screensaver});
    width: 200px;
    height: 112px;
    z-index: 2;
    top: 0px;
  }

  .muteIcon {
    background-image: url(${Mute});
    z-index: 3;
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
`;
export default Videoplayer;