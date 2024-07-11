import React from 'react'


type Prop = {
  title: string
}

const FormTitle = ( { title } : Prop)  => {

  return (
    <>
      <h1 className='text-2xl text-center'>{title}</h1>
    </>
  )
}

export default FormTitle