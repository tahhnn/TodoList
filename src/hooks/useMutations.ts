import { QueryClient } from 'react-query'
import { IProduct } from '@/interface'
import j from 'joi'
import { useMutation } from 'react-query'
import { add, remove, update } from '@/api/product'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'

type useMutationTypeProps = {
    action: 'ADD' | 'DELETE' | 'UPDATE'
    defaultValue?: IProduct
    onSuccess?: () => void
}
const formSchema = j.object({
    name: j.string().required(),
    isCompleted: j.string(),
    priority: j.string()
})

export const useMutationTodo = ({
    action,
    defaultValue = { name: '', isCompleted: 'Pending', priority: '' },
    onSuccess
}: useMutationTypeProps) => {
    const queryClient = new QueryClient()
    const { mutate, ...rest } = useMutation({
        mutationFn: async (mutation: any) => {
            switch (action) {
                case 'ADD':
                    return await add(mutation)
                case 'DELETE':
                    return await remove(mutation.id)
                case 'UPDATE':
                    return await update(mutation)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('PRODUCT')
            onSuccess && onSuccess()
        }
    })
    const { ...form } = useForm({
        resolver: joiResolver(formSchema)
    })

    const onSubmit = (product: any) => {
        mutate(product)
    }
    const onDelete = (product: any) => {
        mutate(product)
    }
    return {
        ...form,
        onSubmit,
        defaultValue,
        onDelete,
        ...rest
    }
}
