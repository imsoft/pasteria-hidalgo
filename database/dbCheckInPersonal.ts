import { isValidObjectId } from "mongoose";
import { db } from "./";
import { CheckInDePersonal, ICheckInPersonal } from '../models';

export const getCheckInPersonalById = async( id: string ): Promise<ICheckInPersonal | null> => {
    
    if( !isValidObjectId(id) ) return null;

    await db.connect();
    const checkInPersonal = await CheckInDePersonal.findById(id).lean();
    await db.disconnect();

    return JSON.parse( JSON.stringify(checkInPersonal) );

}