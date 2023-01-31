import User from "../../models/user.js";
import bcrypt from 'bcrypt';

export const create = async (req, res) => { 
    try {
      console.log("chegouSIgnUp")
      const { name, username, email, birthdate, passwordHash, userType, idTutor} = req.body;
      
      const existUsername =  await User.findOne({'usuario': username})
      if(existUsername){
        return res.status(400).json({
          success: false,
          message: "Nome de usuário já está sendo utilizado."
        })
      }      
      const existEmail = await User.findOne({'email': email})
      if(existEmail){
          return res.status(400).json({
              success: false,
              message: "E-mail já está sendo utilizado."
            })   
      }     
      
      if(userType === 1){      
        if(idTutor != "" && idTutor != null){
          const tutor = await User.findOne({'_id': idTutor})
          if(tutor.tipo != 0){
            return res.status(400).json({
              success: false,
              message: "Este usuário não possui perfil para a ação."
            }) 
          }
        }
        else{
          return res.status(400).json({
            success: false,
            message: "Necessário um tutor para cadastrar este usuário."
          }) 
        }
     }
      
      const salt = bcrypt.genSaltSync(10);
      const cryptpassword = bcrypt.hashSync(passwordHash, salt);
      const user = new User({
        nome: name, usuario: username, email, dataNascimento: birthdate,
        passwordHash: cryptpassword, tipo: userType, idTutor
      })
      user.save();
      console.log("Salvou no DB")
      return res.json({
        name: user.nome, 
        username: user.usuario, 
        email: user.email, 
        birthdate: user.dataNascimento, 
        userType: user.tipo, 
        idTutor: user.idTutor
      })
    } catch (error) {
      console.log("error", error)
      return res.status(400).send(error.message)
    }
}

export const getAll = async (req, res) => {
    try {
      const users =  await User.find({})
      return res.json(users)
    } catch (error) {
      return res.status(400).send(error.message)
    }
}

export const getAllStudentOfTutor = async (req, res) => {
  try {
    const {idTutor} = req.params;
    const users =  await User.find({'idTutor': idTutor})
    return res.json(users)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getOneUsername = async(req, res) => {
    try {
        const {username} = req.params;
        const user =  await User.findOne({'usuario': username})
        return res.json({
          name: user.nome, 
          username: user.usuario, 
          email: user.email, 
          birthdate: user.dataNascimento, 
          userType: user.tipo, 
          idTutor: user.idTutor
        })
    } catch (err) {
        return res.status(400).send(err.message)
    }
}



