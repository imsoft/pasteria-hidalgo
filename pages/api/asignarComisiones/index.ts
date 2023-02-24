import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IAsignarComisiones, AsignarComision } from '../../../models';

type Data = 
    | { message: string }
    | IAsignarComisiones[]
    | IAsignarComisiones

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getAsignarComision( res );
        
        case 'POST':
            return postAsignarComision( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getAsignarComision = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const asignarComisiones = await AsignarComision.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( asignarComisiones );

}

const postAsignarComision = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const {
        sucursalOFranquicia = '',
        mes = '',
        anio = '',
        minimoDeLaMeta = '',
        sucursales = '',
        franquicias = '',
    } = req.body;

    const newAsignarComision = new AsignarComision({
        sucursalOFranquicia,
        mes,
        anio,
        minimoDeLaMeta,
        sucursales,
        franquicias,
    });

    console.log(newAsignarComision);

    try {
        
        await db.connect();
        await newAsignarComision.save();
        await db.disconnect();

        return res.status(201).json( newAsignarComision );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
