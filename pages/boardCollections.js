import DropBoard from "../components/DropBoard";
import { getAllDashBoards } from "../services/dashboardService";
import styled from "styled-components";
import { useState } from "react";

export async function getServerSideProps() {
  const allDashBoards = await getAllDashBoards();

  return {
    props: {
      allDashBoards,
    },
  };
}

export default function BoardCollections({ allDashBoards }) {
  const [dashboards, setDashboards] = useState(allDashBoards);
  async function removeDashboard(id) {
    try {
      await fetch(`/api/dashboard/${id}`, {
        method: "DELETE",
      });
      reloadDashboards();
    } catch (error) {
      console.error(error);
    }
  }
  async function reloadDashboards() {
    try {
      const response = await fetch(`/api/dashboard`);
      const updatedDashboards = await response.json();
      setDashboards(updatedDashboards);
    } catch (error) {
      console.error(error);
    }
  }
  return dashboards.map((dashboard) => (
    <Wrapper key={dashboard.id}>
      <DropBoard key={dashboard.id} board={dashboard.board}></DropBoard>
      <SaveButton
        onClick={() => removeDashboard(dashboard.id)}
      >x</SaveButton>
    </Wrapper>
  ));
}

const SaveButton = styled.button`
 position:relative;
 top:-1.6rem;
 left:calc(50% - 16px);
  width:30px;
  height:30px;
  border:none;
  border-radius:50%;
  box-shadow: 5px 5px 10px 0px #575E5F;
  :hover {
    cursor:pointer;
  }
`

const Wrapper = styled.section`
  position: relative;
  margin:20px;
`;
