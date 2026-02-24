import { singleStartup } from '@/Actions/startupAction'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

const page = async ({ params }: Props) => {
  const { id } = await params
  const startup = await singleStartup(Number(id))

  if (!startup) return notFound()

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <img
        src={startup.img}
        alt={startup.name}
        style={{ width: '100%', maxHeight: '350px', objectFit: 'cover', borderRadius: '12px' }}
      />

      <h1 style={{ fontSize: '2rem', margin: '20px 0 8px' }}>{startup.name}</h1>

      <p style={{ color: '#555', marginBottom: '24px' }}>{startup.description}</p>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginBottom: '24px' }}>
        <div style={{ background: '#f0fdf4', padding: '16px 24px', borderRadius: '10px', flex: '1' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>Fund per slot</p>
          <p style={{ margin: '4px 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#16a34a' }}>
            ${startup.singleFund}
          </p>
        </div>
        <div style={{ background: '#eff6ff', padding: '16px 24px', borderRadius: '10px', flex: '1' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>Total Target</p>
          <p style={{ margin: '4px 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>
            ${startup.totalTarget}
          </p>
        </div>
      </div>

      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        Contact: <a href={`mailto:${startup.email}`} style={{ color: '#2563eb' }}>{startup.email}</a>
      </p>
    </div>
  )
}

export default page
