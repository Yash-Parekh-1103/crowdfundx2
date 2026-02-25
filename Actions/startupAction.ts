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
    
export const fetchSinglestartup = async (id:number) => {

  console.log(id);

  const startup =  await db.select().from(startupTable).where(eq(startupTable.id,id))

  console.log(startup);

  return startup;
  

}


//to update single startup

export const updateSingleST = async (id:number,data:NewStartup) => {

  // console.log(id , data);

  await db.update(startupTable).set(data).where(eq(startupTable.id,id))
  
  
}