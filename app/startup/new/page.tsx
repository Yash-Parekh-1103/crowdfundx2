'use client'
import { addnewStartup } from "@/Actions/startupAction"
import { NewStartup } from "@/db/schema"
import { useCurrentUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

const page = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<NewStartup>()

  const { email, isLoaded } = useCurrentUser()

  //this is for navigation to root when new ST will be created
  const router = useRouter()


  const OnSubmit = async (data: NewStartup) => {

    if (!isLoaded && !email) return
    // console.log(data);

    const newData = { ...data, email } as NewStartup

    
    const addstartup = await addnewStartup(newData);
    
    console.log(newData);
    console.log(addstartup);
    router.replace("/startup")


  }
  return (
    <div>

      <form onSubmit={handleSubmit(OnSubmit)}>

        <input {...register("name", { required: true })} placeholder="Name" className="border-2 border-black" />
        {errors.name && <span>This field is required</span>}

        <input {...register("description", { required: true })} placeholder="Description" className="border-2 border-black" />
        {errors.description && <span>This field is required</span>}

        <input {...register("img", { required: true })} placeholder="Image URL" className="border-2 border-black" />
        {errors.img && <span>This field is required</span>}

        <input type="number" {...register("singleFund", { required: true })} placeholder="Single Fund Amount" className="border-2 border-black" />
        {errors.singleFund && <span>This field is required</span>}

        <input type="number" {...register("totalTarget", { required: true })} placeholder="Total Target" className="border-2 border-black" />
        {errors.totalTarget && <span>This field is required</span>}

        <input type="submit" />
      </form>

    </div>
  )
}

export default page
