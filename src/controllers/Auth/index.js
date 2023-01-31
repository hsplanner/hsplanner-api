import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../../models/user.js";

export const login = async (req, res) => {
    try{
        const {username, passwordHash} = req.body;
        const user = await User.findOne({'usuario': username })
        if (!user) {
            return res.status(400).json({ message: "Usuário não existe" })
        }

        const passwordValid = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!passwordValid) {
            return res.status(400).json({ message: "Usuário ou senha incorreta" })
        }

        const token = jwt.sign({
            id: user._id,
            username: user.usuario,
            name: user.nome,
            email: user.email,
            birthdate: user.dataNascimento,
            userType: user.tipo
        }, 
        "hsplanner" ,
        {
        expiresIn: "5d"
        }); 

        return res.json({
                            id: user._id,
                            username: user.usuario,
                            name: user.nome,
                            email: user.email,
                            birthdate: user.dataNascimento,
                            userType: user.tipo,
                            token
                            })
    }
    catch (err) {
        return res.status(400).send(err.message)
    }
}
