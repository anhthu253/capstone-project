import dbConnect from "../../../lib/dbConnect";
import DashBoard from "../../../models/DashBoard";

export default async function handler(request, response) {
  const { id } = request.query;
  await dbConnect();

  if (request.method === "DELETE") {
    await DashBoard.findByIdAndDelete(id);
    return response
      .status(200)
      .json({ message: "Dashboard deleted", deletedId: id });
  }
  return response.status(405).json({ message: "HTTP method is not allowed" });
}
