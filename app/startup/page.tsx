'use client'
import { fetchAllStartup } from '@/Actions/startupAction'
import { Startup } from '@/db/schema'
import Link from 'next/link'
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

    {startUP && startUP.map((s) => (
      <Link key={s.id} href={`/startup/${s.id}`}>
        <div style={{ cursor: 'pointer', border: '1px solid #ccc', padding: '12px', marginBottom: '12px', borderRadius: '8px' }}>
          <img src={s.img} alt={s.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px' }} />
          <p style={{ fontWeight: 'bold', marginTop: '8px' }}>{s.name}</p>
        </div>
      </Link>
    ))}

    </div>
  )
}

export default page
