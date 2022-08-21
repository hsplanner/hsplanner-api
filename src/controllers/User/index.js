import User from "../../models/user.js";
import bcrypt from 'bcrypt';

export const create = async (req, res) => { 
    try {
      console.log("chegouSIgnUp")
      const { name, username, email, birthdate, passwordHash, userType } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const cryptpassword = bcrypt.hashSync(passwordHash, salt);
      const user = new User({
        name, username, email, birthdate, passwordHash: cryptpassword, userType
      })
      user.save();
      console.log("Salvou no DB")
      return res.json(user)
    } catch (error) {
      console.log("error", error)
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
        const user =  await User.findOne({'username': username})
        return res.json(user)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}


