import styled from "styled-components";
import { useRouter } from "next/router";
export default function content() {
  const router = useRouter();
  return (
    <StyledSection>
      <BackButton onClick={() => router.push("/")}>Back</BackButton>
      <StyledContent>your content will be displayed here</StyledContent>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  &:hover {
    cursor: pointer;
  }
`;

const StyledContent = styled.div`
  margin-top: 50px;
`;
