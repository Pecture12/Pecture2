
import { Schema, model, Document } from 'mongoose';

const EmpresaSchema = new Schema({
    nombre: {
        type: String,
        required: [ true, 'El nombre de la empresa es necesario' ]
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
        type: Object,
    }
});

/*
empresaSchema.pre<IEmpresa>('save', function( next ) {
    this.fecha = new Date();
    next();
});
*/

interface IEmpresas extends Document {
    nombre: string;
    encargado: string;
    correo: string;
    password: string;
    direccion: string;
    departamento: string;
    categoria: string;
    suscripcion: String;
    imagen: string;
    Inventario: object;
}

export const Empresa = model<IEmpresas>('empresa', EmpresaSchema);