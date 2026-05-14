import React from 'react'
import { Input } from '@/components/ui/input'
import {Field, FieldLabel, FieldError} from '@/components/ui/field'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { data } from 'react-router-dom'
//import { SmallSpinner } from '@/components/Loaders'
import { registerUser } from '@/services/apiBlog'
import { toast } from 'react-toastify'

const SignUpPage = () => {
    const {register, handleSubmit, formState, reset, watch} = useForm()
    const { errors } = formState
    const password = watch("password")
    const onSubmit = (data) => {
        console.log(data)
        mutation.mutate(data)
    }
    const mutation = useMutation({
        mutationFn: (data) => registerUser(data),
        onSuccess: () => {
            toast.success("User registered successfully!")
            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

  return (
    <form className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]"
    onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">SignUp Form</h3>
        <p>Create your account to get started!</p>
      </div>

      <Field>
        <FieldLabel htmlFor="username" className="dark:text-[97989F]">
          Username
        </FieldLabel>
        <Input
          type="text"
          id="username"
          placeholder="Enter username"
          {...register("username", {
            required: " Username is Required", 
            minLength: {
                value:3, 
                message: "Username should be atleast 3 characters"
            }})}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        <FieldError>
            {errors?.username?.message}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="first_name">First Name</FieldLabel>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          {...register("first_name", {
            required: "First name is Required",
            minLength: {
                value:3, 
                message: "First name should be atleast 3 characters"
            }})}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        <FieldError>{errors?.first_name?.message && errors.first_name.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          {...register("last_name", {
            required: "Last name is Required",
            minLength: {
                value:3, 
                message: "Last name should be atleast 3 characters"
            }})}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        <FieldError>{errors?.last_name?.message && errors.last_name.message}</FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is Required",
            minLength: {
                value:8, 
                message: "Password should be atleast 8 characters"
            }})}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
         <FieldError>
          {errors?.password?.message && errors.password.message}
        </FieldError>
      </Field>

      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Password is Required",
            minLength: {
                value:8, 
                message: "Password should be atleast 8 characters"
            },
            validate: (value) => value === password || "Password does not match"})}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        <FieldError>
          {errors?.confirmPassword?.message && errors.confirmPassword.message}
        </FieldError>
      </Field>

      <div className="w-full flex items-center justify-center flex-col my-4">
        <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isLoading ? <><SmallSpinner /> <small className="text-[16px]">Creating User ...</small></>: <small className="text-[16px]">Signup</small>}
        </button>
        <p className="text-[14px]">
          Already have an account? Sign in
          {/* Already have an account? <Link to="/signin">Sign In</Link> */}
        </p>
      </div>
    </form>
  );
}

export default SignUpPage