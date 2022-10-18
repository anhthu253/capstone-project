import styled from "styled-components";

export default function Main({ className, children }) {
  return <StyledMain className={className}>{children}</StyledMain>;
}

const StyledMain = styled.main`
  display: grid;
`;
