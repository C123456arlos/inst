import { Button, Container, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Container maxW={'container.lg'} my={4}>
            <Flex w={'full'} justifyContent={{ base: 'none', sm: 'space-between' }} alignItems={'center'}>
                <Image src='/logo.png' h={20} display={{ base: 'none', sm: 'block' }} cursor={'pointer'}></Image>
                <Flex gap={4}>
                    <Link to='/auth'>
                        <Button colorScheme={'blue'} size={'sm'}>login</Button>
                    </Link>
                    <Link to='/auth'>
                        <Button variant={'outline'} size={'sm'}>signup
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Container>
    )
}

export default Navbar

