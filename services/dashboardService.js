import dbConnect from "../lib/dbConnect";
import DashBoard from "../models/DashBoard";

export async function getAllDashBoards() {
  await dbConnect();

  const dashboards = await DashBoard.find();

  const sanitizedDashboards = dashboards.map((dashboard) => ({
    id: dashboard.id,
    board: dashboard.board,
  }));

  return sanitizedDashboards;
}
