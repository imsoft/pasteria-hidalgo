import { isValidObjectId } from "mongoose";
import { ClienteFrecuente, IClienteFrecuente } from "../models";
import { db } from "./";

export const getClienteFrecuenteById = async( id: string ): Promise<IClienteFrecuente | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const clienteFrecuente = await ClienteFrecuente.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(clienteFrecuente) );

}