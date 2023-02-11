import { isValidObjectId } from "mongoose";
import { db } from "./";
import { IAsignarComisiones, AsignarComision } from '../models';

export const getAsignarComisionById = async( id: string ): Promise<IAsignarComisiones | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const asignarComision = await AsignarComision.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(asignarComision) );

}