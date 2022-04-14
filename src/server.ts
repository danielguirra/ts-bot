import express from "express";
import dotenv from "dotenv";
import { run } from "./index";
dotenv.config();
const port = process.env.PORT;
const app = express();

app.get("/", (req, res) => res.send("Servidor online"));

app.listen(port, () => console.log("O bot está rodando na porta " + port));

run;
