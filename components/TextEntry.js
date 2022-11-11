import styled from "styled-components";

export default function TextEntry({
  label,
  id,
  value,
  name,
  type,
  placeholder,
}) {
  return (
    <StyledTextEntry>
      <label htmlFor={id}>{label}</label>
      <StyledInput
        id={id}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
      ></StyledInput>
    </StyledTextEntry>
  );
}

const StyledTextEntry = styled.section`
  display: grid;
  grid-template-columns: 5rem 10em 1fr;
  gap: 1rem;
`;
const StyledInput = styled.input`
  height: 2rem;
  border-radius: 5px;
  border: var(--line-secondary);
`;
