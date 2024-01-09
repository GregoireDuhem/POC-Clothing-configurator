import React from "react";
import styled from "styled-components";

const StyledHome = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #515151;
`;

function Home() {
  return (
    <StyledHome>
      <h1>Hello world</h1>
    </StyledHome>
  );
}

export default Home;
