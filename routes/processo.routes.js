import express from "express";
import ProcModel from "../model/proc.model.js";
//import { uuid } from "uuidv4";


const roteador = express.Router()

// const processos = [
//     { 
//       _id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29", 
//       documentName: "Licitação Enap - Curso Web Dev",
//       status: "Em andamento", 
//       details: "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack", 
//       dateInit: "28/11/2022", 
//       comments: ["Processo aberto", "Processo partiu para as partes assinarem", "Processo agora está em análise final", "Processo já tem data final"], 
//       dateEnd: "16/12/2022", 
//       setor: "enap" 
//     }, 
//     { 
//       _id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173", 
//       documentName: "Licitação Compras - Notebooks", 
//       status: "Em andamento", 
//       details: "Processo de licitação para compra de notebooks", 
//       dateInit: "30/11/2022", 
//       comments: ["Processo em aberto e sem previsão de conclusão"], 
//       dateEnd: "", 
//       setor: "tre" 
//     }, 
//     { 
//       _id: "ec68dbb0-1880-4fb9-91d7-cdd0cb42d4eb", 
//       documentName: "Licitação Compras - Ar Condicionado", 
//       status: "Finalizado", 
//       details: "Processo de licitação para compra de ar-condicionado", 
//       dateInit: "15/11/2022", 
//       comments: ["Processo em aberto", "Processo finalizado"], 
//       dateEnd: "25/11/2022", 
//       setor: "trj" 
//     }
//   ]

//criação das rotas

//rota para home /

roteador.get("/", (req, res) => {
    //req -> request -> requisição que vem do cliente
    //res -> response -> resposta para o cliente
  
    const bemVindo = "Bem-vindo ao servidor da Ironhack ENAP - turma 92";
  
    //retorna uma resposta com status de 200 e um json
    return res.status(200).json({ msg: bemVindo, turma: "92 web dev" });
  })
  
  //Acessar todos os processos
  roteador.get("/all", async (req, res) => {
    try {
      const procs = await ProcModel
        .find({},                   //find vazio -> todas as ocorrencias
        { __v: 0, updatedAt: 0})  //projections -> define os campos que retornados
        .sort({ age: 1 })         //sort() -> ordenação
        .limit(100);              //limit() -> limite de quantos registros serao retornados

      return res.status(200).json(procs)

    }
    catch (error){
      console.log(error.errors);
      return res.status(500).json(error.errors)
    }
  });
  
  //POST - create
  roteador.post("/create", async (req, res) => {
    
    try {
      const form = req.body;

      //criando um documento dentro da collection -> .create()
      const newProc = await ProcModel.create(form);
      
      return res.status(201).json(newProc);

    } catch (error) {
      console.log(error.errors);
      return res.status(500).json(error.errors);
    }

  });
  
  //DELETE - delete user
  roteador.delete("/delete/:id", async (req, res) => {

    try {
      const { id } = req.params;
      const deleteProc = await ProcModel.findByIdAndDelete(id);

      if (!deleteProc) return res.status(400).json({msg: "Processo não encontrado."});

      const proc = await ProcModel.find();

      return res.status(200).json(proc);

    } catch (error) {
      console.log(error.errors);
      return res.status(500).json(error.errors);
    }
  });
  
  //EDIT
  roteador.put("/edit/:id", async (req, res) => {

    try {
      const { id } = req.params;
      const updatedProc = await ProcModel.findByIdAndUpdate(
        id,
        { ...req.body},
        { new: true, runValidators: true }
      );

      return res.status(200).json(updatedProc)

    } catch (error) {
      console.log(error.errors);
      return res.status(500).json(error.errors);
    }
  });
  
  
  //Acessar um processo pelo ID GET /process/:id
  roteador.get("/process/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const proc = await ProcModel.findById(id);

      if (!proc) return res.status(400).json({msg: "Processo não encontrado."});

      return res.status(200).json(proc);

    } catch (error) {
      console.log(error.errors);
      return res.status(500).json( {msg: "Processo não encontrado"});
    }

    
  
    const processId = processos.find((proc) => proc._id === id);
    console.log(processId);
    return res.status(200).json(processId);
  });
  
  //Adicionar um comentário a array de comentários PUT /addcomment/:id
  roteador.put("/addcoment/:id", (req, res) => {
    const { id } = req.params;
    const comentario = req.body.comments;
    const processId = processos.find((proc) => proc._id === id);
  
    if (comentario) processId.comments.push(comentario);
    return res.status(200).json(processId);
    
  })
  
  //Acessar todos processos em andamento GET /status/open
  roteador.get("/status/open", (req,res) => {
  
    const procsAbertos = processos.map( (proc) => {
      if (proc.status === "Em andamento") return proc;
    });
    
    console.log(procsAbertos);
  
    return res.status(200).json(procsAbertos);
  
  });
  
  //Acessar todos processos finalizados GET /status/close
  roteador.get("/status/close", (req,res) => {
  
    const procsFechados = processos.map( (proc) => {
      if (proc.status === "Finalizado") return proc;
    });
  
    //const procsFechados = processos.status.includes("Finalizado");
    
    console.log(procsFechados);
  
    return res.status(200).json(procsFechados);
  
  });
  
  //Crie uma rota que busque todos os processos de um determinado setor Rota: "/setor/:nomeSetor"
  roteador.get("/setor/:setor", (req, res) => {
    const { setor } = req.params;
    const processSetor = processos.map( (proc) => {
      if (proc.setor === setor) return proc;
    });
    console.log(processSetor);
    return res.status(200).json(processSetor);
  });














export default roteador