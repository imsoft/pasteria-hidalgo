import { isValidObjectId } from "mongoose";
import { ReporteVentasAmbulantesIndividual, IReporteVentasAmbulantesIndividual } from "../models";
import { db } from "./";

export const getReporteVentasAmbulantesIndividualById = async( id: string ): Promise<IReporteVentasAmbulantesIndividual | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const reporteVentasAmbulantesIndividual = await ReporteVentasAmbulantesIndividual.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(reporteVentasAmbulantesIndividual) );

}