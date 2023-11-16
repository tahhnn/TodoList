import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { update } from '../../api/product'

const FormEdit = ({ editTodo, setInput }: any) => {
    const { refetch } = useQuery('PRODUCT')
    const [inputValue, setInputValue] = useState<any>({
        ...editTodo
    })

    const mutation = useMutation<any>({
        mutationFn: (product: any) => update(product),
        onSuccess: () => {
            refetch()
            setInput([])
        }
    })

    const onSubmit = async (e: any) => {
        e.preventDefault()
        mutation.mutate(inputValue as any)
    }
    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        const id = editTodo.id
        console.log('Name: ' + name)
        console.log('Value: ' + value)

        setInputValue({
            ...editTodo,
            id,
            [name]: value
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type='text' name='name' defaultValue={editTodo?.name} onChange={handleInputChange} />
                <select name='isCompleted' defaultValue={editTodo?.isCompleted} onChange={handleInputChange}>
                    <option value='Done'>Completed</option>
                    <option value='Pending'>Pending</option>
                </select>
                <button>Sửa</button>
            </form>
        </>
    )
}

export default FormEdit
