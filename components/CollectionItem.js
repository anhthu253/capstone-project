import styled from "styled-components";
import Image from "next/image";
export default function ComponentItem({
  children,
  removeCollection,
  onCollection,
  removable,
}) {
  return (
    <StyledColItem>
      <span onClick={onCollection}>{children}</span>
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
