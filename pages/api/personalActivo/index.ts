import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IPersonalActivo, PersonalActivo } from '../../../models';

type Data = 
    | { message: string }
    | IPersonalActivo[]
    | IPersonalActivo

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getPersonalActivo( res );
        
        case 'POST':
            return postPersonalActivo( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getPersonalActivo = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const personalActivo = await PersonalActivo.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( personalActivo );

}

const postPersonalActivo = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        nombre = '',
        puesto = '',
        fechaDeContratacion = '',
        noContrato = '',
        noExpediente = '',
        bajaTemporal = '',
    } = req.body;

    const newPersonalActivo = new PersonalActivo({
        nombre,
        puesto,
        fechaDeContratacion,
        noContrato,
        noExpediente,
        bajaTemporal,
    });

    try {
        
        await db.connect();
        await newPersonalActivo.save();
        await db.disconnect();

        return res.status(201).json( newPersonalActivo );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
