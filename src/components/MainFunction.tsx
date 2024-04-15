import styled from "styled-components";
import { IcMap, IcCallPolice, IcMyFile, IcFingerPrint, IcSearchKid, IcMissingKid } from "../assets/index";

import { useEffect, useState } from "react";
import { registerServiceWorker } from "../utils/notification";
import { messaging } from "../utils/settingFCM";
import { getToken } from "firebase/messaging";
import { AppCheckTokenResult } from "firebase/app-check";

import { postDeviceToken } from "../api/postDeviceToken";

interface ILocation {
  latitude: number;
  longitude: number;
}

function MainFunction() {
  const [dong, setDong] = useState<string>("");
  const [location, setLocation] = useState<ILocation>();
  const { geolocation } = navigator;

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });
  const [isAllowNotification, setIsAllowNotification] = useState<boolean>(false);

  // async function handleAllowNotification() {
  //   if (!("serviceWorker" in navigator)) {
  //     alert("서비스 워커를 지원하지 않는 브라우저입니다.");
  //     return;
  //   }
  //   const registration = await navigator.serviceWorker.ready;
  //   if (!("pushManager" in registration)) {
  //     alert("푸시 알림을 지원하지 않는 브라우저입니다.");
  //     return;
  //   }
  //   const permission = await Notification.requestPermission();
  //   console.log(permission);

  //   registerServiceWorker();

  //   const token = await getToken(messaging, {
  //     vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
  //   });
  //   console.log("토큰", token);

  //   setDeviceToken({
  //     token: token,
  //   });
  // }

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

    const permission = await Notification.requestPermission();
    console.log(permission);
    console.log(isAllowNotification);
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

  // 사용자가 클릭할 때 호출할 함수를 별도로 만듭니다.
  function handleUserClick() {
    requestNotificationPermission();
    geolocation.getCurrentPosition(handleSuccess);
  }

  useEffect(() => {
    if (location == undefined) {
      setDong(" ");
    } else {
      setDong("현재 위치 : 신촌동");
    }
  }, [location]);

  useEffect(() => {
    if (Notification.permission === "granted") {
      setIsAllowNotification(true);
      requestToken();
    }
  }, [Notification.permission]);

  useEffect(() => {
    deviceToken?.token !== "" && deviceToken?.token !== undefined && postDeviceToken(deviceToken?.token);
  }, [deviceToken]);

  useEffect(() => {
    if (Notification.permission === "granted") {
      setIsAllowNotification(true);
    }
  }, [Notification.permission]);

  // const IconList = [<IcMap />, <IcCallPolice />, <IcMyFile />, <IcFingerPrint />, <IcSearchKid />, <IcMissingKid />];
  const IconList = [IcMap, IcCallPolice, IcMyFile, IcFingerPrint, IcSearchKid, IcMissingKid];
  const IconDescList = ["지문사전등록", "실종아동신고", "실종아동찾기", "범죄신고", "내정보 저장", "생활안전지도"];

  return (
    <>
      <StLocationInfo>{dong}</StLocationInfo>
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

const StLocationInfo = styled.p`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  margin-left: 7.4rem;

  font-weight: 2rem;
  color: black;
  align-self: flex-start;
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
