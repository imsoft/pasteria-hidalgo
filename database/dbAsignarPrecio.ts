import { isValidObjectId } from "mongoose";
import { AsignarPrecio, IAsignarPrecio } from "../models";
import { db } from "./";

export const getAsignarPrecioById = async( id: string ): Promise<IAsignarPrecio | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const asignarPrecio = await AsignarPrecio.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(asignarPrecio) );

}