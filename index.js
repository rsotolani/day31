//arquivo principal
import express from "express";
import * as dotenv from "dotenv";
import { uuid } from "uuidv4";

//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instancia a variável que vai ficar responsável pelo nosso servidor
const app = express();

const processos = [
  { 
    _id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29", 
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento", 
    details: "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack", 
    dateInit: "28/11/2022", 
    comments: ["Processo aberto", "Processo partiu para as partes assinarem", "Processo agora está em análise final", "Processo já tem data final"], 
    dateEnd: "16/12/2022", 
    setor: "enap" 
  }, 
  { 
    _id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173", 
    documentName: "Licitação Compras - Notebooks", 
    status: "Em andamento", 
    details: "Processo de licitação para compra de notebooks", 
    dateInit: "30/11/2022", 
    comments: ["Processo em aberto e sem previsão de conclusão"], 
    dateEnd: "", 
    setor: "tre" 
  }, 
  { 
    _id: "ec68dbb0-1880-4fb9-91d7-cdd0cb42d4eb", 
    documentName: "Licitação Compras - Ar Condicionado", 
    status: "Finalizado", 
    details: "Processo de licitação para compra de ar-condicionado", 
    dateInit: "15/11/2022", 
    comments: ["Processo em aberto", "Processo finalizado"], 
    dateEnd: "25/11/2022", 
    setor: "trj" 
  }
]

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json());

//criação das rotas

//rota para home /
app.get("/", (req, res) => {
  //req -> request -> requisição que vem do cliente
  //res -> response -> resposta para o cliente

  const bemVindo = "Bem-vindo ao servidor da Ironhack ENAP - turma 92";

  //retorna uma resposta com status de 200 e um json
  return res.status(200).json({ msg: bemVindo, turma: "92 web dev" });
})

//Acessar todos os processos
app.get("/all", (req, res) => {
  console.log(processos);
  return res.status(200).json(processos);
});

//POST - create
app.post("/create", (req, res) => {
  console.log(req.body);

  const form = req.body

  processos.push({ ...form, _id: uuid()});

  return res.status(201).json(processos);
})

//DELETE - delete user
app.delete("/delete/:id", (req, res) => {
  console.log("delete id=",req.params._id); //req.params -> { }por isso ele pode ser descontruido
  const { id } = req.params;

  const deleteProc = processos.find((proc) => proc._id === id)
  const index = processos.indexOf(deleteProc);

  processos.splice(index, 1); //eliminar a partir do elemento do index, uma vez

  console.table(processos);
  return res.status(200).json(processos);
});

//EDIT
app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const form = req.body;

  const updateProc = processos.find((proc) => proc._id === id);
  const index = processos.indexOf(updateProc);

  if (form.documentName) updateProc.documentName = form.documentName;
  if (form.status) updateProc.status = form.status;
  if (form.details) updateProc.details = form.details;
  if (form.dateInit) updateProc.dateInit = form.dateInit;
  if (form.comments) updateProc.comments = form.comments;
  if (form.dateEnd) updateProc.dateEnd = form.dateEnd;
  if (form.setor) updateProc.setor = form.setor;

  console.log(updateProc);

  console.log(processos);

  // res.send(
  //   `Processo ${id} de nome ${updateProc.documentName} atualizado com sucesso`
  // )
  return res.status(200).json(processos);
});


//Acessar um processo pelo ID GET /process/:id
app.get("/process/:id", (req, res) => {
  const { id } = req.params;

  const processId = processos.find((proc) => proc._id === id);
  console.log(processId);
  return res.status(200).json(processId);
});

//Adicionar um comentário a array de comentários PUT /addComment/:id


//Acessar todos processos em andamento GET /status/open


//Acessar todos processos finalizados GET /status/close



//FINAL DO ARQUIVO
//subindo o servidor 
app.listen(8080, () => {
    console.log(
        `App up and running on port http://localhost:${process.env.PORT}`
    );
});