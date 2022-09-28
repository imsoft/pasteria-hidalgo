import { isValidObjectId } from "mongoose";
import { IPersonalActivo, PersonalActivo } from "../models";
import { db } from "./";

export const getPersonalActivoById = async( id: string ): Promise<IPersonalActivo | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const personalActivo = await PersonalActivo.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(personalActivo) );

}