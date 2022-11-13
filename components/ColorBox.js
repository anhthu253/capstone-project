import styled from "styled-components";
export default function ColorBox({ background, onChooseColor }) {
  return (
    <StyledColorBox
      background={background}
      onClick={onChooseColor}
    ></StyledColorBox>
  );
}

const StyledColorBox = styled.span`
  width: 35px;
  height: 35px;
  background: ${({ background }) => background};
  border: ${({ background }) =>
    background === "transparent" ? "var(--line-secondary)" : "none"};
`;
