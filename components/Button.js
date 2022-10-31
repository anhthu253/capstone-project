import styled from "styled-components";

export default function Button({ children, className, type, onClick }) {
  return (
    <StyledButton className={className} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 5px 15px;
  border-radius: 4px;
  border: var(--line-secondary);
`;
