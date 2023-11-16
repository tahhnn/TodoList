import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { add } from '../../api/product'

const FormAdd = () => {
    const { refetch } = useQuery('PRODUCT')
    const [valueInput, setValueInput] = React.useState<any>({ name: '', isCompleted: 'Pending' })
    const formRef = React.useRef<any>()

    function handleAdd(e: any) {
        const { name, value } = e.target
        setValueInput({
            ...valueInput,
            [name]: value
        })
    }
    const mutation = useMutation({
        mutationFn: (todo) => add(todo),

        onSuccess: () => {
            formRef.current.reset()
            refetch()
        }
    })
    const onHandleAdd = async (e: any) => {
        e.preventDefault()
        mutation.mutate(valueInput as any)
    }

    return (
        <>
            <form onSubmit={onHandleAdd} ref={formRef}>
                <input type='text' name='name' placeholder='Tên việc cần làm' onInput={handleAdd} />

                <button>Thêm</button>
            </form>
        </>
    )
}

export default FormAdd
