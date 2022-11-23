import { isValidObjectId } from "mongoose";
import { ReporteVentasIndividual, IReporteVentasIndividual } from "../models";
import { db } from "./";

export const getReporteVentasIndividualById = async( id: string ): Promise<IReporteVentasIndividual | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const reporteVentasIndividual = await ReporteVentasIndividual.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(reporteVentasIndividual) );

}