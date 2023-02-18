import styled from "styled-components";
export default function Draggable({
  id,
  articleID,
  draggable,
  ondragstart,
  children,
  handleRightClick,
  backgroundColor,
}) {
  return (
    <>
      <DragBox
        id={id}
        data-articleid={articleID}
        draggable={draggable}
        onDragStart={ondragstart}
        onDrop={(event) => event.preventDefault()}
        onContextMenu={handleRightClick}
        color={backgroundColor}
      >
        {children}
      </DragBox>
    </>
  );
}

const DragBox = styled.li`
  padding: 5px;
  margin-right: 10px;
  list-style: none;
  flex: 0 0 8rem;
  width:8rem;
  height: 10rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  text-overflow:clip;
  overflow-y:auto;
  overflow-x:hidden;
  background-color: ${({ color }) => color};
  }
`;
