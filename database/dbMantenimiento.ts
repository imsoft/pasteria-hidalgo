import { isValidObjectId } from "mongoose";
import { IMantenimiento, Mantenimiento } from "../models";
import { db } from "./";

export const getMantenimientoById = async( id: string ): Promise<IMantenimiento | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const mantenimiento = await Mantenimiento.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(mantenimiento) );

}