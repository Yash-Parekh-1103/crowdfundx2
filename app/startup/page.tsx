'use client'
import { fetchAllStartup } from '@/Actions/startupAction'
import { Startup } from '@/db/schema'
import React, { useEffect, useState } from 'react'



const page = () => {

  const [startUP, setstartUP] = useState<Startup[] | null>(null)

  const getAllStartup = async () => {
    
    const allStartup =  await fetchAllStartup()
    // console.log(allStartup);

    setstartUP(allStartup)
    

  }

  useEffect(() => {
   
    getAllStartup()


  }, [])


  

  return (
    <div>
      All Start Up

    {startUP && startUP.map((s)=> <div key={s.id}>
      
      <img src={s.img} />
      <p>{s.name}</p>
      
      </div>
      
      )}

    </div>
  )
}

export default page
