import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { Mantenimiento, IMantenimiento } from '../../../models';

type Data = 
    | { message: string }
    | IMantenimiento[]
    | IMantenimiento

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getMantenimientos( res );
        
        case 'POST':
            return postMantenimiento( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getMantenimientos = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const mantenimientos = await Mantenimiento.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( mantenimientos );

}

const postMantenimiento = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        sucursalOFranquicia = '',
        sucursal = '',
        franquicia = '',
        nombreMaquina = '',
        proveedor = '',
        fechaDeGarantia = '',
        fechaDeMantenimiento = '',
        modificacionDeMantenimiento = '',
    } = req.body;

    const newMantenimiento = new Mantenimiento({
        sucursalOFranquicia,
        sucursal,
        franquicia,
        nombreMaquina,
        proveedor,
        fechaDeGarantia,
        fechaDeMantenimiento,
        modificacionDeMantenimiento,
    });

    try {
        
        await db.connect();
        await newMantenimiento.save();
        await db.disconnect();

        return res.status(201).json( newMantenimiento );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
