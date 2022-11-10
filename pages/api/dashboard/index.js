import dbConnect from "../../../lib/dbConnect";
import DashBoard from "../../../models/DashBoard";

export default async function handler(request, response) {
  await dbConnect();
  switch (request.method) {
    case "POST":
      const dashboard = JSON.parse(request.body);
      const newDashBoard = await DashBoard.create(dashboard);
      return response.status(201).json({
        message: "dashboard created",
        createdId: newDashBoard.id,
      });
  }
  return response.status(405).json({ message: "HTTP method is not allowed" });
}
