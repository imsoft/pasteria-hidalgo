import mongoose, { Model, Schema } from "mongoose";

export interface IEntry {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const entrySchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const EntryModel: Model<IEntry> =
  mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default EntryModel;
