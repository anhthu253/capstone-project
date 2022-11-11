import styled from "styled-components";
export default function Draggable({
  id,
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
  margin-right: 5px;
  list-style: none;
  flex: 0 0 10rem;
  width:10rem;
  height: 10rem;
  border:var(--line-secondary);
  --box-shadow: 1px 2px 3px 4px rgba(20, 20, 20, 0.4);
  text-overflow:clip;
  overflow-y:auto;
  overflow-x:hidden;
  background-color: ${({ color }) => color}
  }
`;
