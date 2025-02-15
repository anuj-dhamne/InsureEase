const asyncHandler=(requestHandler)=>{
    return (req,res,next)=>{
      Promise
      .resolve(requestHandler(req,res,next))
      .catch((err)=>{
          console.log("Error in asyncHandler : ",err)
      })
    }
  } 
  
  export {asyncHandler};