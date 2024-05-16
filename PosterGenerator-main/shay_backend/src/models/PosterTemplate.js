import mongoose from "mongoose";

const posterTemplateSchema = new mongoose.Schema({
  template: {
    type: String,
    required: true,
  },
  posterName: {
    type: String,
 },
  })

const PosterTemplate = mongoose.model("posterTemplate", posterTemplateSchema);

export default PosterTemplate;

