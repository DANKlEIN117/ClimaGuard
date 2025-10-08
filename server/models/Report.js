import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  name: String,
  location: String,
  issue: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Report", reportSchema);
