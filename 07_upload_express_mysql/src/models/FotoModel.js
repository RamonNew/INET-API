import db from "../conexao.js";
import mysql from "mysql2/promise";

//Criando pool com database inet
const conexao = mysql.createPool(db);

//Criando foto
export const criandoFoto = async (caminho, alternativo) => {
  console.log("FotoModel :: criandoFoto");

  //SQL de Inserção
  const sql = `INSERT INTO
                    fotos (caminho,alternativo)
                    VALUES (?,?)
                `;

  const params = [caminho, alternativo];

  try {
    const [resposta] = await conexao.query(sql, params);
    return [201, { mensagem: "Foto cadastrada" }];
  } catch (error) {
    return [
      500,{
        mensagem: "Erro Servidor", 
        code: error.code,
        sql: error.sqlMessage },
    ];
  }
};
