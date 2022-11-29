//arquivo principal
import express from "express";
import * as dotenv from "dotenv";
import roteador from "./routes/processo.routes.js";

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instancia a variável que vai ficar responsável pelo nosso servidor
const app = express();

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json());

app.use("/proc", roteador);




//FINAL DO ARQUIVO
//subindo o servidor 
app.listen(8080, () => {
  console.log(
      `App up and running on port http://localhost:${process.env.PORT}`
  );
});