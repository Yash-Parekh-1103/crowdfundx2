'use server'

import { NewStartup, startupTable } from "@/db/schema"
import { db } from "..";

export const addnewUser = async (data:NewStartup) => {

    console.log(data);

    await db.insert(startupTable).values(data)

    return {msg: "newUser Added Successfully"}

}


export const fetchAllStartup = async () => {
    
  const allStartup =   await db.select().from(startupTable)

//   console.log(allStartup);

  return allStartup;
  

}
    



