require("dotenv").config();
const conn = require("./db/conn");
const Usuario = require("./models/Usuario");

const express = require("express");

const handlebars = require("express-handlebars");

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

app.use(express.urlencoded({ urlencoded: true }));
app.use(express.json());

app.get("/usuarios/novo", (req, res) => {
    res.render(`formUsuario`);
});

app.get("/", (req, res) => {
    res.render(`home`);
});

app.get("/usuarios", (req, res) => {
    const usuarios = Usuario.findAll({ raw: true })
    res.render(`usuarios`, { usuarios });
});

app.post("/usuarios/novo", async (req, res) => {
    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };

    const usuario = await Usuario.create(dadosUsuario);
});

app.get("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id;
    const usuario = await Usuario.findByPk(id, { raw: true });

    res.render("formUsuario", { usuario });
})

app.post("/usuarios/:id/atualizar", async (req, res) => {
    const id = req.params.id;

    const dadosUsuario = {
        nickname: req.body.nickname,
        nome: req.body.nome,
    };
    
    const registrosAfetados = await Usuario.update(dadosUsuario, { where: { id: id } });

    if (registrosAfetados > 0) {
        res.redirect("/usuarios");
    } else {
        res.send("Erro ao atualizar usuário!");
    }
});


app.post("/usuarios/excluir", async (req, res) => {
    const id = req.body.id;

    const registrosAfetados = await Usuario.destroy({ where: { id: id } });

    if (registrosAfetados > 0) {
        res.redirect("/usuarios");   
    } else {
        res.send("Erro ao excluir usuário!");
    }

});


app.listen(8000, () => {
    console.log("Aplicação rodando!");
});

conn
    .sync()
    .then(() => {
        console.log(("Conectado e sincronizado!"));
    })
    .catch((err) => {
        console.log("Ocorreu um erro: " + err);
    });