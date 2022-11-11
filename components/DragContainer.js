import styled from "styled-components";
import Draggable from "./Draggable";
export default function DragContainer({
  draglist,
  ondragstart,
  ondrop,
  onRightClick,
}) {
  return (
    <Container
      id="DraggableContainer"
      onDrop={ondrop}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      data-text="DRAG BACK HERE!"
    >
      {draglist.map((item) => (
        <Draggable
          key={item.id}
          id={item.id}
          draggable={true}
          ondragstart={ondragstart}
          handleRightClick={(event) => onRightClick(event, item.id)}
          backgroundColor={item.backgroundColor}
        >
          {item.text}
        </Draggable>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  position: relative;
  margin-bottom: 5px;
  width: 100%;
  height: 11rem;
  display: flex;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  &:empty:not(:focus):before {
    content: attr(data-text);
    opacity: 0.6;
    align-self: center;
    margin: 0 auto;
  }
`;
const ContainerList = styled.ul`
  display: flex;
  list-style: none;
  width: 100%;
  overflow-x: auto;
`;
