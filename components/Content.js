import styled from "styled-components";
import Button from "./Button";

export default function Content({ text, goBack }) {
  return (
    <section>
      <Button onClickEvent={goBack}>Back</Button>
      <StyledContent>{text}</StyledContent>
    </section>
  );
}

const StyledContent = styled.div`
  margin-top: 1rem;
`;
