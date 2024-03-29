import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
})
instance.interceptors.response.use(
    (res: any) => {
        return res.data
    },
    function (error) {
        return Promise.reject(error)
    }
)
export default instance
