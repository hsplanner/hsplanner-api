import Planner from "../../models/planner.js";

export const getAll = async (req, res) => {
  try {
    const planners =  await Planner.find({status: 0})
    if(planners.length > 0){
      let arrayPlanners = []
      planners.forEach(planner => {
        let objPlanner = {
                          _id: planner.id,
                          title: planner.titulo,
                          description: planner.descricao,
                          status: planner.status,
                          idTutor: planner.idTutor,
                          idAluno: planner.idAluno,
                        }
        arrayPlanners.push(objPlanner)
      });
      return res.json(arrayPlanners)
    }
    else{
      res.status(200).send({
        message: 'Não existem planners públicos!'
      });    
    }
    
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getOne = async(req, res) => {
  try {
    const {id} = req.params;
    const planner =  await Planner.findById(id);
    const events = planner.atividades;
    let arrayEvents = []
    events.forEach(event => {
        let objEvent = {
                        _id: event.id,
                        description: event.descricao,
                        startDate: event.dtInicio,
                        endDate: event.dtFim,
                        color: event.cor
        };
        arrayEvents.push(objEvent);
    });
    return res.json({
      _id: planner.id,
      title: planner.titulo,
      description: planner.descricao,
      status: planner.status,
      idTutor: planner.idTutor,
      idAluno: planner.idAluno,
      events: arrayEvents
    })
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getAllUser = async(req, res) => {
  try {
    const {idUser} = req.params;
    const planners =  await Planner.find({$or: [{idTutor: idUser}, {idAluno: idUser}]});
    let arrayPlanners = []
    planners.forEach(planner => {
      let objPlanner = {
                        _id: planner.id,
                        title: planner.titulo,
                        description: planner.descricao,
                        status: planner.status,
                        idTutor: planner.idTutor,
                        idAluno: planner.idAluno,
                      }
      arrayPlanners.push(objPlanner)
    });
    return res.json(arrayPlanners)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const store = async (req, res) => { 
  try {
    const { title, description, status, idAluno, idTutor} = req.body;
    const planner = new Planner({
      titulo: title, descricao: description, status, idAluno, idTutor
    })
    if(title && description){
      planner.save();
      return res.json({
        title: planner.titulo,
        description: planner.descricao,
        status: planner.status,
        idTutor: planner.idTutor,
        idAluno: planner.idAluno,
        events: planner.atividades
      })
    }
    else{
      return res.status(400).json({ message: "Dados incompletos" })
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const update = async (req, res) => {
  const { description, startDate, endDate, color, plannerId } = req.body;

  const atividade = {
    descricao: description,
    dtInicio: startDate,
    dtFim: endDate,
    cor: color
  }

  await Planner.findOneAndUpdate({_id: plannerId}, {
    $push:
      {
        atividades: atividade
      } 
  }).then(x => {
    res.status(200).send({
        message: 'Planner atualizado com sucesso!'
    });
  }).catch(e => {
    res.status(400).send({
        message: 'Falha ao atualizar o Planner =(', data: e
    });
  });
};

export const deletEvent = async (req, res) => {
  try {
    const { plannerId, eventId } = req.body;
    const planner =  await Planner.findOneAndUpdate({_id: plannerId}, {
      $pull: {
        "atividades": {
          "_id": eventId
        }
      }
    }).then(x => {
    res.status(200).send({
        message: 'Planner atualizado com sucesso!'
    });
    }).catch(e => {
      res.status(400).send({
          message: 'Falha ao atualizar o Planner =(', data: e
      });
    });

  } catch (error) {
    return res.status(400).send(error.message)
  }
}
