 import { Schema, Document, model } from 'mongoose';

 const  postSchema = new Schema({

    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
        type: String
    }],
    coords: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [ true, 'Debe de existir una referencia de usuario' ]
    }

 });

 postSchema.pre<IPost>('save', function( next ) {
     this.created = new Date();
     next();
 });

 interface IPost extends Document {
    created: Date;
    mensaje: String;
    imgs: String[];
    coords: String;
    usuario: String;
 }

 export const Post = model<IPost>('Post', postSchema);
 export const PostLost = model<IPost>('PostLost', postSchema);
 export const PostAdopt = model<IPost>('PostAdopt', postSchema);