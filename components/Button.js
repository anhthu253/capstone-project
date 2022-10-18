import styled from "styled-components";

export default function Button({ children, className, onClickEvent }) {
  return (
    <StyledButton className={className} onClick={onClickEvent}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
  background: var(--background-primary);
  box-shadow: 3px 2px 3px 2px var(--line-color);
  border: var(--line-color);
`;
