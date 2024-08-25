const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://canosaval3:coderhouse@cluster0.ud3fw.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la Base de Datos"))
    .catch(() => console.log("No se pudo conectar a la Base de Datos"))