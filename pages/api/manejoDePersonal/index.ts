import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IManejoPersonal, ManejoPersonal } from '../../../models';

type Data = 
    | { message: string }
    | IManejoPersonal[]
    | IManejoPersonal

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getManejoPersonal( res );
        
        case 'POST':
            return postManejoPersonal( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getManejoPersonal = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const manejoPersonal = await ManejoPersonal.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( manejoPersonal );

}

const postManejoPersonal = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        nombre = '',
        descripcionDelPuesto = '',
    } = req.body;

    const newManejoPersonal = new ManejoPersonal({
        nombre,
        descripcionDelPuesto,
    });

    try {
        
        await db.connect();
        await newManejoPersonal.save();
        await db.disconnect();

        return res.status(201).json( newManejoPersonal );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
