import React, { useState } from "react";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PixelStreamingWrapper } from "./pixelWrapper";

const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--blackColor);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .streamingSide {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .toggleButton {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #333333;
    width: 20px;
    height: 80px;
    position: relative;
    cursor: pointer;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    &:hover {
      background-color: #292929;
    }
  }
  .rightSide {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    // When rightSide is not open
    transform: translateX(${(props) => (props.isRightSideOpen ? "0" : "100%")});
    width: ${(props) => (props.isRightSideOpen ? "20%" : "0")};
    transition: width 0.3s;
    overflow: hidden;
    height: 100%;
    background-color: var(--blackGreyColor);
    display: flex;
    flex-direction: column;
    align-items: center;

    .leftPanel {
      padding-top: var(--xl-sizing);
      position: absolute;
      top: 0;
      left: 0;
      width: 18%;
      height: 100%;
      background-color: #333333;
      button {
        font-size: 12px;
        border-radius: 0;
        width: 100%;
        height: 10%;
        &.active {
          background-color: #000;
        }
      }
    }
    .colorList {
      flex-direction: column;
      align-items: center;
      width: 100%;
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: center;
      margin-top: var(--xl-sizing);
      margin-left: var(--l-sizing);

      li {
        width: 100px;
        height: 100px;
        margin: var(--xs-sizing);
        border-radius: var(--xs-sizing);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .typeSection {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        margin-left: var(--xl-sizing);
        width: 75%;
        height: auto;
        cursor: pointer;
        margin-bottom: 20px;
      }
    }
    .colorItem {
      width: 50px;
      height: 50px;
      margin: var(--xs-sizing);
      border-radius: var(--xs-sizing);
      position: relative;
      cursor: pointer;
      transition: outline 0.3s;

      &.selected {
        outline: 3px solid white;
      }
    }
  }
`;

function Home() {
  const [isRightSideOpen, setIsRightSideOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = ["Blue", "Green", "Red", "Orange", "White", "Black"];
  const [selectedType, setSelectedType] = useState(null);
  const [activePanel, setActivePanel] = useState("colors");
  const [pixelStreaming, setPixelStreaming] = useState(null);
  const [selectLogoColor, setselectLogoColor] = useState(null);
  const logoColors = ["Blue", "Green", "Red", "Orange", "White", "Black"];

  //

  const onPixelStreamingReady = (streamingInstance) => {
    setPixelStreaming(streamingInstance);
  };

  //

  const typeImages = [
    { type: "type1", imagePath: "src/assets/hoodie.png" },
    { type: "type2", imagePath: "src/assets/tee.png" },
  ];

  const typeLogo = [
    { type: "type1", imagePath: "src/assets/cross.png" },
    { type: "type2", imagePath: "src/assets/labarak.png" },
    { type: "type3", imagePath: "src/assets/dauphin.png" },
  ];

  const [selectLogo, setselectLogo] = useState(typeLogo[0].type);

  const handlePanelToggle = (panel) => {
    setActivePanel(panel);
  };

  const handleTypeClick = (type, index) => {
    setSelectedType(type);
    console.log(index);

    if (pixelStreaming) {
      pixelStreaming.emitUIInteraction({ type: 1, index: index });
    }
  };

  const handleColorClick = (color, index) => {
    setSelectedColor(color);
    console.log(index);

    if (pixelStreaming) {
      pixelStreaming.emitUIInteraction({ type: 0, index: index });
    }
  };

  const handleLogoClick = (type, index) => {
    setselectLogo(type);
    console.log(index);

    if (pixelStreaming) {
      pixelStreaming.emitUIInteraction({ type: 2, index: index });
    }
  };

  const handleLogoColorClick = (type, index) => {
    setselectLogoColor(type);
    console.log(index);

    if (pixelStreaming) {
      pixelStreaming.emitUIInteraction({ type: 3, index: index });
    }
  };

  return (
    <StyledHome isRightSideOpen={isRightSideOpen}>
      <div className="streamingSide">
        <PixelStreamingWrapper
          initialSettings={{
            AutoPlayVideo: true,
            AutoConnect: true,
            ss: "ws://192.168.10.74:80",
            StartVideoMuted: true,
            HoveringMouse: true,
            WaitForStreamer: true,
          }}
          onReady={onPixelStreamingReady}
        />
      </div>
      <button
        onClick={() => setIsRightSideOpen(!isRightSideOpen)}
        className="toggleButton"
      >
        {isRightSideOpen ? <ChevronRight /> : <ChevronLeft />}
      </button>
      <div className="rightSide">
        <h1>Configurateur</h1>
        <div className="leftPanel">
          <button
            onClick={() => handlePanelToggle("colors")}
            className={activePanel === "colors" ? "active" : ""}
          >
            Couleurs
          </button>
          <button
            onClick={() => handlePanelToggle("types")}
            className={activePanel === "types" ? "active" : ""}
          >
            Type
          </button>
          <button
            onClick={() => handlePanelToggle("logo")}
            className={activePanel === "logo" ? "active" : ""}
          >
            Logo
          </button>
          <button
            onClick={() => handlePanelToggle("logoColor")}
            className={activePanel === "logoColor" ? "active" : ""}
          >
            Logo color
          </button>
        </div>
        {activePanel === "colors" && (
          <ul className="colorList">
            {colors.map((color, index) => (
              <li
                key={index}
                className={`colorItem ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color, index)}
              />
            ))}
          </ul>
        )}
        {activePanel === "types" && (
          <div className="typeSection">
            {typeImages.map((typeObj, index) => (
              <img
                key={typeObj.type}
                src={typeObj.imagePath}
                alt={typeObj.type}
                onClick={() => handleTypeClick(typeObj.type, index)}
                style={{
                  border:
                    selectedType === typeObj.type ? "4px solid white" : "none",
                }}
              />
            ))}
          </div>
        )}
        {activePanel === "logo" && (
          <div className="typeSection">
            {typeLogo.map((typeObj, index) => (
              <img
                key={typeObj.type}
                src={typeObj.imagePath}
                alt={typeObj.type}
                onClick={() => handleLogoClick(typeObj.type, index)}
                style={{
                  border:
                    selectLogo === typeObj.type ? "2px solid white" : "none",
                }}
              />
            ))}
          </div>
        )}
        {activePanel === "logoColor" && (
          <ul className="colorList">
            {logoColors.map((color, index) => (
              <li
                key={index}
                className={`colorItem ${
                  selectLogoColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleLogoColorClick(color, index)}
              >
                <span style={{ color: "pink" }}>Logo</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </StyledHome>
  );
}

export default Home;
