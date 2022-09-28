import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { ISucursalYFranquicia, SucursalYFranquicia } from '../../../models';

type Data = 
    | { message: string }
    | ISucursalYFranquicia[]
    | ISucursalYFranquicia

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getSucursalYFranquicia( res );
        
        case 'POST':
            return postISucursalYFranquicia( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getSucursalYFranquicia = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const sucursalesYFranquicias = await SucursalYFranquicia.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( sucursalesYFranquicias );

}

const postISucursalYFranquicia = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        direccion = '',
        distancia = '',
    } = req.body;

    const newSucursalYFranquicia = new SucursalYFranquicia({
        direccion,
        distancia,
    });

    try {
        
        await db.connect();
        await newSucursalYFranquicia.save();
        await db.disconnect();

        return res.status(201).json( newSucursalYFranquicia );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
