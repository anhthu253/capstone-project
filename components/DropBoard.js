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
  width: 8rem;
  height: 10rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  text-overflow: clip;
  overflow: hidden;
  resize: horizontal;
  background-color: ${({ background }) => background}
  }
`;

const Board = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  height: 35rem;
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
