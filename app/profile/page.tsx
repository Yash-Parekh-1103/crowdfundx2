'use client'

import { useCurrentUser } from "@/hooks/useUser"
import { useEffect } from "react";

const page = () => {

    const {email , isLoaded} = useCurrentUser();

    useEffect(() => {
        
      if(!isLoaded) return 
      console.log(email);

    }, [isLoaded,email])

  return (
    <div>
      
    </div>
  )
}

export default page
