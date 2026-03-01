'use server'

import { NewPayment, paymentTable } from "@/db/schema"
import { db } from ".."

export const makenewPayment = async (data:NewPayment) => {
    
    console.log(data);

    await db.insert(paymentTable).values(data)
    
}