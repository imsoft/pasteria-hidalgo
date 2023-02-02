import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IPersonalDeMantenimiento, PersonalDeMantenimiento } from '../../../models';

type Data = 
    | { message: string }
    | IPersonalDeMantenimiento[]
    | IPersonalDeMantenimiento

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getPersonalesDeMantenimiento( res );
        
        case 'POST':
            return postPersonalDeMantenimiento( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getPersonalesDeMantenimiento = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const personalesDeMantenimiento = await PersonalDeMantenimiento.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( personalesDeMantenimiento );

}

const postPersonalDeMantenimiento = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        nombre = '',
        oficio = '',
        direccion = '',
        telefono = '',
    } = req.body;

    const newPersonalDeMantenimiento = new PersonalDeMantenimiento({
        nombre,
        oficio,
        direccion,
        telefono,
    });

    try {
        
        await db.connect();
        await newPersonalDeMantenimiento.save();
        await db.disconnect();

        return res.status(201).json( newPersonalDeMantenimiento );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
