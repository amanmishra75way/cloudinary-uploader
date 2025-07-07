import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: String,
  url: String,
  public_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose;
