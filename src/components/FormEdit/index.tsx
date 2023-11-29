'use client'
import { useProductQuery } from '@/hooks/useQuery'
import { useNavigate, useParams } from 'react-router-dom'

import { useMutationTodo } from '@/hooks/useMutations'
import { useToast } from '../ui/use-toast'

export function FormEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { data, isLoading } = useProductQuery(id ? +id : 0)
    console.log(id)
    const { toast } = useToast()
    const { onSubmit, register, handleSubmit } = useMutationTodo({
        action: 'UPDATE',
        onSuccess: () => {
            navigate('/')
            toast({
                description: 'Cập nhật thành công',
                variant: 'meomeo'
            })
        }
    })

    const handleContinue = (valuesInput: any) => {
        onSubmit({ ...valuesInput, id })
    }
    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit(handleContinue)}>
                    <div className='mb-6'>
                        <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                            Tên công việc
                        </label>
                        <input
                            {...register('name')}
                            defaultValue={data?.name}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-54 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            htmlFor='isCompleted'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Tình trạng
                        </label>
                        <select
                            {...register('isCompleted')}
                            defaultValue={data?.isCompleted || 'Pending'}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            <option value='Completed'>Completed</option>
                            <option value='Pending'>Pending</option>
                        </select>
                    </div>

                    <div className='mb-6'>
                        <label
                            htmlFor='priority'
                            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                            Mức độ
                        </label>
                        <select
                            {...register('priority')}
                            defaultValue={data?.priority}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 mx-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            <option value='Dễ'>Dễ</option>
                            <option value='Trung bình'>Trung bình</option>
                            <option value='Khó'>Khó</option>
                        </select>
                    </div>

                    <button
                        type='submit'
                        className='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                    >
                        Sửa
                    </button>
                </form>
            )}
        </>
    )
}
