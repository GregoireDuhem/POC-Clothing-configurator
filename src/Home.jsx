import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { PixelStreamingWrapper } from "./pixelWrapper";
import Lottie from "react-lottie";
import animationData from "/src/assets/eagle.json";
import loader from "/src/assets/loaderTxt.json";

const clickAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
`;

const LoadingWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--whiteColor);
  display: grid;
  justify-items: center;
  align-content: center;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  margin: var(--xs-sizing) var(--s-sizing);
  padding: var(--s-sizing);
  background-color: var(--blackGreyColor);
  color: var(--whiteColor);
  border: 1px solid var(--whiteColor);
  cursor: pointer;
  font-size: var(--m-sizing);
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--whiteColor);
      color: var(--blackGreyColor);
    `}

  &:hover {
    background-color: var(--whiteColor);
    color: var(--blackGreyColor);
  }

  &.animatedOnClick {
    animation: ${clickAnimation} 0.2s ease;
  }
`;

const Snackbar = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--whiteColor);
  color: var(--blackGreyColor);
  padding: var(--m-sizing);
  border-radius: var(--xs-sizing);
  z-index: 1050;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--blackColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .buttonContainer {
    position: absolute;
    top: 95%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    width: auto;
    padding: var(--l-sizing);
    z-index: 10;
  }
  .logo {
    position: absolute;
    top: 4%;
    right: 3%;
    font-size: var(--xl-sizing);
    color: var(--whiteColor);
  }
`;

function Home() {
  const [pixelStreaming, setPixelStreaming] = useState(null);
  const [activeButton, setActiveButton] = useState("Inner");
  const [animatingButton, setAnimatingButton] = useState("");
  const [showLoading, setShowLoading] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onPixelStreamingReady = (streamingInstance) => {
    setPixelStreaming(streamingInstance);
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    triggerAnimation(buttonId);

    if (pixelStreaming) {
      if (buttonId == "Inner") {
        pixelStreaming.emitUIInteraction({ Show: "Inner" });
      }
      if (buttonId == "Outer") {
        pixelStreaming.emitUIInteraction({ Show: "Outer" });
      }
      if (buttonId == "InnerOuter") {
        pixelStreaming.emitUIInteraction({ Show: "InnerOuter" });
      }
    }
  };

  const handleButtonWeather = (buttonId) => {
    triggerAnimation(buttonId);
    if (pixelStreaming) {
      pixelStreaming.emitUIInteraction({ Weather: "no rain" });
    }
  };

  const handleButtonExportRef = (buttonId) => {
    triggerAnimation(buttonId);
    setSnackbarMessage(`${activeButton} has been added to cart`);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  const triggerAnimation = (buttonId) => {
    setAnimatingButton(buttonId);
    setTimeout(() => setAnimatingButton(""), 200);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const loaderOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <StyledHome>
      <PixelStreamingWrapper
        initialSettings={{
          AutoPlayVideo: true,
          AutoConnect: true,
          ss: "ws://192.168.10.67",
          StartVideoMuted: true,
          HoveringMouse: true,
          WaitForStreamer: true,
        }}
        onReady={onPixelStreamingReady}
      />

      <>
        {showLoading && (
          <LoadingWrapper>
            <Lottie options={defaultOptions} height={200} width={200} />
            <Lottie options={loaderOptions} height={200} width={200} />
          </LoadingWrapper>
        )}

        {!showLoading && (
          <>
            <div
              onClick={() =>
                (window.location.href = "https://www.aigle.com/fr/fr")
              }
              className="logo"
            >
              Aigle
            </div>
            {showSnackbar && <Snackbar>{snackbarMessage}</Snackbar>}
            <div className="buttonContainer">
              <ToggleButton
                className={animatingButton === "Inner" ? "animatedOnClick" : ""}
                active={activeButton === "Inner"}
                onClick={() => handleButtonClick("Inner")}
              >
                Inner
              </ToggleButton>
              <ToggleButton
                className={animatingButton === "Outer" ? "animatedOnClick" : ""}
                active={activeButton === "Outer"}
                onClick={() => handleButtonClick("Outer")}
              >
                Outer
              </ToggleButton>
              <ToggleButton
                className={
                  animatingButton === "InnerOuter" ? "animatedOnClick" : ""
                }
                active={activeButton === "InnerOuter"}
                onClick={() => handleButtonClick("InnerOuter")}
              >
                Inner and Outer
              </ToggleButton>
              <ToggleButton
                className={
                  animatingButton === "nextWeather" ? "animatedOnClick" : ""
                }
                onClick={() => handleButtonWeather("nextWeather")}
              >
                Next Weather
              </ToggleButton>
              <ToggleButton
                className={
                  animatingButton === "addToCart" ? "animatedOnClick" : ""
                }
                onClick={() => handleButtonExportRef("addToCart")}
              >
                Add to cart
              </ToggleButton>
            </div>
          </>
        )}
      </>
    </StyledHome>
  );
}

export default Home;
