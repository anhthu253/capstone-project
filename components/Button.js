import styled from "styled-components";

export default function Button({ children, className, type, onClick }) {
  return (
    <StyledButton className={className} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  background-color: #2b2626;
  color: #f3f3f3;
  font-family: "Special Elite";
  border-radius: 2px;
  box-shadow: 0 4px 4px 0 #f3f3f3;
  padding: 15px;
  margin: 10px 0;
`;
