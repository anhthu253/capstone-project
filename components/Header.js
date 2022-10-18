import styled from "styled-components";

export default function Header({ className }) {
  return (
    <StyledHeader className={className}>
      <StyledTitle>Your news</StyledTitle>
      <SubText>The quest begins here</SubText>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  border-top: var(--line-primary);
  border-bottom: var(--line-primary);
`;

const StyledTitle = styled.h1`
  grid-row: 1;
  grid-column: 1;
  margin-bottom: 0;
  font-family: var(--font-secondary);
  text-align: center;
`;

const SubText = styled.h2`
  grid-row: 2;
  grid-column: 2;
  margin-bottom: 0;
  font-family: var(--font-tertiary);
  text-align: right;
`;
