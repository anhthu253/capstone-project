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
        icon="clarity:remove-line"
        onClick={removeCollection}
      />
    </StyledColItem>
  );
}

const StyledColItem = styled.li`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const StyledIcon = styled(Icon)`
  display: ${({ visible }) => (visible ? "block" : "none")};
`;
