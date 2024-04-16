import styled from "styled-components";
import { IcMap, IcCallPolice, IcMyFile, IcFingerPrint, IcSearchKid, IcMissingKid } from "../assets/index";

import { useEffect, useState } from "react";
import { registerServiceWorker } from "../utils/notification";
import { messaging } from "../utils/settingFCM";
import { getToken } from "firebase/messaging";
import { AppCheckTokenResult } from "firebase/app-check";
import Modal from "react-modal";

import { postDeviceToken } from "../api/postDeviceToken";

interface ILocation {
  latitude: number;
  longitude: number;
}

function MainFunction({ location }: { location: ILocation | undefined }) {
  const [dong, setDong] = useState<string>("");

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true); // Modal 상태 관리
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });

  // Modal을 열고 닫는 함수
  function closeModal() {
    setModalIsOpen(false);
  }

  const requestNotificationPermission = async () => {
    if (!("serviceWorker" in navigator)) {
      alert("서비스 워커를 지원하지 않는 브라우저입니다.");
      return;
    }
    const registration = await navigator.serviceWorker.ready;
    if (!("pushManager" in registration)) {
      alert("푸시 알림을 지원하지 않는 브라우저입니다.");
      return;
    }

    closeModal();

    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === "granted") {
      registerServiceWorker();
      requestToken();
    }
  };

  const requestToken = async () => {
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });
    console.log("토큰", token);
    setDeviceToken({ token: token });
  };

  function handleUserClick() {
    closeModal();
    requestNotificationPermission();
  }

  useEffect(() => {
    if (location == undefined) {
      setDong(" ");
    } else {
      setDong("현재 위치 : 신촌동");
    }
  }, [location]);

  // useEffect(() => {
  //   if (Notification.permission === "granted") {
  //     closeModal();
  //     requestToken();
  //   }
  // }, [Notification.permission]);

  useEffect(() => {
    deviceToken?.token !== "" && deviceToken?.token !== undefined && postDeviceToken(deviceToken?.token);
  }, [deviceToken]);

  // const IconList = [<IcMap />, <IcCallPolice />, <IcMyFile />, <IcFingerPrint />, <IcSearchKid />, <IcMissingKid />];
  const IconList = [IcMap, IcCallPolice, IcMyFile, IcFingerPrint, IcSearchKid, IcMissingKid];
  const IconDescList = ["지문사전등록", "실종아동신고", "실종아동찾기", "범죄신고", "내정보 저장", "생활안전지도"];

  useEffect(() => {
    console.log("modalIsOpen", modalIsOpen);
  }, [modalIsOpen]);

  return (
    <>
      {/* @ts-ignore */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles} contentLabel="알림 설정">
        <StH2>알림을 설정하시겠습니까?</StH2>
        <StButton onClick={requestNotificationPermission}>예</StButton>
        <StButton onClick={closeModal}>아니오</StButton>
      </Modal>
      <StLocationInfo>{dong}</StLocationInfo>
      <StLocationInfo>
        {location?.latitude}, {location?.longitude}
      </StLocationInfo>
      <StMainFunctionWrapper>
        {IconList.map((Icon, idx: number) => {
          return (
            <StFunctionBoxWrapper onClick={handleUserClick} key={IconDescList[idx]}>
              <img src={Icon} />
              {IconDescList[idx]}
            </StFunctionBoxWrapper>
          );
        })}
      </StMainFunctionWrapper>
    </>
  );
}

// 모달 스타일 설정
const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px", // 적절한 크기 조정
    textAlign: "center", // 텍스트 중앙 정렬
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)", // 배경색 투명하게
  },
};

const StH2 = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StButton = styled.button`
  background-color: #6072c6;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  cursor: pointer;
`;

const StLocationInfo = styled.p`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  margin-left: 7.4rem;
  font-weight: 2rem;
  align-self: flex-start;

  font-weight: 2rem;

  color: white;
`;

const StMainFunctionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem;
  width: 29rem;
  height: 37.3rem;
  margin-top: 2.5rem;

  border-radius: 3rem;
  background-color: #fff;
`;

const StFunctionBoxWrapper = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 12rem;
  height: 10rem;

  box-shadow: 0px 4px 4px 0px #000000;

  border-radius: 2rem;
  background-color: #fff;

  > img {
    width: 50%;
    height: 50%;
  }
`;

export default MainFunction;
