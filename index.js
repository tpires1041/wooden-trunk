require("dotenv").config();
const conn = require("./db/conn");
const Usuario = require("./models/Usuario");

const express = require("express");

const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded( { urlencoded: true }));
app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
    res.render(`formUsuario`);
});

app.get("/", (req, res) => {
    res.render(`home`);
});

app.get("/usuarios", (req, res) => {
    res.render(`usuarios`);
});

app.post("/usuarios/novo", async (req, res) => {
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };

    const usuario = await Usuario.create(dadosUsuario);
});


conn
    .sync()
    .then(() => {
        console.log(("Conectado e sincronizado!"));
    })
    .catch((err) => {
        console.log("Ocorreu um erro: " + err);
    });