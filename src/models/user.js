import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsuarioSchema = new Schema({
    nome: {type: String, require: true},
    usuario: {type: String, require: true, lowercase: true, unique: true},
    email: {type: String, require: true},
    dataNascimento: {type: Date, require: true},
    passwordHash: {type: String, require: true},
    tipo: {type: Number, default: 0},
    alunos: [{
        idAluno: {type: String, require: false},
        ativo: {type: Number, default: 0},
    }],
    tutores: [{
        idTutor: {type: String, require: false},
        ativo: {type: Number, default: 0},
    }]
});

const User = model('Usuario', UsuarioSchema)

export default User;
