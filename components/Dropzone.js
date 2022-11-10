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
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  width: 100%;
  height: 30rem;
  border: var(--line-secondary);
  padding: 10px;
  margin: 10px 0;
  &:empty:not(:focus):before {
    content: attr(data-text);
    opacity: 0.6;
    grid-row: 2;
    grid-column: 3;
  }
`;
