import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PlannerSchema = new Schema({
  titulo: {type: String, require: true},
  descricao: String,
  status: {type: Number, default: 1},
  idTutor: {type: String, require: true},
  idAluno: {type: String, require: false},
  atividades: [
    {
    descricao: {type: String},
    dtInicio: {type: Date},
    dtFim: {type: Date},
    horasPlanejadas: {type: String},
    horasExecutadas: {type: String},
    cor: {type: String},
    }
  ]
});

const Planner = model('Planejamento', PlannerSchema)

export default Planner;
