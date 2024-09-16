import React from 'react'
import FeedbackUser from './FeedbackUser'


const page = ({params}:{params:any}) => {
  return (
    <div><FeedbackUser id={params.id}/> </div>
  )
}

export default page