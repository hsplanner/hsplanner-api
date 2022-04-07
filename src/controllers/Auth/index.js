import bcrypt from 'bcrypt';
import User from "../../models/user.js";

export const login = async (req, res) => {
    try{
        const {username, passwordHash} = req.body;
        const user =  await User.findOne({'username': username})
        if (user.length === 0) {
            return res.status(400).json({ message: "Usuário não existe" })
        }
        console.log(user);
        const passwordValid = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!passwordValid) {
            return res.status(400).json({ message: "Usuário ou senha incorreta" })
        }

        return res.json(user)
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}