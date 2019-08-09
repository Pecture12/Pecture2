
import { Schema, model, Document } from 'mongoose';

const pedidoSchema = new Schema({
    id: {
        type: String
    },
    producto: {
        type: String,
        required: [ true, 'El nombre del producto es necesario' ]
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

pedidoSchema.pre<IPedido>('save', function( next ) {
    this.fecha = new Date();
    next();
});

interface IPedido extends Document {
    id: string;
    producto: string;
    precio: string;
    cantidad: string;
    empresa: string;
    id_usuario: string;
    direccion: string;
    fecha: Date;
    estado: string;
}

export const Pedido = model<IPedido>('Pedido', pedidoSchema);