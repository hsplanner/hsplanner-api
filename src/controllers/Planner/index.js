import Planner from "../../models/planner.js";

export function getAll(req, res) {
  return res.json({msg: 'Get ALL'});
}

export function getOne(req, res) {
  return res.json({msg: 'Get ONE'});
}

export const store = async (req, res) => {

  const { name } = req.body;
  try {
    const planner = new Planner({
      name
    })
    planner.save();
    return res.json(planner)
  } catch (error) {
    return res.status(400).send(error.message)
  }

  console.log('body', body)

  return res.json({body});
}
