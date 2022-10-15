import { isValidObjectId } from "mongoose";
import { db } from "./";
import { ReporteDeSalida, IReporteDeSalida } from '../models';

export const getReporteDeSalidaById = async( id: string ): Promise<IReporteDeSalida | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const reporteDeSalida = await ReporteDeSalida.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(reporteDeSalida) );

}