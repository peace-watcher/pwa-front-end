import Header from "./components/Header";
import MainFunction from "./components/MainFunction";
import styled from "styled-components";

function Home() {
  return (
    <>
      <StHomeWraper>
        <Header />
        <MainFunction />
      </StHomeWraper>
    </>
  );
}

const StHomeWraper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100vh;

  background: linear-gradient(to bottom, #6072c6 20%, #cfdefb 80%);
`;

export default Home;
