import instance from './instance'

export const getAll = () => {
    return instance.get('/products')
}
export const getOne = (id: number) => {
    return instance.get(`/products/${id}`)
}
export const update = (product: any) => {
    return instance.put(`/products/${product.id}`, product)
}
export const add = (product: any) => {
    return instance.post(`/products`, product)
}
export const remove = (id: any) => {
    return instance.delete(`/products/${id}`)
}
