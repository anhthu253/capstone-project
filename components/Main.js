import styled from "styled-components";

export default function Main({ className, children }) {
  return <StyledMain className={className}>{children}</StyledMain>;
}

const StyledMain = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;
