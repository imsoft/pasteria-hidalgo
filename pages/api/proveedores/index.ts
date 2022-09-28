import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProveedor, Proveedor } from '../../../models';

type Data = 
    | { message: string }
    | IProveedor[]
    | IProveedor

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getProveedor( res );
        
        case 'POST':
            return postProveedor( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const  getProveedor = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const proveedores = await Proveedor.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( proveedores );

}

const postProveedor = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        nombre = '',
        direccion = '',
        telefono = '',
        horarioAtencion = '',
        productosQueSeCompran = '',
        entregasADomicilio = '',
    } = req.body;

    const newProveedor = new Proveedor({
        nombre,
        direccion,
        telefono,
        horarioAtencion,
        productosQueSeCompran,
        entregasADomicilio,
    });

    try {
        
        await db.connect();
        await newProveedor.save();
        await db.disconnect();

        return res.status(201).json( newProveedor );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
