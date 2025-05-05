import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosPrivate = axios.create({
    baseURL: `http://localhost:5000`,//https://pet-adoption-server-opal.vercel.app
    withCredentials: true
})
const useAxiosPrivate = () => {
    const { signOutUser } = useAuth()
    const navigate = useNavigate()

    axiosPrivate.interceptors.request.use((config)=>{
        const token = localStorage.getItem('access-token')
        // console.log('Request stopped by interceptors', token)
        config.headers.Authorization = `Bearer ${token}`
        return config;
    }, (err)=>{
        return Promise.reject(err)
    })

    // interceptors response 
    axiosPrivate.interceptors.response.use((response)=>{
        return response;
    }, async(error)=>{
        const status = error.response.status;
        // console.log('error in response inetrceptors', status)
        
        if(status===401 || status===403){
            await signOutUser();
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosPrivate
};

export default useAxiosPrivate;