import { isValidObjectId } from "mongoose";
import { db } from "./";
import { ApartadoJuridico, IApartadoJuridico } from '../models';

export const getApartadoJuridicoById = async( id: string ): Promise<IApartadoJuridico | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const apartadoJuridico = await ApartadoJuridico.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(apartadoJuridico) );

}
