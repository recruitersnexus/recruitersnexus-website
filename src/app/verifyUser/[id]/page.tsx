
import React from 'react'
import Verify from './Verify'


function page({params}:{params:any}) {
    
  return (
    <div><Verify id={params.id}/></div>
  )
}

export default page