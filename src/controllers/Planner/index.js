import Planner from "../../models/planner.js";

export const getAll = async (req, res) => {
  try {
    const planners =  await Planner.find()
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

export const store = async (req, res) => { 
  try {
    const { name } = req.body;
    const planner = new Planner({
      name
    })
    planner.save();
    return res.json(planner)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}
