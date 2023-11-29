import { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import ButtonDelete from './ButtonDelete'

export function AlertDialogDemo({ id }: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleCancel = () => {
        setIsOpen(false)
        setIsConfirmed(false)
    }

    const handleContinue = () => {
        setIsOpen(false)
        setIsConfirmed(true)
    }

    return (
        <div>
            <AlertDialog open={isOpen} onDismiss={() => setIsOpen(false)}>
                <AlertDialogTrigger asChild>
                    <Button variant='outline' onClick={() => setIsOpen(true)}>
                        Xóa
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc muốn xóa không?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Nhấm <span className='font-bold'>Xác nhận</span> để xóa
                            <br />
                            Nhấn <span className='font-bold'>Cancel</span> để hủy
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleContinue}>
                            <ButtonDelete id={id} />
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
