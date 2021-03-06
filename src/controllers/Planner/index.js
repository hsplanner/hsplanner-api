import Planner from "../../models/planner.js";

export const getAll = async (req, res) => {
  try {
    const planners =  await Planner.find({status: 0})
    return res.json(planners)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getOne = async(req, res) => {
  try {
    const {id} = req.params;
    console.log('id', id)
    const planner =  await Planner.findById(id)
    return res.json(planner)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const getAllUser = async(req, res) => {
  try {
    const {userId} = req.params;
    const planner =  await Planner.find({'userId': userId})
    return res.json(planner)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const store = async (req, res) => { 
  try {
    const { title, description, status, userId} = req.body;
    const planner = new Planner({
      title, description, status, userId
    })
    if(title && description && userId){
      planner.save();
      return res.json(planner)
    }
    else{
      return res.status(400).json({ message: "Dados incompletos" })
    }
  } catch (error) {
    return res.status(400).send(error.message)
  }
}

export const update = async (req, res) => {
  const { body } = req;
  const { _id } = body;

  await Planner.findByIdAndUpdate(_id, body).then(x => {
    res.status(200).send({
        message: 'Planner atualizado com sucesso!'
    });
  }).catch(e => {
    res.status(400).send({
        message: 'Falha ao atualizar o Planner =(', data: e
    });
  });
};
