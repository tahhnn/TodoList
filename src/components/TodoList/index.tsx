import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './component/DataTable'
import { useProductQuery } from '@/hooks/useQuery'
import { DropdownMenuCheckboxes } from './component/DropDown'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Toaster } from '../ui/toaster'
import { DropdownMenuDemo } from './component/element/DropDownOption'
import { Button } from '../ui/button'
import { LocalStorage } from '@/context/LocalStorage'
const columns: ColumnDef<any>[] = [
    {
        accessorKey: 'name',
        header: () => <h4 className='text-center text-xl'>Tên công việc</h4>,
        cell: ({ row: { original } }) => {
            return (
                <>
                    <p>{original.name}</p>
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
                    <p>{original.isCompleted}</p>
                </>
            )
        }
    },
    {
        accessorKey: 'priority',
        header: () => <p className='text-center'>Độ phức tạp</p>,
        cell: ({ row: { original } }) => {
            return (
                <>
                    <p>{original.priority}</p>
                </>
            )
        }
    },
    {
        id: 'action',
        cell: ({ row: { original } }) => {
            return (
                <>
                    <DropdownMenuCheckboxes id={original.id} />
                </>
            )
        }
    }
]
const TodoList = () => {
    const [isLog, setLogin] = useState(false)
    const navigate = useNavigate()
    const { data, isLoading, isError } = useProductQuery()
    const { param } = useParams()
    const [filteredData, setFilteredData] = useState([])
    const { user, removeUser } = useContext(LocalStorage)
    console.log(user)

    useEffect(() => {
        if (data) {
            switch (param) {
                case 'easy':
                    setFilteredData(data.filter((p: any) => p.priority === 'Dễ'))
                    break
                case 'medium':
                    setFilteredData(data.filter((p: any) => p.priority === 'Trung bình'))
                    break
                case 'hard':
                    setFilteredData(data.filter((p: any) => p.priority === 'Khó'))
                    break
                default:
                    setFilteredData(data)
                    break
            }
        }
    }, [data, param, isLog])

    return (
        <>
            {isLoading && <p>Loading...</p>}
            <Toaster />
            {user ? (
                <div>
                    <p>Xin chào {user?.user?.email}</p>
                    <Button variant={'destructive'} onClick={removeUser}>
                        Đăng xuất
                    </Button>
                </div>
            ) : null}
            <DataTable columns={columns} data={filteredData || []} />
            <div className='mx-auto pt-2'>
                <DropdownMenuDemo />
            </div>
        </>
    )
}

export default TodoList
