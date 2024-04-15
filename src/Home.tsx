import { useEffect, useState } from "react";
import Header from "./components/Header";
import MainFunction from "./components/MainFunction";
import styled from "styled-components";
import SplashScreen from "./components/SplashScreen";

interface ILocation {
  latitude: number;
  longitude: number;
}

function Home() {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<ILocation>();
  const { geolocation } = navigator;

  const handleSuccess = (pos: GeolocationPosition) => {
    console.log("pos", pos);
    const { latitude, longitude } = pos.coords;

    setLoading(false);
    setLocation({
      latitude,
      longitude,
    });
  };

  if (loading) {
    return <SplashScreen />;
  } else {
    return (
      <>
        <StHomeWraper
          onClick={() => {
            geolocation.getCurrentPosition(handleSuccess);
          }}
        >
          <Header />
          <MainFunction location={location} />
        </StHomeWraper>
      </>
    );
  }
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
