import Header from '@/ui_components/Header'
import BlogConatiner from '@/ui_components/BlogContainer'
import React from 'react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getBlogs } from '@/services/apiBlog'
import PagePagination from '@/ui_components/PagePagination'

const HomePage = () => {

  const [page, setPage] = React.useState(1)
  const numberOfBlogsPerPage = 1
  
  const {isPending, isError, error, data} = useQuery({
    queryKey: ['blogs', page],
    queryFn: () => getBlogs(page),
    placeholderData: keepPreviousData,
  })

 //console.log(data)
  const blogs = data?.results || []
  const numberOfPages = Math.ceil((data?.count || 0) / numberOfBlogsPerPage)
  //console.log(numberOfPages)

  function handleSetPage(val){
    setPage(val)
  }

  function handleNextPage(){
    setPage((curr) => curr + 1)
  }

  function handlePreviousPage(){
    setPage((curr) => curr - 1)
  }

  return (
    <>
        <Header />
        <BlogConatiner isPending={isPending} blogs={blogs} />
        <PagePagination 
          numberOfPages = {numberOfPages} 
          page={page} 
          handleSetPage={handleSetPage} 
          handleNextPage={handleNextPage} 
          handlePreviousPage={handlePreviousPage} 
        />
    </>
  )
}

export default HomePage