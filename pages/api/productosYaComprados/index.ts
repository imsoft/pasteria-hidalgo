import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { IProductoYaComprado, ProductoYaComprado } from '../../../models';

type Data = 
    | { message: string }
    | IProductoYaComprado[]
    | IProductoYaComprado

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    switch( req.method ) {
        case 'GET':
            return getProductoYaComprado( res );
        
        case 'POST':
            return postProductoYaComprado( req, res );
        
        default:
            return res.status(400).json({ message: 'Endpoint no exite ' + req.method });
    }

}

const getProductoYaComprado = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const productosYaComprados = await ProductoYaComprado.find().sort({ nombre: 'ascending' });
    await db.disconnect();

    return res.status(200).json( productosYaComprados );

}

const postProductoYaComprado = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { 
        fechaDeCompra = '',
        precioDeCompra = '',
        descripcionDelProducto = '',
        fechaDeEntrega = '',
        idProveedor = '',
        facura = '',
        totalAcomulado = '',
    } = req.body;

    const newProductoYaComprado = new ProductoYaComprado({
        fechaDeCompra,
        precioDeCompra,
        descripcionDelProducto,
        fechaDeEntrega,
        idProveedor,
        facura,
        totalAcomulado,
    });

    try {
        
        await db.connect();
        await newProductoYaComprado.save();
        await db.disconnect();

        return res.status(201).json( newProductoYaComprado );

    } catch (error) {
        
        await db.disconnect();
        console.log( error );
        return res.status(500).json({ message: 'Algo salio mal, revisa la consola del servidor' });

    }

}
