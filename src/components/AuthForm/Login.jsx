import { Alert, AlertIcon, Button, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../hooks/useLogin'

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })
    const { loading, error, login } = useLogin()
    return (
        <>
            <Input placeholder='email' fontSize={'14'} type='email' size={'sm'} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })}></Input>
            <Input placeholder='password' fontSize={'14'} type='password' size={'sm'} value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}></Input>
            {error && (<Alert status='error' fontSize={13} p={2} borderRadius={4}><AlertIcon fontSize={12}></AlertIcon>{error.message}</Alert>)}
            <Button isLoading={loading} w={'full'} colorScheme='blue' size={'sm'} fontSize={14} onClick={() => login(inputs)}
            >Log in</Button>
        </>
    )
}

export default Login