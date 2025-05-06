import { Flex, Container, VStack, Box, Image } from '@chakra-ui/react'
import AuthForm from '../../components/AuthForm/AuthForm'
import React from 'react'

const AuthPage = () => {
    return (
        <Flex minH={'100vh'} justifyContent={'center'} alignItems={'center'} px={4}>
            <Container maxWidth={'container.md'} padding={0}>
                <Flex justifyContent={'center'} alignItems={'center'} gap={10}>
                    <Box display={{ base: 'none', md: 'block' }}>
                        <Image src='/auth.png' h={650} alt='phone image'></Image>
                    </Box>
                    <VStack spacing={4} align={'stretch'}>
                        <AuthForm></AuthForm>
                        <Box textAlign={'center'}>get the app</Box>
                        <Flex gap={5} justifyContent={'center'}>
                            <Image src='/playstore.png' height={'10'} alt='playstore logo'></Image>
                            <Image src='/microsoft.png' height={'10'} alt='microsoft logo'></Image>
                        </Flex>
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}

export default AuthPage