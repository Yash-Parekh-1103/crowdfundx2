'use client'
import {  fetchSinglestartup } from '@/Actions/startupAction'
import { Startup } from '@/db/schema'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [singleStartup, setsingleStartup] = useState<Startup | null>(null)



  const {id} = useParams()

  useEffect(() => {
    
    // console.log(id);

    getSingleStartup()
    

  }, [])
  
  const getSingleStartup = async () => {

   const startup =  await fetchSinglestartup(Number(id))
    
  //  console.log(startup[0]);

  setsingleStartup(startup[0]);

   
  }


  return (
    <div>
      {singleStartup && <div>
          

        <img src={singleStartup.img}></img>
        <p>{singleStartup.name}</p>
        <p>{singleStartup.description}</p>
        <p>${singleStartup.singleFund}</p>
        <p>${singleStartup.totalTarget}</p>
        <a href={`./update/${singleStartup.id}`}>update  </a>
        <a href={`./payment/${singleStartup.id}`}>Buy  </a>
        </div>
        }
    </div>
  )
}

export default page
