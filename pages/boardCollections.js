import DropBoard from "../components/DropBoard";
import { getAllDashBoards } from "../services/dashboardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
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
      <StyledIcon
        onClick={() => removeDashboard(dashboard.id)}
        icon={faTrashCan}
      />
    </Wrapper>
  ));
}

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0px;
  right: 48%;
  color: #757677;
  :hover {
    cursor:pointer;
  }
`;

const Wrapper = styled.section`
  position: relative;
`;
