import instance from './instance'

export const getAll = () => {
    return instance.get('/')
}
export const update = (product: any) => {
    return instance.patch(`/${product.id}`, product)
}
export const add = (product: any) => {
    return instance.post(`/`, product)
}
export const remove = (id: any) => {
    return instance.delete(`/${id}`)
}
