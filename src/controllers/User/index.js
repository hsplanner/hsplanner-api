import User from "../../models/user.js";
import bcrypt from 'bcrypt';

export const create = async (req, res) => { 
    try {
      const { name, username, email, birthdate, passwordHash, userType, idTutor} = req.body;
      var flagTutor = false;
      var user;
      var tutor;
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
          tutor = await User.findOne({'_id': idTutor})
          if(tutor.tipo != 0){
            return res.status(400).json({
              success: false,
              message: "Este usuário não possui perfil para a ação."
            }) 
          }
          else{
            flagTutor = true
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
      const tutores = {
        idTutor: idTutor,
        ativo: 1
      }
      if(!tutor){
        user = new User({
          nome: name, usuario: username, email, dataNascimento: birthdate,
          passwordHash: cryptpassword, tipo: userType
        })
      }
      else{
        user = new User({
          nome: name, usuario: username, email, dataNascimento: birthdate,
          passwordHash: cryptpassword, tipo: userType, tutores: tutores
        })
      }
      
      user.save();
      if(flagTutor){
        const alunos = {
          idAluno: user._id.toString(),
          ativo: 1
        }
        await User.findOneAndUpdate({_id: idTutor}, {
          $push:
            {
              alunos: alunos
            } 
        }).then(x => {
          res.status(200).send({
              name: user.nome, 
              username: user.usuario, 
              email: user.email, 
              birthdate: user.dataNascimento, 
              userType: user.tipo, 
          });
        }).catch(e => {
          res.status(400).send({
              message: 'Falha ao atualizar o Planner =(', data: e
          });
        });
      }
      console.log("Salvou no DB")
      return res.json({
        name: user.nome, 
        username: user.usuario, 
        email: user.email, 
        birthdate: user.dataNascimento, 
        userType: user.tipo, 
      })
    } catch (error) {
      console.log("error", error)
      return res.status(400).send(error.message)
    }
}

export const getAll = async (req, res) => {
    try {
      const users =  await User.find({})
      let arrayUsers = []
      users.forEach(user => {
          let objUser = {
                        _id: user.id,
                        name: user.nome, 
                        username: user.usuario, 
                        email: user.email, 
                        birthdate: user.dataNascimento, 
                        userType: user.tipo, 
                        idTutor: user.idTutor,
                      };
          arrayUsers.push(objUser);
      });
      return res.json(arrayUsers)
    } catch (error) {
      return res.status(400).send(error.message)
    }
}

export const getAllStudentOfTutor = async (req, res) => {
  try {
    const {idTutor} = req.params;
    const tutor =  await User.findById(idTutor)
    const alunos = tutor.alunos
    let arrayUsers = []
    
    alunos.forEach(async (user) => {
        var aluno = await User.findById(user.idAluno);
        var objUser = {
          _id: aluno.id,
          name: aluno.nome, 
          username: aluno.usuario, 
          email: aluno.email, 
          birthdate: aluno.dataNascimento, 
          userType: aluno.tipo, 
          ativo: user.ativo
        };
        arrayUsers.push(objUser);
    });

    await sleep(2000);
    return res.json(arrayUsers)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getAllStudentOfTutorAtivos = async (req, res) => {
  try {
    const {idTutor} = req.params;
    const tutor =  await User.findById(idTutor)
    const alunos = tutor.alunos
    let arrayUsers = []
    
    alunos.forEach(async (user) => {
        var aluno = await User.findById(user.idAluno);
        if(user.ativo == 1){
          var objUser = {
            _id: aluno.id,
            name: aluno.nome, 
            username: aluno.usuario, 
            email: aluno.email, 
            birthdate: aluno.dataNascimento, 
            userType: aluno.tipo, 
            ativo: user.ativo
          };
          arrayUsers.push(objUser);
        }

    });

    await sleep(2000);
    return res.json(arrayUsers)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getStudentsByUsername = async (req, res) => {
  try {
    const {username} = req.params;
    const user =  await User.findOne({'usuario': username, 'tipo': 1})
    return res.json({
      _id: user.id,
      name: user.nome, 
      username: user.usuario, 
      email: user.email, 
      birthdate: user.dataNascimento, 
      userType: user.tipo, 
    })
  } catch (err) {
      return res.status(400).send(err.message)
  }
}

export const getOneUsername = async(req, res) => {
    try {
        const {username} = req.params;
        const user =  await User.findOne({'usuario': username})
        return res.json({
          _id: user.id,
          name: user.nome, 
          username: user.usuario, 
          email: user.email, 
          birthdate: user.dataNascimento, 
          userType: user.tipo, 
        })
    } catch (err) {
        return res.status(400).send(err.message)
    }
}

export const getOneId = async(req, res) => {
  try {
      const {id} = req.params;
      const user =  await User.findById(id)
      return res.json({
        _id: user.id,
        name: user.nome, 
        username: user.usuario, 
        email: user.email, 
        birthdate: user.dataNascimento, 
        userType: user.tipo, 
      })
  } catch (err) {
      return res.status(400).send(err.message)
  }
}


export const patchEstudentExist = async(req, res) => {
  try{
    const { username } = req.params;
    const { idTutor } = req.body;
    const tutor =  await User.findById(idTutor)
    const aluno = await User.findOne({usuario: username})
    var verifica = false
    const alunosOfTutor = tutor.alunos 
    alunosOfTutor.forEach( user => {
      if(user.idAluno == aluno._id.toString()){
          verifica = true;
      }
    });

    if(!verifica){
      if(tutor.tipo === 0 && aluno.tipo === 1){
        const tutores = {
          idTutor: idTutor,
          ativo: 0
        }
        const alunos = {
          idAluno: aluno._id.toString(),
          ativo: 0
        }
        console.log(alunos);
  
        await User.findOneAndUpdate({_id: idTutor}, {
          $push:
            {
              alunos: alunos
            } 
        })
  
        await User.findOneAndUpdate({_id: aluno._id}, {
          $push:
            {
              tutores: tutores
            } 
        })
  
        return res.json({
          message: "Aluno adicionado com sucesso" 
        })
      }
      else{
        return res.status(400).json({message: "Usuário inválido"})  
      }
    }
    else{
      return res.status(400).json({message: "Aluno já incluido para o Tutor!"})  

    }
    
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export const patchActivetStudentForTutor = async(req, res) => {
  try {
    const { idAluno, idTutor } = req.body;
    const tutor =  await User.findById(idTutor);
    const aluno = await User.findById(idAluno);
    const alunosOfTutor = tutor.alunos 
    alunosOfTutor.forEach( async (user) => {
      if(user.idAluno === aluno._id.toString()){
        if(tutor.tipo === 0 && aluno.tipo === 1){
  
          await User.updateOne(
            {
              "_id": idTutor,
              "alunos.idAluno": idAluno 
            }, {
            $set:
              {
                "alunos.$.ativo": 1 
              } 
          })
    
          await User.updateOne(
            {
              "_id": idAluno,
              "tutores.idTutor": idTutor 
            }, {
              $set:
              {
                "tutores.$.ativo": 1 
              } 
          })
    
          return res.json({
            message: "Tutor ativo com sucesso!" 
          })
        }
      }
    });
    
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export const getTutoresForStudents = async(req, res) => {
  try {
    const { idAluno } = req.params;
    const aluno =  await User.findById(idAluno);
    const tutores = aluno.tutores
    let arrayTutores = []

    if(tutores.length > 0 ){
      tutores.forEach(async (tutor) => {
        //if(tutor.ativo == 0){
          var buscaTutor = await User.findById(tutor.idTutor); 
          var objTutor = {
            name: buscaTutor.nome,
            username: buscaTutor.usuario,
            idTutor: tutor.idTutor,
            ativo: tutor.ativo, 
          };
          arrayTutores.push(objTutor);
        //}
      });
    }

    await sleep(1000);
    return res.json(arrayTutores)

  } catch (err) {
    return res.status(400).send(err.message)
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}





