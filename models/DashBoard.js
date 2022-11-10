import mongoose from "mongoose";
const { Schema } = mongoose;

const dashboardSchema = new Schema({
  board: { type: Array, required: true },
});

const DashBoard =
  mongoose.models.DashBoard || mongoose.model("DashBoard", dashboardSchema);

export default DashBoard;
