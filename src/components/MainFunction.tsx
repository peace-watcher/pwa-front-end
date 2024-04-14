import styled from "styled-components";
import { IcMap, IcCallPolice, IcMyFile, IcFingerPrint, IcSearchKid, IcMissingKid } from "../assets/index";

import { useEffect, useState } from "react";
import { registerServiceWorker } from "../utils/notification";
import { messaging } from "../utils/settingFCM";
import { getToken } from "firebase/messaging";
import { AppCheckTokenResult } from "firebase/app-check";

import { postDeviceToken } from "../api/postDeviceToken";

function MainFunction() {
  const [deviceToken, setDeviceToken] = useState<AppCheckTokenResult>({
    token: "",
  });

  async function handleAllowNotification() {
    const permission = await Notification.requestPermission();
    console.log(permission);
    console.log("토큰", deviceToken.token);

    registerServiceWorker();

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_APP_VAPID_KEY,
    });

    setDeviceToken({
      token: token,
    });
  }

  useEffect(() => {
    // 컴포넌트가 마운트되면 handleAllowNotification() 함수를 실행합니다.
    handleAllowNotification();
  }, []); // 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 합니다.

  useEffect(() => {
    deviceToken?.token !== "" && deviceToken?.token !== undefined && postDeviceToken(deviceToken?.token);
  }, [deviceToken]);

  // const IconList = [<IcMap />, <IcCallPolice />, <IcMyFile />, <IcFingerPrint />, <IcSearchKid />, <IcMissingKid />];
  const IconList = [IcMap, IcCallPolice, IcMyFile, IcFingerPrint, IcSearchKid, IcMissingKid];
  const IconDescList = ["지문사전등록", "실종아동신고", "실종아동찾기", "범죄신고", "내정보 저장", "생활안전지도"];

  return (
    <StMainFunctionWrapper>
      {IconList.map((Icon, idx: number) => {
        return (
          <StFunctionBoxWrapper key={IconDescList[idx]}>
            <img src={Icon} />
            {IconDescList[idx]}
          </StFunctionBoxWrapper>
        );
      })}
    </StMainFunctionWrapper>
  );
}

const StMainFunctionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  algin-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 1rem;
\
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
