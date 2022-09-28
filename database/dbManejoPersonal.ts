import { isValidObjectId } from "mongoose";
import { IManejoPersonal, ManejoPersonal } from "../models";
import { db } from "./";

export const getManejoPersonalById = async( id: string ): Promise<IManejoPersonal | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const manejoPersonal = await ManejoPersonal.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(manejoPersonal) );

}