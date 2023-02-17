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

export const postCopyPlanner = async (req, res) => {
  try {
    const { plannerId } = req.params;
    const { idTutor, idAluno } = req.body;
    const planner = await Planner.findById(plannerId); 
    const newPlanner = new Planner({
      titulo: planner.titulo, descricao: planner.descricao, 
      status: 1, idAluno, idTutor, atividades: planner.atividades
    })
    if(planner.titulo != null && planner.descricao != null){
      newPlanner.save();
      return res.json({
        title: newPlanner.titulo,
        description: newPlanner.descricao,
        status: newPlanner.status,
        idTutor: newPlanner.idTutor,
        idAluno: newPlanner.idAluno,
        events: newPlanner.atividades
      })
    }
    else{
      return res.status(400).json({ message: "Dados incompletos" })
    }
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export const updateEvent = async (req, res) => {
  try {
    const { plannerId } = req.params;
    const { description, color, startDate, endDate, eventId} = req.body;

    const planner = await Planner.findById(plannerId);
    const events = planner.atividades;
    var eventUpdate;
    events.forEach(event => {
      if(event._id.toString() == eventId){
        eventUpdate = event;
      }
    });

    if(eventUpdate != null && eventUpdate != undefined){
      const newDescription = description != undefined && description != "" ? description : eventUpdate.descricao;
      const newColor = color != undefined && color != "" ? color : eventUpdate.cor;
      const newStartDate = startDate != undefined && startDate != "" ? startDate : eventUpdate.dtInicio;
      const newEndDate = endDate != undefined && endDate != "" ? endDate : eventUpdate.dtFim;
  
      await Planner.updateOne(
        {
          "_id": plannerId,
          "atividades._id": eventId
        }, {
        $set:
          {
            "atividades.$.descricao": newDescription,
            "atividades.$.cor": newColor,
            "atividades.$.dtInicio": newStartDate,
            "atividades.$.dtFim": newEndDate 
          } 
      })
      return res.json({ message: "Dados Atualizados com sucesso" })
    }
    else{
      return res.status(400).json({message: "Atividade não encontrada"});
    }

  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export const updatePlanner = async (req, res) => {
  try {
    const { plannerId } = req.params;
    const { title, description, status} = req.body;

    const planner = await Planner.findById(plannerId);
    const newTitle = title != undefined && title != "" ? title : planner.titulo;
    const newDescription = description != undefined && description != "" ? description : planner.descricao;
    const newStatus = status != undefined && status != "" ? status : planner.status;

    await Planner.updateOne(
      {
        "_id": plannerId,
      }, {
      $set:
        {
          "titulo": newTitle,
          "descricao": newDescription,
          "status": newStatus 
        } 
    })
    return res.json({ message: "Dados Atualizados com sucesso" })

  } catch (err) {
    return res.status(400).send(err.message)
  }
  
}
