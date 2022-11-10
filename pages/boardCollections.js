import DropBoard from "../components/DropBoard";
import { getAllDashBoards } from "../services/dashboardService";
import { Icon } from "@iconify/react";
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
    <Wrapper>
      <DropBoard key={dashboard.id} board={dashboard.board}></DropBoard>
      <StyledIcon
        onClick={() => removeDashboard(dashboard.id)}
        icon="fluent:delete-20-regular"
        width={25}
      />
    </Wrapper>
  ));
}

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 10px;
  right: 0;
`;

const Wrapper = styled.section`
  position: relative;
`;
