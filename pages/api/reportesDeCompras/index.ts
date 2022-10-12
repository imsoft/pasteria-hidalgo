import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IReporteDeCompra, ReporteDeCompra } from '../../../models';

type Data = 
    | { message: string }
    | IReporteDeCompra[]
    | IReporteDeCompra

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getReporteDeCompra( res );
        
        case 'POST':
            return postReporteDeCompra( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getReporteDeCompra = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const reportesDeCompras = await ReporteDeCompra.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( reportesDeCompras );

}

const postReporteDeCompra = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const {
        fechaDeCompra = '',
        credito = '',
        materiaPrima = '',
        unidades = '',
        nombreProveedor = '',
        tempetatura = '',
        caducidad = '',
        factura = '',
        cantidad = 0,
        precioPorUnidad = 0,
        precioTotalDelProducto = 0,
        precioTotalDelCompra = 0,
    } = req.body;

    const newReporteDeCompra = new ReporteDeCompra({
        fechaDeCompra,
        credito,
        materiaPrima,
        unidades,
        nombreProveedor,
        tempetatura,
        caducidad,
        factura,
        cantidad,
        precioPorUnidad,
        precioTotalDelProducto,
        precioTotalDelCompra,
    });

    try {
        
        await db.connect();
        await newReporteDeCompra.save();
        await db.disconnect();

        return res.status(201).json( newReporteDeCompra );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
