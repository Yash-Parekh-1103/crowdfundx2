'use client'
import { makenewPayment } from "@/Actions/paymentAction"
import { fetchSinglestartup } from "@/Actions/startupAction"
import { NewPayment } from "@/db/schema"
import { useCurrentUser } from "@/hooks/useUser"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const page = () => {

  const { email, isLoaded } = useCurrentUser()
const [errmsg, seterrmsg] = useState<string | null>(null)
  const { id } = useParams()

  useEffect(() => {
    console.log(id);

    getOldData()

  }, [])


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<NewPayment>()

  const getOldData = async () => {

    const OldSTid = await fetchSinglestartup(Number(id))

    console.log(OldSTid[0].singleFund);
    reset({
      "amount": OldSTid[0].singleFund
    })

  }


  const onSubmit = async (data: NewPayment) => {


    console.log(data);
    const newData =
      {
        ...data, "startup_id": Number(id), "email": email, upi_id:data.upi_id || null,creditCard_num:data.creditCard_num ||null,cvv:data.cvv||null, holder_name:data.holder_name||null

      } as NewPayment

    console.log(newData);
if (newData.creditCard_num == null || newData.holder_name == null || newData.cvv == null) {
  seterrmsg("pls do payment")
  return
}
    await makenewPayment(newData);

  }

  const quantity = watch("quantity")
  const amount = watch("amount")


  useEffect(() => {

    if (!quantity) return

    reset({

      "amount": quantity * amount

    })

  }, [quantity])


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>

        <input type="number" defaultValue={1}{...register("quantity", { required: true })} placeholder="Quantity" className="border border-gray-300 rounded px-3 py-2 placeholder-gray-400" />
        {errors.quantity && <span>This field is required</span>}

        <input type="number" {...register("amount", { required: true })} placeholder="Amount" className="border border-gray-300 rounded px-3 py-2 placeholder-gray-400" disabled />
        {errors.amount && <span>This field is required</span>}

        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">credit</TabsTrigger>
            <TabsTrigger value="password">upi</TabsTrigger>
          </TabsList>
          <TabsContent value="account">

            <div>
              <input type="number"{...register("creditCard_num")} placeholder="Credit Card Number" className="border border-gray-300 rounded px-3 py-2 placeholder-gray-400" />
              {errors.creditCard_num && <span>This field is required</span>}

              <input type="number"{...register("cvv")} placeholder="CVV" className="border border-gray-300 rounded px-3 py-2 placeholder-gray-400" />
              {errors.cvv && <span>This field is required</span>}

              <input {...register("holder_name")} placeholder="Holder Name" className="border border-gray-300 rounded px-3 py-2 placeholder-gray-400" />
              {errors.holder_name && <span>This field is required</span>}
            </div>

          </TabsContent>
          <TabsContent value="password">
            <div>
              <input {...register("upi_id")} placeholder="UPI ID" className="border border-gray-300 rounded px-3 py-2 placeholder-gray-400" />
              {errors.upi_id && <span>This field is required</span>}

            </div>

          </TabsContent>
        </Tabs>

     {errmsg && <p className="text-2xl text-red-600">{errmsg}</p>}
        <Button variant="outline" className="bg-black text-white" type="submit">Button</Button>
      </form>
    </div>
  )
}

export default page
