import { Container, Flex, Link, Skeleton, SkeletonCircle, Text, VStack } from '@chakra-ui/react'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import ProfileTabs from '../../components/Profile/ProfileTabs'
import useGetUserProfileByUsername from '../../components/hooks/useGetUserProfileByUsername'
import { useParams } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'

const ProfilePage = () => {
    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);
    const userNotFound = !isLoading && !userProfile
    if (userNotFound) return <UserNotFound></UserNotFound>
    return (
        <Container maxW='container.lg' py={5}>
            <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={'full'} mx={'auto'} flexDirection={'column'}>
                {/* {!isLoading && userProfile && <ProfileHeader></ProfileHeader>} */}
                <ProfileHeader></ProfileHeader>
                {isLoading && <ProfileHeaderSkeleton></ProfileHeaderSkeleton>}
            </Flex>
            <Flex px={{ base: 2, sm: 4 }} maxW={'full'} mx={'auto'} borderTop={'1px solid'} borderColor={'whiteAlpha.300'} direction={'column'}>
                <ProfileTabs></ProfileTabs>
                <ProfilePosts></ProfilePosts>
            </Flex>
        </Container>
    )
}

export default ProfilePage
const ProfileHeaderSkeleton = () => {
    return (
        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: 'row' }}
            justifyContent={'center'} alignItems={'center'}>
            {/* <SkeletonCircle size='24'></SkeletonCircle> */}
            <VStack alignItems={{ base: 'center', sm: 'flex-start' }} gap={2} mx={'auto'} flex={1}>
                {/* <Skeleton height='12px' width='150px'></Skeleton>
                <Skeleton height='12px' width='100px'></Skeleton> */}
            </VStack>
        </Flex>
    )
}

const UserNotFound = () => {
    return (
        <Flex flexDir='column' textAlign={'center'} mx={'auto'}>
            <Text fontSize={'2xl'}>user not found</Text>
            <Link as={RouterLink} to={'/'} color={'blue.500'} w={'max-content'} max={'auto'}>
                go home
            </Link>
        </Flex>
    )
}

