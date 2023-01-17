import styled from "styled-components";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

export default function Layout({ children }) {
  return (
    <>
      <StyledWallShred src="/images/wallstripe-crop.png"></StyledWallShred>
      <StyledLayout>
        <Header />       
        <NavigationBar/>
        <Main>{children}</Main>
      </StyledLayout>
    </>
  );
}

const StyledWallShred = styled.img`
  position:absolute;
  top:0;
  width:100%;
  height:300px;
  object-fit:fill;
  object-position:0 -120px;
`
const StyledLayout = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px;
  gap: 10px;
`;

const Main = styled.main`
  margin-top: 30px;
  width: 100%;
  overflow: hidden;
`;
