import { Schema, model} from "mongoose"

const procSchema = new Schema({

  documentName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  status: {
    type: String,
    enum: ["Em andamento", "Finalizado", "Arquivado"],
    default: "Em andamento",
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  details: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 500
  },
  dateInit: {
    type: Date,
    required: true
  },
  comments: [
    {type: String}
  ],
  dateEnd: {
    type: Date,
    required: false
  },
  setor: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  }
},
{
  timestamps: true,
}
);

const ProcModel = model("Processo", procSchema)

export default ProcModel