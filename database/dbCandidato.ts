import { isValidObjectId } from "mongoose";
import { Candidato, ICandidato } from "../models";
import { db } from "./";

export const getCandidatoById = async( id: string ): Promise<ICandidato | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const candidato = await Candidato.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(candidato) );

}