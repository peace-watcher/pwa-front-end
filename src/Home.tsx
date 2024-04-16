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
  const [loading, setLoading] = useState(true); // 초기 로딩 상태를 true로 설정
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState<string>(""); // 에러 상태 추가

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, { timeout: 10000 });
  }, []);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    console.log("latitude, longitude", latitude, longitude);

    setLoading(false);
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error("Error occurred: ", error);
    setLoading(false);
    setError("Unable to retrieve your location. Please check your settings.");
  };

  if (loading) {
    return <SplashScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>; // 에러 메시지 표시
  }

  return (
    <>
      <StHomeWraper>
        <Header />
        <MainFunction location={location} />
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
