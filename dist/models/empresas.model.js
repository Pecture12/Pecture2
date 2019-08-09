"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const empresasSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la empresa es necesario']
    },
    encargado: {
        type: String
    },
    correo: {
        type: String
    },
    password: {
        type: String
    },
    direccion: {
        type: String,
    },
    departamento: {
        type: String,
    },
    categoria: {
        type: String
    },
    suscripcion: {
        type: String,
    },
    imagen: {
        type: String,
    },
    inventario: {
        type: Array,
    }
});
exports.Empresas = mongoose_1.model('Empresas', empresasSchema);
