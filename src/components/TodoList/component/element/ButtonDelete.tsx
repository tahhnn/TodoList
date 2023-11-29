import { remove } from '@/api/product'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useMutationTodo } from '@/hooks/useMutations'
import { useProductQuery } from '@/hooks/useQuery'
import 'react-toastify/dist/ReactToastify.css'
const ButtonDelete = ({ id }: any) => {
    const { refetch } = useProductQuery()
    const { toast } = useToast()
    const { onDelete } = useMutationTodo({
        action: 'DELETE',
        onSuccess: () => {
            refetch()
            toast({
                description: 'Xóa thành công rùi',
                duration: 1000,
                variant: 'gaugau'
            })
        }
    })

    return (
        <>
            <Button onClick={() => onDelete(id)}>Xác nhận</Button>
        </>
    )
}

export default ButtonDelete
