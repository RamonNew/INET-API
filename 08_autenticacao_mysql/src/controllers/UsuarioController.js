import {
  atualizarUsuario,
  criandoUsuario,
  deletarUsuario,
  mostrandoUsuarios,
  vericarUsuarioSenha,
} from "../models/UsuarioModel.js";

import jwt from "jsonwebtoken";

//const secret = "@jujuba27";

const secret = process.env.SECRET_KEY;
console.log(secret)
export const createUsuario = async (req, res) => {
  console.log("UsuarioController :: createUsuario");
  const { nome, usuario, senha, tipo } = req.body;

  try {
    const [status, resposta] = await criandoUsuario(nome, usuario, senha, tipo);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao criar usuario" });
  }
};

export const readUsuario = async (req, res) => {
  console.log("UsuarioController :: readUsuario");
  try {
    const [status, resposta] = await mostrandoUsuarios();
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao criar usuario" });
  }
};

export const updateUsuario = async (req, res) => {
  console.log("UsuarioController :: updateUsuario");
  const { nome, usuario, senha, tipo } = req.body;
  const { id_usuario } = req.params;
  try {
    const [status, resposta] = await atualizarUsuario(
      nome,
      usuario,
      senha,
      tipo,
      id_usuario
    );
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao atualizar usuario" });
  }
};

export const deleteUsuario = async (req, res) => {
  console.log("UsuarioController :: deleteUsuario");
  const { id_usuario } = req.params;
  try {
    const [status, resposta] = await deletarUsuario(id_usuario);
    return res.status(status).json(resposta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao deletar usuario" });
  }
};

export const login = async (req, res) => {
  console.log("UsuarioController :: login");
  const { usuario, senha } = req.body;

  try {
    const [status, resposta] = await vericarUsuarioSenha(usuario, senha);
    //Cria um token com o id e o expiresIn informa o tempo de validade
    const token = jwt.sign({ id_usuario: resposta.id_usuario }, secret, {
      expiresIn: 20,
    });
    return res.status(status).json({token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "erro ao logar" });
  }
};

//exemplo exemplo do uso de uma rota autenticada
export const verificaToken = (req,res,next) =>{
  const token = req.headers['x-access-token'];
  jwt.verify(token,secret, (error,decoded)=>{
    if (!error){
      //return res.status(200).json(decoded);
      next()
    }else{
      return res.status(401).json(error);
    }
  });
}