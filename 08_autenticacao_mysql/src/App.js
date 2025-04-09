import express from 'express';
import { createUsuario, deleteUsuario, login, readUsuario, updateUsuario } from './controllers/UsuarioController.js';

const port = 3000;
const app = express();

app.use(express.json());

//CRUD
app.post('/usuario',createUsuario);
app.get('/usuario',readUsuario);
app.put('/usuario/:id_usuario',updateUsuario);
app.delete('/usuario/:id_usuario',deleteUsuario);

app.post('/login/',login);

app.listen(port,()=>{
    console.log(`API Funcionando porta ${port}`)
});