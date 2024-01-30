import React from 'react'
import { useLoaderData } from 'react-router-dom'

const OneBook = () => {
    const {_id,bookTitle}=useLoaderData();
  return (
    <div className='mt-28 px-4 lg:px-24
    '>
      <h2>{bookTitle}</h2>
    </div>
  )
}

export default OneBook
