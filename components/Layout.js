import styled from "styled-components";
import Header from "./Header";
import NavigationBar from "./NavigationBar";
import WallShred from "./Wallshred";

export default function Layout({ children }) {
  return (
    <>
      <WallShred />
      <StyledLayout>
        <Header />
        <NavigationBar></NavigationBar>
        <Main>{children}</Main>
      </StyledLayout>
    </>
  );
}

const StyledLayout = styled.section`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  gap: 10px;
`;

const StyledWallShred = styled(WallShred)`
  position: absolute;
  top: 0;
`;

const Main = styled.main`
  margin-top: 40px;
  width: 100%;
  overflow: hidden;
`;
