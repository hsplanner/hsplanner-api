import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PlannerSchema = new Schema({
  title: {type: String, require: true},
  description: String,
  status: {type: Number, default: 1},
  userId: {type: String, require: true},
});

const Planner = model('Planner', PlannerSchema)

export default Planner;
