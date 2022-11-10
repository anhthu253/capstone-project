import styled from "styled-components";

export default function DropBoard({ board }) {
  return (
    <Board>
      {board.map((item) => (
        <Box key={item.id} background={item.color}>
          {item.text}
        </Box>
      ))}
    </Board>
  );
}

const Box = styled.span`
  padding: 10px;
  margin-right: 10px;
  width: 11rem;
  height: 12rem;
  box-shadow: 1px 2px 3px 4px rgba(20, 20, 20, 0.4);
  text-overflow: clip;
  overflow: hidden;
  resize: horizontal;
  background-color: ${({ background }) => background}
  }
`;

const Board = styled.section`
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
