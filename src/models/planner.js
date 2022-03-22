import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PlannerSchema = new Schema({
  name: String
});

const Planner = model('Planner', PlannerSchema)

export default Planner;
