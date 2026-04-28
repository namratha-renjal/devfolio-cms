import api from "@/api"

export async function  getBlogs(page){
    try{
        const response = await api.get(`blog_list?page=${page}`)
        return response.data
    }
    catch(error){
        console.error('Error fetching blogs:', error)
        throw error
    }
}

export async function getBlog(slug){
    try{
        const response = await api.get(`blogs/${slug}`)
        return response.data
    }
    catch(error){
        console.error('Error fetching blog:', error)
        throw error
    }
}