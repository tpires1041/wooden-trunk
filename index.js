require("dotenv").config();
const conn = require("./db/conn");

const Usuario = require("./models/Usuario");

//const express=
conn
    .sync()
    .then(() => {
        console.log(("Conectado e sincronizado!"));
    })
    .catch((err) => {
        console.log("Ocorreu um erro: " + err);
    });

app.get("/usuarios/nome", (req, res) => {
    res.sendFile(`${__dirname}/views/formUsuario.html`);
});