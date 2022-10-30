import styled from "styled-components";
import { Icon } from "@iconify/react";
export default function ComponentItem({
  children,
  removeCollection,
  onCollection,
  removable,
}) {
  return (
    <StyledColItem>
      <span onClick={onCollection}>{children}</span>
      <StyledIcon
        visible={removable}
        icon="akar-icons:chat-remove"
        onClick={removeCollection}
      />
    </StyledColItem>
  );
}

const StyledColItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledIcon = styled(Icon)`
  display: ${({ visible }) => (visible ? "block" : "none")};
`;
