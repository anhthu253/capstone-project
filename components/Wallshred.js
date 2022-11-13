import Image from "next/image";
import styled from "styled-components";
export default function WallShred() {
  return (
    <StyledWallShred>
      <Image
        src="/images/wallstripe.png"
        width={3000}
        height={2000}
        alt="Deko"
      />
    </StyledWallShred>
  );
}

const StyledWallShred = styled.section`
  margin-left: -30rem;
  margin-top: -8rem;
`;
