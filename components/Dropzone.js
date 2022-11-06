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
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
  width: 100wv;
  height: 14rem;
  border: var(--line-secondary);
  padding: 10px;
  margin: 10px 0;
  &:empty:not(:focus):before {
    content: attr(data-text);
    opacity: 0.6;
    align-self: center;
    grid-column: 3;
  }
`;
