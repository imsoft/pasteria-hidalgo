import { isValidObjectId } from "mongoose";
import { IPersonalDeMantenimiento, PersonalDeMantenimiento } from "../models";
import { db } from "./";

export const getPersonalDeMantenimientoById = async( id: string ): Promise<IPersonalDeMantenimiento | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const personalDeMantenimiento = await PersonalDeMantenimiento.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(personalDeMantenimiento) );

}