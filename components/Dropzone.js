import styled from "styled-components";

export default function Dropzone({ id, ondragover, ondrop, children }) {
  return (
    <DropArea
      data-text="DROP HERE!"
      id={id}
      onDragOver={ondragover}
      onDrop={ondrop}
    >
      {children}
    </DropArea>
  );
}

const DropArea = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  gap: 10px;
  width: 100%;
  height: 35rem;
  --border: 3px solid var(--line-color);
  box-shadow: inset 0 0 10px #757677;
  padding: 25px 0;
  margin: 10px 0;
  &:empty:not(:focus):before {
    content: attr(data-text);
    opacity: 0.6;
    grid-row: 2;
    align-self: center;
    justify-self: end;
  }
`;
