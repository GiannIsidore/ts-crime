"use client"
import React from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const AddEmployee = () => {

  const { register, handleSubmit, setError, setValue, formState: {errors, isSubmitted, isSubmitting }} = useForm()


  return (

    <>
      <span>employee form</span>
    </>
  )
}

export default AddEmployee