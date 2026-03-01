'use client'
import { addnewStartup } from "@/Actions/startupAction"
import { NewStartup } from "@/db/schema"
import { useCurrentUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


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

      <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col gap-3">

        <Input {...register("name", { required: true })} placeholder="Name" className="w-xl" />
        {errors.name && <span>This field is required</span>}

        <Input {...register("description", { required: true })} placeholder="Description"  className="w-xl" />
        {errors.description && <span>This field is required</span>}

        <Input {...register("img", { required: true })} placeholder="Image URL"  className="w-xl" />
        {errors.img && <span>This field is required</span>}

    <div className="flex w-xl gap-2">

        <Input type="number" defaultValue={1} {...register("singleFund", { required: true, min: { value: 1, message: "Single fund must be a positive number" } })} placeholder="Single Fund Amount"    />
        {errors.singleFund && <span>{errors.singleFund.message || "This field is required"} </span>}

        <Input type="number" {...register("totalTarget", { required: true,  min: { value: 1, message: "Total fund must be a positive number" }  } )} placeholder="Total Target"  />
        {errors.totalTarget && <span>{errors.totalTarget.message}</span>}

    </div>

        <Button type="submit" className="w-20 p-2 m-5">Submit</Button>
      </form>

    </div>
  )
}

export default page
