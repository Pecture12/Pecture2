"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pedidoSchema = new mongoose_1.Schema({
    id: {
        type: String
    },
    producto: {
        type: String,
        required: [true, 'El nombre del producto es necesario']
    },
    precio: {
        type: String
    },
    cantidad: {
        type: String
    },
    empresa: {
        type: String
    },
    id_usuario: {
        type: String,
    },
    direccion: {
        type: String,
    },
    fecha: {
        type: Date
    },
    estado: {
        type: String,
    }
});
pedidoSchema.pre('save', function (next) {
    this.fecha = new Date();
    next();
});
exports.Pedido = mongoose_1.model('Pedido', pedidoSchema);
