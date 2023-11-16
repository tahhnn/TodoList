import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/products'
})
instance.interceptors.response.use(
    (res) => {
        return res.data
    },
    function (error) {
        return Promise.reject(error)
    }
)
export default instance
