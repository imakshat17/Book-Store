import React, { useState } from 'react'
import { Button, Checkbox, Label, Select, TextInput,Textarea } from 'flowbite-react';
import { useLoaderData, useParams } from 'react-router-dom';

const Edit = () => {
    const {id}=useParams();
    const {bookTitle,authorName,imageUrl,category,bookDescription,bookPdfUrl
    }=useLoaderData()

    const bookCategory=[
        'Fiction',
        'Non-Fiction',
        'Mistery',
        'Horror',
        'Adventure',
        'Science Fiction',
        'Fantasy',
        'Bibliography',
        'Autobiography',
        'History',
        'Self-help',
        'Memoir',
        'Business',
        'Children Books',
        'Travel',
        'Religion',
        'Art and Design'

   ]
   const [selectedBook,setSelectedBook]=useState(bookCategory[0])
   const handleChangeSelectedValue=(e)=>{
           // console.log(e.target.value)
           setSelectedBook(e.target.value)
   }
   // Handle book sbumitiion here
    const handleUpdate=(e)=>{
       e.preventDefault()
       const form=e.target
       const bookTitle=form.bookTitle.value
       const authorName=form.authorName.value 
       const imageUrl=form.imageUrl.value 
       const category=form.category.value 
       const bookDescription=form.bookDescription.value 
       const bookPdfUrl=form.bookPdfUrl.value

       const updateBookObj={
           bookTitle,authorName,imageUrl,
           category,bookDescription,bookPdfUrl
       }
       // console.log(bookObj)
      //update book data
      fetch(`http://localhost:3000/book/${id}`,{
        method:"PATCH",
        headers:{
             "Content-Type":"application/json"   
        },
        body:JSON.stringify(updateBookObj)
      }).then(res=>res.json()).then(data=>{
        alert("Book updated Sucessfully!!")
       
      })
       
    }
 return (
   <div className='px-4 my-12'>
     <h2 className='mb-8 text-3xl font-bold'>
       Update A book
     </h2>
     <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
       {/* First Row */}
   <div className='flex gap-8'>
   <div className='lg:w-1/2'>
       <div className="mb-2 block">
         <Label htmlFor="bookTitle" value="Book Name" />
       </div>
       <TextInput id="bookTitle" name='bookTitle' type="text" placeholder="Book Name" defaultValue={bookTitle} required shadow />
     </div>
     {/* Author name */}
     <div className='lg:w-1/2'>
       <div className="mb-2 block">
         <Label htmlFor="authorName" value="Author Name" />
       </div>
       <TextInput id="authorName" name='authorName' type="text" placeholder="Author Name" defaultValue={authorName} required shadow />
     </div>
   </div>
   {/* Second row */}
   {/* Image url */}
   <div className='flex gap-8'>
   <div className='lg:w-1/2'>
       <div className="mb-2 block">
         <Label htmlFor="imageUrl" value="Book Image Url" />
       </div>
       <TextInput id="imageUrl" name='imageUrl' type="text" placeholder="Image Url" defaultValue={imageUrl} required shadow />
     </div>
     {/* Category */}
     <div className='lg:w-1/2'>
             <div className='mb-2 block'>
             <Label
             htmlFor='inputState'
             value="Book Category"/>
             </div>
             <Select id='inputState' name="category" className='w-full rounded' value={selectedBook} onChange={handleChangeSelectedValue}>
            {
             bookCategory.map((option)=><option key={option} value={option}>{option}</option>)  
            }
             </Select>
     </div>
   </div>
   {/* Third row */}
   {/* bookDescription */}
   <div className='flex gap-8'>
   <div className='lg:w-1/2'>
       <div className="mb-2 block">
         <Label htmlFor="bookDescription" value="Description" />
       </div>
       <Textarea id="bookDescription" 
       name="bookDescription" defaultValue={bookDescription}
       placeholder="Description of your book" required rows={4} className='w-full' />
     </div>
     {/* bookPdfUrl */}
     <div className='lg:w-1/2'>
       <div className="mb-2 block">
         <Label htmlFor="bookPdfUrl" value="BookPdfUrl" />
       </div>
       <TextInput id="bookPdfUrl" name='bookPdfUrl' type="text" placeholder="BookPdfUrl" defaultValue={bookPdfUrl} required shadow />
     </div>
   </div>
   <Button type='submit' className='mt-5'>Update Book</Button>
   </form>
   </div>
 )
  
}

export default Edit
