import styled from "styled-components";
import Button from "./Button";
export default function CollectionForm({ editMode, setEditMode, onSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledDiv>
        <StyledInput name="name" id="name" placeholder="Name" />
        <StyledTextArea
          rows="3"
          name="description"
          id="description"
          placeholder="Description"
        />
      </StyledDiv>
      <ButtonContainer>
        <Button
          onClick={() => {
            setEditMode(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Create</Button>
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
  outline: 0;
  border-width: 0;
  border-bottom: var(--line-secondary);
  height: 30px;
  background: transparent;
`;

const StyledTextArea = styled.textarea`
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
  margin: 10px 0;
`;
