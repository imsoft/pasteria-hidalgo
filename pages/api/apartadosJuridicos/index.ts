import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { ApartadoJuridico, IApartadoJuridico } from '../../../models';

type Data = 
    | { message: string }
    | IApartadoJuridico[]
    | IApartadoJuridico

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getApartadosJuridicos( res );
        
        case 'POST':
            return postApartadoJuridico( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getApartadosJuridicos = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const apartadosJuridicos = await ApartadoJuridico.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( apartadosJuridicos );

}

const postApartadoJuridico = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const {
        sucursalOFranquicia = '',
        nombreSucursalOFranquicia = '',
        documento = '',
    } = req.body;

    const newApartadoJuridico = new ApartadoJuridico({
        sucursalOFranquicia,
        nombreSucursalOFranquicia,
        documento,
    });

    try {
        
        await db.connect();
        await newApartadoJuridico.save();
        await db.disconnect();

        return res.status(201).json( newApartadoJuridico );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
