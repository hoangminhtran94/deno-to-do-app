import { model, Schema } from "npm:mongoose@^6.7";
const TodoSchema = new Schema({
  id: { type: String },
  text: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
TodoSchema.path("text").required(true, "Description is required");

export default model("TodoEntity", TodoSchema);
