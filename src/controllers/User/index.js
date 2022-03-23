import User from "../../models/user.js";

export const create = async (req, res) => { 
    try {
      const { name, username, email, birthdate, passwordHash, userType } = req.body;
       const user = new User({
        name, username, email, birthdate, passwordHash, userType
      })
      user.save();
      return res.json(user)
    } catch (error) {
      return res.status(400).send(error.message)
    }
}

export const getAll = async (req, res) => {
    try {
      const users =  await User.find()
      return res.json(users)
    } catch (error) {
      return res.status(400).send(error.message)
    }
}

export const getOneUsername = async(req, res) => {
    try {
        const {username} = req.params;
        const user =  await User.find({'username': username})
        return res.json(user)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}


