import { Avatar, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React from 'react'
import useGetUserProfileById from '../hooks/useGetUserProfileById'
import { Link } from 'react-router-dom'
import { timeAgo } from '../../utils/timeAgo'

const Comment = ({ comment }) => {
    const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy)

    if (isLoading) return <CommentSkeleton></CommentSkeleton>
    return (
        <Flex gap={4}>
            <Link to={`/${userProfile.username}`}>
                <Avatar src={userProfile.profilePicURL} size={'sm'}></Avatar>
            </Link>
            <Flex direction={'column'}>
                <Flex gap={2} alignItems={'center'}>
                    <Link to={`/${userProfile.username}`}>
                        <Text fontWeight={'bold'} fontSize={12}>
                            {userProfile.username}
                        </Text>
                    </Link>
                    <Text fontSize={14}>{comment.comment}</Text>
                </Flex>
                <Text fontSize={12} color={'gray'}>
                    {timeAgo(comment.createdAt)}
                </Text>
            </Flex>
        </Flex>
    )
}

export default Comment
const CommentSkeleton = () => {
    return (
        <Flex gap={4} w={'full'} alignItems={'center'}>
            <SkeletonCircle h={10} w='10'></SkeletonCircle>
            <Flex gap={1} flexDir={'column'}>
                <Skeleton height={2} width={100}></Skeleton>
                <Skeleton height={2} width={50}></Skeleton>
            </Flex>
        </Flex>
    )
}