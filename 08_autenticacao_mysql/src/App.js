import 'dotenv/config';
import express from 'express';
import { createUsuario, deleteUsuario, login, readUsuario, updateUsuario, verificaToken } from './controllers/UsuarioController.js';


const port = 3000;
const app = express();

app.use(express.json());

//CRUD
app.post('/usuario',verificaToken,createUsuario);
app.get('/usuario',verificaToken,readUsuario);
app.put('/usuario/:id_usuario',verificaToken,updateUsuario);
app.delete('/usuario/:id_usuario',verificaToken,deleteUsuario);

app.post('/login/',login);

//app.get('/verifica/',verificaToken);

app.listen(port,()=>{
    console.log(`API Funcionando porta ${port}`)
});