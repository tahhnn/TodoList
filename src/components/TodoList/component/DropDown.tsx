'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { AlertDialogDemo } from './element/AlertDialog'
import { Link } from 'react-router-dom'

export function DropdownMenuCheckboxes(id: any) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>. . .</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-full flex justify-center gap-4'>
                <AlertDialogDemo id={id} />
                <Button variant={'outline'}>
                    <Link to={`/edit/${id.id}`}>Sửa</Link>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
