import { isValidObjectId } from "mongoose";
import { IProveedor, Proveedor } from "../models";
import { db } from "./";

export const getProveedorById = async( id: string ): Promise<IProveedor | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const proveedor = await Proveedor.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(proveedor) );

}