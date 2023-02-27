import styled from "styled-components";
import Image from "next/image";
export default function ComponentItem({
  children,
  description,
  removeCollection,
  onCollection,
  removable,
}) {
  return (
    <StyledColItem>
      <StyledSpan data-description={description} onClick={onCollection}>{children}</StyledSpan>
      {removable && (
        <Image
          src="/images/delete.png"
          width="18"
          height="18"
          onClick={removeCollection}
          alt="remove"
        ></Image>
      )}
    </StyledColItem>
  );
}

const StyledColItem = styled.li`
  display: flex;
  justify-content: space-between;
  background: #e8e8e9;
  font-family: "Manrope";
  font-size: 15px;
  padding: 10px;
  margin: 8px 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledSpan = styled.span`
  position:relative;
  &:hover:before{
    content:attr(data-description);
    position:absolute;
    top:24px;
    left:0;
    min-width:200px;
    height:auto;
    border:1px solid #aaaaaa;
    border-radius:10px;
    padding:10px;
    background:#EFEAC4;
    z-index:1000;
  }
`
