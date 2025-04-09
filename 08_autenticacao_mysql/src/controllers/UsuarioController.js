import { criandoUsuario } from "../models/UsuarioModel.js";

export const createUsuario = async (req,res)=>{
    console.log("UsuarioController :: createUsuario");
    const {nome, usuario, senha, tipo} = req.body;

    try {
        const [status,resposta] = await criandoUsuario(nome, usuario, senha, tipo);
        return res.status(status).json(resposta);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "erro ao criar usuario" });
    }
}