import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PlannerSchema = new Schema({
  title: {type: String, require: true},
  description: String,
  status: {type: Number, default: 1},
  userId: {type: String, require: true},
  events: [
    {
    description: {type: String},
    startDate: {type: Date},
    endDate: {type: Date},
    color: {type: String},
    }
  ]
});

const Planner = model('Planner', PlannerSchema)

export default Planner;
