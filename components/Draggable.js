import styled from "styled-components";
import { useState } from "react";
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

const DragBox = styled.span`
  padding: 10px;
  margin-right: 10px;
  width: 11rem;
  height: 12rem;
  box-shadow: 1px 2px 3px 4px rgba(20, 20, 20, 0.4);
  text-overflow: clip;
  overflow: hidden;
  resize: horizontal;
  background: ${({ color }) => color}
  }
`;
