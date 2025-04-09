import express from 'express';
import { createUsuario } from './controllers/UsuarioController.js';

const port = 3000;
const app = express();

app.use(express.json());

//CRUD
app.post('/usuario',createUsuario);

app.listen(port,()=>{
    console.log(`API Funcionando porta ${port}`)
});