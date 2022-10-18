import styled from "styled-components";
import Image from "next/image";

export default function ArticleCard({ imageUrl }) {
  return (
    <StyledListItem>
      <Image src={imageUrl} width={600} height={400}></Image>
    </StyledListItem>
  );
}

const StyledListItem = styled.li`
  height: 400px;
`;
