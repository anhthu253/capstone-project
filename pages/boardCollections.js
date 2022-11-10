import DropBoard from "../components/DropBoard";
import { getAllDashBoards } from "../services/dashboardService";

export async function getServerSideProps() {
  const allDashBoards = await getAllDashBoards();

  return {
    props: {
      allDashBoards,
    },
  };
}

export default function BoardCollections({ allDashBoards }) {
  return allDashBoards.map((dashboard) => (
    <DropBoard key={dashboard.id} board={dashboard.board}></DropBoard>
  ));
}
