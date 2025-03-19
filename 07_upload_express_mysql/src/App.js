import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import url from 'url';
import { createFoto } from './controllers/FotoController.js';

const port = 3000;
const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Habilitando uso do JSON importante pois permite o uso JSON
app.use(express.json());

//Habilitando upload de arquivos
app.use(fileUpload())

app.use('/public/img',express.static(path.join(__dirname,'..','public','img')));

app.get('/',(req,res)=>{
    res.status(200).json({mensagem:'API Funcionando'})
});

app.post('/foto',createFoto);

app.listen(port,()=>{
    console.log(`API Funcionando ${port}`);
})