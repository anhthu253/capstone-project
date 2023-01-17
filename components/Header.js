import styled from "styled-components";

export default function Header({ className }) {
  return <StyledTitle>Your news</StyledTitle>
}

const StyledTitle = styled.h1`
  margin-top: -20px;
  font-family: var(--font-secondary);
  font-size: 40px;
  letter-spacing: 1px;
`;







