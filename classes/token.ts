import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model';
import { resolve } from 'path';
import { rejects } from 'assert';

export default class Token {

    private static seed: string = 'este-es-el-seed-de-mi-app-secreto';
    private static caducidad: string = '30d';

    constructor() {}

    static getJwtToken ( payload: any ): string {

        return jwt.sign({ 
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }

    static comprobarToken( userToken: string ) {

        return new Promise( (resolve, reject ) => {
            jwt.verify( userToken, this.seed, ( err, decoded ) => {
                if ( err ) {
                    //no confiar
                    reject();
                } else {
                    //token invalido 
                    resolve( decoded );
                }
            })
        });
        
    }

}