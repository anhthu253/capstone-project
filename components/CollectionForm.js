import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
export default function CollectionForm({ editMode, setEditMode, onSubmit }) {
  const CHARACTERLIMIT = 40;
  const [exceededLimit, setExceededLimit] = useState(false)
  const [description, setDescription] = useState('')
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledDiv>
        <StyledInput name="name" id="name" placeholder="Name" required />
        <StyledTextArea
          rows="3"
          name="description"
          id="description"
          placeholder="Description"
          value={description}
          onInput={event => {
            setDescription(event.target.value.length > CHARACTERLIMIT?event.target.value.slice(0,CHARACTERLIMIT):event.target.value)
            setExceededLimit(event.target.value.length > CHARACTERLIMIT?true:false)
          }}
        />
      </StyledDiv>
      {exceededLimit && <Warning>Maximal {CHARACTERLIMIT} characters are allowed</Warning>}
      <ButtonContainer>
        <StyledButton
          onClick={() => {
            setEditMode(false);
          }}
        >
          Cancel
        </StyledButton>
        <StyledButton type="submit">Create</StyledButton>
      </ButtonContainer>
    </StyledForm>
  );
}
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
`;

const StyledDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  margin: 10px 0;
`;

const StyledInput = styled.input`
  font-family: "Manrope";
  outline: 0;
  border-width: 0;
  border-bottom: var(--line-secondary);
  height: 30px;
  background: transparent;
`;

const Warning = styled.span`
  font-style:italic;
  font-size:12px;
  color:#4169CA;
`
const StyledTextArea = styled.textarea`
  font-family: "Manrope";
  outline: 0;
  border-width: 0;
  border-bottom: var(--line-secondary);
  height: 30px;
  background: transparent;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  gap: 10px;
  margin: 20px 0;
`;

const StyledButton = styled(Button)`
  background-color: #2b2626;
  color: #f3f3f3;
  font-family: "Special Elite";
  border-radius: 2px;
  box-shadow:0 4px 4px 0 #F3F3F3
  padding: 15px;
  margin: 10px 0;
`;
