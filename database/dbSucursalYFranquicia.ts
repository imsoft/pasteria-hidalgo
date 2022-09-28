import { isValidObjectId } from "mongoose";
import { ISucursalYFranquicia, SucursalYFranquicia } from "../models";
import { db } from "./";

export const getSucursalYFranquiciaById = async( id: string ): Promise<ISucursalYFranquicia | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const sucursalYFranquicia = await SucursalYFranquicia.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(sucursalYFranquicia) );

}