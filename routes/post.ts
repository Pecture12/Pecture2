import { Router, Request, Response } from 'express';
import { verificaToken } from '../middlewares/autenticacion';
import { Post, PostLost, PostAdopt } from '../models/post.model';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../classes/file-system';

const postRoutes = Router();
const fileSystem = new FileSystem();

//obtener POST paginados
//HOME
postRoutes.get('/home', async(req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

    const posts = await Post.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});
//LOST
postRoutes.get('/lost', async(req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

    const posts = await PostLost.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});
//ADOPT
postRoutes.get('/adopt', async(req: any, res: Response) => {

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

    const posts = await PostAdopt.find()
                            .sort({ _id: -1 })
                            .skip( skip )
                            .limit(10)
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        pagina,
        posts
    });

});


//crear POST
postRoutes.post('/', [ verificaToken ], (req: any, res: Response) => {
    
    const body = req.body;
    body.usuario = req.usuario._id;

    const imagenes =  fileSystem.imagenesDeTempHaciaPost( req.usuario._id );
    body.imgs = imagenes;

    if(body.tipo == "home"){
        {Post.create( body ).then( async postDB => {

            await postDB.populate('usuario', '-password').execPopulate();


            res.json({
                ok: true,
                post: postDB
            });
        
        }).catch( err => {
            res.json( err );
        });
        }
    }else if(body.tipo == "lost"){
        {PostLost.create( body ).then( async postDB => {

            await postDB.populate('usuario', '-password').execPopulate();


            res.json({
                ok: true,
                post: postDB
            });
        
        }).catch( err => {
            res.json( err );
        });
        }
    }else if(body.tipo == "adopt"){
        {PostAdopt.create( body ).then( async postDB => {

            await postDB.populate('usuario', '-password').execPopulate();


            res.json({
                ok: true,
                post: postDB
            });
        
        }).catch( err => {
            res.json( err );
        });
        }
    }
});

//servicio para subir archivos 
postRoutes.post('/upload', [ verificaToken ], async (req: any, res: Response) => {

    if ( !req.files )  {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo'
        });
    }

    const file: FileUpload = req.files.image;

    if ( !file ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subio ningun archivo -image'
        });
    }

    if ( !file.mimetype.includes('image') ) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subio no es una imagen'
        });
    }

    await fileSystem.guardarImagenTemporal( file, req.usuario._id);

    res.json({
        ok: true,
        file: file.mimetype
    });

});


postRoutes.get('/imagen/:userid/:img', (req: any, res: Response) => {

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img );

    res.sendFile( pathFoto );

});

//HOME
postRoutes.get('/obtenerpu', async(req: any, res: Response) => {

    let user = req.query.user;

    const postsUsuarioSelect = await Post.find({ usuario: user })
                            .sort({ _id: -1 })
                            .populate('usuario', '-password')
                            .exec();

    res.json({
        ok: true,
        postsUsuarioSelect
    });

});

export default postRoutes;