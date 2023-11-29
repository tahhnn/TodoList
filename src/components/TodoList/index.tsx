import { ColumnDef } from '@tanstack/react-table'

import { DataTable } from './component/DataTable'
import { useProductQuery } from '@/hooks/useQuery'
import { DropdownMenuCheckboxes } from './component/DropDown'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Toaster } from '../ui/toaster'
import { DropdownMenuDemo } from './component/element/DropDownOption'
import { Button } from '../ui/button'
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
const ProductList = () => {
    const [isLog, setLogin] = useState(false)
    const { data, isLoading, isError } = useProductQuery()
    const { param } = useParams()
    const [filteredData, setFilteredData] = useState([])
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (user?.accessToken != undefined) {
            setLogin(true)
        } else {
            setLogin(false)
        }
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
    }, [data, param])

    return (
        <>
            {isLoading && <p>Loading...</p>}
            <Toaster />
            {isLog ? (
                <div>
                    <p>Xin chào {user.user.email}</p>
                    <Button
                        variant={'destructive'}
                        onClick={() => {
                            localStorage.clear()
                            setLogin(false)
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            ) : (
                <div>
                    <Button variant={'link'}>
                        <Link to={'/signin'}>Đăng nhập</Link>
                    </Button>
                    <Button variant={'link'}>
                        <Link to={'/signup'}>Đăng ký</Link>
                    </Button>
                </div>
            )}
            <DataTable columns={columns} data={filteredData || []} />
            <div className='mx-auto pt-2'>
                <DropdownMenuDemo />
            </div>
        </>
    )
}

export default ProductList
