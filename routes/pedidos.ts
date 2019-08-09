import { Router, Request, Response } from "express";
import { Usuario } from '../models/usuario.model';
import bcrypt from 'bcrypt';
import Token from '../classes/token';
import { verificaToken } from '../middlewares/autenticacion';
import { Pedido } from '../models/pedido.model';
import { Empresa } from '../models/empresa.model';
import { Db } from "mongodb";

const pedidosRoutes = Router();

pedidosRoutes.get('/prueba', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo funciona bien'
    })
});

//crear usuario
pedidosRoutes.post('/crearpedido', ( req: Request, res: Response ) => {

    const pedido = {
        id: req.body.id, 
        producto: req.body.producto, 
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        empresa: req.body.empresa,
        id_usuario: req.body.userid,
        direccion: req.body.direccion,
        estado: req.body.estado
    };

    Pedido.create( pedido ).then( userDB => {

        res.json({
            ok: true,
            Pedido: userDB
        });

    }).catch( err => {

        res.json({
            ok: false,
            err
        });

    });
    
});

//Obtener pedidos
pedidosRoutes.get('/ordenes', async(req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

    const pedidos = await Pedido.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .exec();

    res.json({
        ok: true,
        pagina,
        pedidos
    });

});

//Obtener empresas
pedidosRoutes.get('/empresas', async(req: any, res: Response) => {

    let cat = req.query.categoria || 'Tienda';
    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

    const empresas = await Empresa.find({ categoria: cat })
                                .sort({ _id: -1 })
                                .skip( skip )
                                .limit(10)
                                .exec();

    res.json({
        ok: true,
        pagina,
        empresas
    });

});

//Obtener inventario de empresa
pedidosRoutes.get('/inventario', async(req: any, res: Response) => {

    let empresa = req.query.empresa || "Pizza@gmail.com";

    const empresas = await Empresa.findOne({correo: empresa}, {inventario: 1})
                                  .exec();

    res.json({
        ok: true,
        empresa,
        empresas
    });

});


export default pedidosRoutes;