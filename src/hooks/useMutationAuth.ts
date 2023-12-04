import { joiResolver } from '@hookform/resolvers/joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { useLocalStorage } from './useStorage'
import { signIn, signUp } from '@/api/auth'
import Joi from 'joi'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { LocalStorage } from '@/context/LocalStorage'

const formSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
        .messages({
            'string.email': 'Email không hợp lệ',
            'any.required': 'Email không được để trống'
        }),
    password: Joi.string().min(6).max(32).required().messages({
        'string.min': 'Mật khẩu phải có ít nhất 6 kí tự',
        'string.max': 'Mật khẩu không được quá 32 kí tự',
        'any.required': 'Mật khẩu không được để trống'
    })
})
type FormAuthType = {
    email: string
    password: string
}

type useAuthMutationProps = {
    action: 'SIGN_IN' | 'SIGN_UP'
    defaultValues?: FormAuthType
    onSuccess?: () => void
}

const useAuthMutation = ({ action, defaultValues = { email: '', password: '' }, onSuccess }: useAuthMutationProps) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { setUser } = useContext(LocalStorage)
    const { mutate, ...rest } = useMutation({
        mutationFn: async (user: any) => {
            switch (action) {
                case 'SIGN_IN':
                    return await signIn(user)

                case 'SIGN_UP':
                    return await signUp(user)
                default:
                    return null
            }
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['auth']
            })
            onSuccess && onSuccess()
            if (action === 'SIGN_IN') {
                if (data?.accessToken) {
                    setUser(data)
                    navigate('/')
                }
            }

            // Luu token vao localstorage
        }
    })

    const form = useForm<FormAuthType>({
        resolver: joiResolver(formSchema),
        defaultValues
    })

    const onSubmit: SubmitHandler<FormAuthType> = (values) => {
        mutate(values)
    }

    return {
        form,
        onSubmit,
        ...rest
    }
}

export default useAuthMutation
