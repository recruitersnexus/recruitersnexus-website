import React from 'react'
import FeedbackHr from './FeedbackHr'

const page = ({params}:{params:any}) => {
  return (
    <div><FeedbackHr id={params.id}/> </div>
  )
}

export default page