import React from "react";
import styled from "styled-components";
import { IcPoliceLogo } from "../assets/index";

const SplashContainer = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(to bottom, #6072c6 20%, #cfdefb 80%);

  > h1 {
    font-size: 2rem;
    font-weight: bold;
    color: #fff;
    margin-bottom: 16px;
  }

  > p {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff;
    margin-top: 16px;
  }
`;

function SplashScreen({ onClick }: { onClick: () => void }) {
  return (
    <SplashContainer onClick={onClick}>
      <h1>안전 Dream</h1>
      <IcPoliceLogo />
      <p>아동•여성•장애인 경찰지원센터</p>
    </SplashContainer>
  );
}

export default SplashScreen;
