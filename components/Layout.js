import styled from "styled-components";
import Header from "./Header";
import Main from "./Main";
import NavigationBar from "./NavigationBar";
export default function Layout({ children }) {
  return (
    <StyledLayout>
      <Header />
      <NavigationLayout></NavigationLayout>
      <MainLayout>{children}</MainLayout>
    </StyledLayout>
  );
}

const StyledLayout = styled.section`
  display: grid;
  width: 100%;
  padding: 3rem;
  grid-template-rows: 1fr 2rem;
  gap: 10px;
`;

const HeaderLayout = styled(Header)`
  grid-row: 1;
`;

const NavigationLayout = styled(NavigationBar)`
  grid-row: 2;
`;

const MainLayout = styled(Main)`
  grid-row: 3;
`;
