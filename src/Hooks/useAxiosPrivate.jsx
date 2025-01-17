import axios from 'axios';

const axiosPrivate = axios.create({
    baseURL: `http://localhost:5000`,
    // withCredentials: true
})
const useAxiosPrivate = () => {
    return axiosPrivate
};

export default useAxiosPrivate;