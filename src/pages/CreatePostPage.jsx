import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { createBlog } from '@/services/apiBlog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'    
import SmallSpinner from '@/ui_components/SmallSpinner'

const CreatePostPage = () => {

  const {register, handleSubmit, formState, setValue} = useForm()
  const {errors} = formState
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data) => createBlog(data),
    onSuccess: ()=> {
      toast.success("New Post Added Successfully")
      queryClient.invalidateQueries({queryKey: ['blogs']}) //trigger update to blogs query
      navigate("/")
    }
  })

  function onSubmit(data) {
    const formData = new FormData()
    formData.append("title", data.title)
    formData.append("content", data.content)
    formData.append("category", data.category)
    if(data.featured_image)
      formData.append("featured_image", data.featured_image[0]) //get the first file from the array
    mutation.mutate(formData)
  }
  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]">
      
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">Create Post</h3>        
        <p>Create a new post and share your ideas.</p>        
      </div>

      <Field>
        <FieldLabel htmlFor="title" className="dark:text-[97989F]">
          Title
        </FieldLabel>
        <Input
          type="text"
          id="title"
          {...register("title", { required: 'Blog Title is Required', minLength: { value:3, message: 'Blog Title must be at least 3 characters long' } })}          
          placeholder="Give your post a title"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px]"
        />
        <FieldError>
            {errors?.title?.message}
        </FieldError>       
      </Field>

      <Field>
        <FieldLabel htmlFor="content">Content</FieldLabel>
        <Textarea
          id="content"
          {...register("content", { required: 'Content is Required', minLength: { value:10, message: 'Content must be at least 10 characters long' } })}  
          placeholder="Write your blog post"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify"
        /> 
        <FieldError>
            {errors?.content?.message}
        </FieldError>      
      </Field>

        <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select {...register("category", {required: 'Blog Category is Required'})} onValueChange={(value)=> setValue("category", value)}>
                <SelectTrigger className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Fullstack">Fullstack</SelectItem>
                    <SelectItem value="Web3">Web3</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <FieldError>
            {errors?.category?.message}
        </FieldError>  
        </Field>

        <Field>
            <FieldLabel htmlFor="featured_image">Featured Image</FieldLabel>
            <Input
            type="file"
            id="picture" 
            {...register("featured_image", {required: 'Feature Image for Blog is Required'})}           
            className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"
            /> 
            <FieldError>
              {errors?.featured_image?.message}
            </FieldError>         
        </Field>

        <Field className="w-full flex items-center justify-center flex-col my-4">
            <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
                {mutation.isPending ? <SmallSpinner text="Creating Post ..."/> : <>Create Post</>}
            </button>
        </Field>

    </form>
  )
}

export default CreatePostPage