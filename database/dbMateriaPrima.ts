import { isValidObjectId } from "mongoose";
import { IMateriaPrima, MateriaPrima } from "../models";
import { db } from "./";

export const getMateriaPrimaById = async( id: string ): Promise<IMateriaPrima | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const materiaPrima = await MateriaPrima.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(materiaPrima) );

}
