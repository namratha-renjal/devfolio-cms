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

export async function registerUser(userData){
    try{
        const response = await api.post('register_user/', userData)
        return response.data
    }
    catch(error){
        console.log(error)
        if(error.status === 400){
            throw new Error("Username already exists")
        }
        throw new Error(error)
    }
}

export async function signin(data){
    try{
        const response = await api.post("api/token/", data)
        return response.data
    }catch(err){
        if(err.status === 401){
            throw new Error("Invalid credentials")
        }
        throw new Error(err)
    }
}