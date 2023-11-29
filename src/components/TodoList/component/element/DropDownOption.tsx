import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Link } from 'react-router-dom'

export function DropdownMenuDemo() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline'>Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 grid grid-cols-2'>
                <DropdownMenuItem>
                    <Button variant={'outline'} className='w-32 mx-auto'>
                        <Link to={`/`}>Tất cả</Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant={'outline'} className='w-32 mx-auto'>
                        <Link to={`/sort/easy`}>Dễ</Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant={'outline'} className='w-32 mx-auto'>
                        <Link to={`/sort/medium`}>Trung bình</Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant={'outline'} className='w-32 mx-auto'>
                        <Link to={`/sort/hard`}>Khó</Link>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
