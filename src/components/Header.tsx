import styled from "styled-components";
import { IcPoliceLogo } from "../assets/index";

function Header() {
  return (
    <StHeader>
      <IcPoliceLogo />

      <StHeaderTitleWrapper>
        <h1>안전 Dream</h1>
        <p>아동•여성•장애인 경찰지원센터</p>
      </StHeaderTitleWrapper>
    </StHeader>
  );
}

const StHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;

  width: 100%;
  padding-top: 1rem;
  padding-left: 2rem;
  margin-top: 3.2rem;
`;

const StHeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > h1 {
    font-size: 2rem;
    font-weight: semibold;
    color: #fff;
  }
  > p {
    font-size: 1rem;
    color: #fff;
  }
`;

export default Header;
