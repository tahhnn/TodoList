import { add, getAll } from '@/api/product'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { SelectPriority } from './Element/SelectPriority'
import { useMutationTodo } from '@/hooks/useMutations'

export function FormDialog() {
    const [valueInput, setValueInput] = React.useState<any>({ isCompleted: 'Pending' })
    const [dialogOpen, setDialogOpen] = useState(false)

    const { refetch } = useQuery<any>({
        queryKey: 'PRODUCT',
        queryFn: async () => {
            try {
                const data = await getAll()
                return data
            } catch (error) {
                throw new Error('Failed to fetch data')
            }
        }
    })

    const mutation = useMutation({
        mutationFn: (todo) => add(todo),

        onSuccess: () => {
            setDialogOpen(false)
            refetch()
        }
    })

    const { onSubmit } = useMutationTodo({
        action: 'ADD'
    })

    const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValueInput({
            ...valueInput,
            [name]: value
        })
    }

    const onHandleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutation.mutate(valueInput as any)
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='outline' onClick={() => setDialogOpen(true)}>
                        <PlusCircle style={{ marginRight: 5 }} />
                        Thêm mới
                    </Button>
                </DialogTrigger>
                {dialogOpen && (
                    <DialogContent className='sm:max-w-[425px]'>
                        <DialogHeader>
                            <DialogTitle>Thêm công việc</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={onHandleAdd}>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-right'>
                                        Tên công việc
                                    </Label>
                                    <Input id='name' name='name' className='col-span-3' onChange={handleAdd} />
                                </div>
                            </div>
                            <div className='grid gap-4 py-4'>
                                <div className='grid grid-cols-4 items-center gap-4'>
                                    <Label htmlFor='name' className='text-right'>
                                        Mức độ
                                    </Label>
                                    <SelectPriority handleAdd={handleAdd} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button>Thêm mới</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                )}
            </Dialog>
        </>
    )
}
