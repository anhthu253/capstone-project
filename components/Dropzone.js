import styled from "styled-components";

export default function Dropzone({ id, ondragover, ondrop }) {
  return (
    <DropArea
      data-text="DROP HERE!"
      id={id}
      onDragOver={ondragover}
      onDrop={ondrop}
    > 
    </DropArea>
  );
}

const DropArea = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  
  @media screen and (min-width:481px){
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media screen and (min-width:769px){
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  @media screen and (min-width:1025px){
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
  @media screen and (min-width:1281px){
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
  gap: 10px;
  width: 100%;
  min-height: 35rem;
  box-shadow: inset 0 0 20px #2c332c;
  padding: 25px 0 25px 16px;
  margin: 10px 0;
  &:empty:not(:focus)::before {
    content: attr(data-text);
    color:white;
    opacity: 0.5;
    position:absolute;
    top:calc(50% - 5px);
    left:calc(50% - 45px);
    align-self: center;
    justify-self: end;
  }
`;

 