'use server'

import { NewStartup, Startup, startupTable } from "@/db/schema"
import { db } from "..";
import { eq } from "drizzle-orm";

// backend to add new startup and insert to db
export const addnewStartup = async (data:NewStartup) => {

    console.log(data);

    await db.insert(startupTable).values(data)

    return {msg: "newStartup Added Successfully"}

}

//backend to fetch all startup from db
export const fetchAllStartup = async () => {
    
  const allStartup =   await db.select().from(startupTable)

//   console.log(allStartup);

  return allStartup;
  
}

//backend to update single startup (from db)

// export const updateStartup = async (id:number,  data:Startup) => {

//   console.log(data);

//   const update = await db.update(startupTable).set(data).where(eq(startupTable.id,Number(id))).returning()

//   return {msg: "Data Updated Succesfully"}

// }
    

//backend to fetch single startup by id
export const singleStartup = async (id: number) => {
  const result = await db.select().from(startupTable).where(eq(startupTable.id, id))
  return result[0] ?? null
}

