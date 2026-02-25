'use client'
import { fetchSinglestartup, updateSingleST } from '@/Actions/startupAction'
import { NewStartup, Startup } from '@/db/schema'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"


const page = () => {


 const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<NewStartup>()
  
  const {id} = useParams();


  const getOldData = async () => {
    
    const oldstartup =  await fetchSinglestartup(Number(id))

    console.log(oldstartup[0]);
    reset(oldstartup[0])
    


  }
  
useEffect(() => {
 
// console.log(id);

getOldData();


}, [])

const onSubmit = async (data:NewStartup) => {

  console.log(data);

  await updateSingleST(Number(id),data)


  
  
}



  return (
    <div>

  <form onSubmit={handleSubmit(onSubmit)}>


      <input className="border border-gray-300 rounded px-3 py-2" placeholder="Image URL" {...register("img", { required: true })} />
      {errors.img && <span>This field is required</span>}

      <input className="border border-gray-300 rounded px-3 py-2" placeholder="Name" {...register("name", { required: true })} />
      {errors.name && <span>This field is required</span>}

      <input className="border border-gray-300 rounded px-3 py-2" placeholder="Description" {...register("description", { required: true })} />
      {errors.description && <span>This field is required</span>}

      <input type='number' className="border border-gray-300 rounded px-3 py-2" placeholder="Single Fund" {...register("singleFund", { required: true })} />
      {errors.singleFund && <span>This field is required</span>}

      <input type='number' className="border border-gray-300 rounded px-3 py-2" placeholder="Total Target" {...register("totalTarget", { required: true })} />
      {errors.totalTarget && <span>This field is required</span>}

      <input type="submit" />
    </form>

    </div>
  )
}

export default page
