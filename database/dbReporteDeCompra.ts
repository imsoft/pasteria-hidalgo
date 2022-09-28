import { isValidObjectId } from "mongoose";
import { IReporteDeCompra, ReporteDeCompra } from "../models";
import { db } from "./";

export const getReporteDeCompraById = async( id: string ): Promise<IReporteDeCompra | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const reporteDeCompra = await ReporteDeCompra.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(reporteDeCompra) );

}