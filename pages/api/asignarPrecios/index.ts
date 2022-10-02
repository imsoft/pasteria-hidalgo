import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { AsignarPrecio, IAsignarPrecio } from '../../../models';

type Data = 
    | { message: string }
    | IAsignarPrecio[]
    | IAsignarPrecio

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getAsignarPrecios( res );
        
        case 'POST':
            return postAsignarPrecio( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getAsignarPrecios = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const asignarPrecios = await AsignarPrecio.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( asignarPrecios );

}

const postAsignarPrecio = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        producto = '',
        precioMaximo = '',
    } = req.body;

    const newAsignarPrecio = new AsignarPrecio({
        producto,
        precioMaximo,
    });

    try {
        
        await db.connect();
        await newAsignarPrecio.save();
        await db.disconnect();

        return res.status(201).json( newAsignarPrecio );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
