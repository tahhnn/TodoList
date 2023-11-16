import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { useMutation, useQuery } from 'react-query'
import { getAll, remove, update } from '../../api/product'
import { Button } from '../ui/button'
import { DataTable } from './component/DataTable'

const ProductList = () => {
    const [editTodo, setProductEdit] = useState<any>([])
    const [isInput, setInput] = useState<any>({})
    const [isInputSelect, setInputSelect] = useState<any>({})
    const {
        isLoading,
        isError,
        data: todos,
        refetch
    } = useQuery<any>({
        queryKey: 'PRODUCT',
        queryFn: () => {
            const data = getAll()
            return data
        }
    })
    const handleEditInput = (id: any) => {
        setInput((prevValue: any) => ({
            [id]: !prevValue[id]
        }))

        const dataUpdate = todos?.find((p: any) => p.id === id)
        setProductEdit(dataUpdate)
    }
    const handleEditSelect = (id: any) => {
        setInputSelect((prevValue: any) => ({
            [id]: !prevValue[id]
        }))

        const dataUpdate = todos?.find((p: any) => p.id === id)
        setProductEdit(dataUpdate)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setProductEdit((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }
    const mutation = useMutation<any>({
        mutationFn: (product: any) => update(product),
        onSuccess: () => {
            refetch()
            setInput({})
            setInputSelect({})
        }
    })
    const handleSubmit = (e: any) => {
        e.preventDefault()
        mutation.mutate(editTodo as any)
    }

    const onDelete = (id: any) => {
        remove(id).then(() => {
            refetch()
        })
    }
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: () => <h4 className='text-center text-xl'>Tên công việc</h4>,
            cell: ({ row: { original } }) => {
                return (
                    <>
                        {isInput[original.id] ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    name='name'
                                    defaultValue={editTodo.name || ''}
                                    onChange={handleChange}
                                />
                                <button type='submit'>Xác nhận</button>
                            </form>
                        ) : (
                            <p
                                onClick={() => {
                                    handleEditInput(original.id)
                                }}
                            >
                                {original.name}
                            </p>
                        )}
                    </>
                )
            }
        },
        {
            accessorKey: 'isCompleted',
            header: () => <p className='text-center'>Trạng thái</p>,
            cell: ({ row: { original } }) => {
                return (
                    <>
                        {isInputSelect[original.id] ? (
                            <form onSubmit={handleSubmit}>
                                <select
                                    name='isCompleted'
                                    defaultValue={editTodo.isCompleted || ''}
                                    onChange={handleChange}
                                >
                                    <option value='Done'>Completed</option>
                                    <option value='Pending'>Pending</option>
                                </select>
                                <button type='submit'>Xác nhận</button>
                            </form>
                        ) : (
                            <p
                                onClick={() => {
                                    handleEditSelect(original.id)
                                }}
                            >
                                {original.isCompleted}
                            </p>
                        )}
                    </>
                )
            }
        },
        {
            id: 'action',
            cell: ({ row: { original } }) => {
                return (
                    <>
                        <Button variant={'outline'} onClick={() => onDelete(original.id)}>
                            Xóa
                        </Button>
                    </>
                )
            }
        }
    ]

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error....</p>}

            <DataTable columns={columns} data={todos || []} />
        </>
    )
}

export default ProductList
