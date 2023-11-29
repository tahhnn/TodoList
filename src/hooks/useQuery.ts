import { getAll, getOne } from '@/api/product'
import { useQuery } from 'react-query'

export const useProductQuery = (productId?: number) => {
    const { data, ...rest } = useQuery({
        queryKey: productId ? ['PRODUCT', productId] : ['PRODUCT'],
        queryFn: async () => (productId ? await getOne(productId) : await getAll())
    })
    return {
        data,
        ...rest
    }
}
