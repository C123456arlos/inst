import {
    Avatar, Box, Button, Divider, Flex, GridItem, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, useDisclosure,
    VStack
} from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { FaComment } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import Comment from '../Comments/Comment'
import PostFooter from '../FeedPosts/PostFooter'
import useUserProfileStore from '../../store/userProfileStore'
import useAuthStore from '../../store/authStore'
import useShowToast from '../hooks/useShowToast'
import { arrayRemove, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { firestore, storage } from '../../firebase/firebase'
import usePostStore from '../../store/postStore'
import { deleteObject, ref } from 'firebase/storage'
import Caption from '../Comments/Caption'
const ProfilePost = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const userProfile = useUserProfileStore((state) => state.userProfile)
    const authUser = useAuthStore((state) => state.user)
    const showToast = useShowToast()
    const deletePost = usePostStore((state) => state.deletePost)
    const decrementPostCount = useUserProfileStore(state => state.deletePost)
    const [isDeleting, setIsDeleting] = useState(false)
    const handleDeletePost = async () => {
        if (!window.confirm('are you sure you want to delete this post')) return
        if (isDeleting) return
        try {
            const imageRef = ref(storage, `posts/${post.id}`)
            await deleteObject(imageRef)
            const userRef = doc(firestore, 'users', authUser.uid)
            await deleteDoc(doc(firestore, 'posts', post.id))
            await updateDoc(userRef, {
                posts: arrayRemove(post.id)
            })
            deletePost(post.id)
            decrementPostCount(post.id)
            showToast('success', 'post deleted successfully', 'success')
        } catch (error) {
            showToast('error', error.message, 'error')
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <>
            <GridItem cursor={'pointer'} borderRadius={4} overflow={'hidden'} border={'1px solid'} borderColor={'whiteAlpha.300'}
                position={'relative'} aspectRatio={1 / 1} onClick={onOpen}>
                <Flex
                    opacity={0} _hover={{ opacity: 1 }} position={'absolute'} top={0} left={0} right={0} bottom={0}
                    bg={'blackAlpha.700'} transition={'all 0.3s ease'} zIndex={1} justifyContent={'center'}>
                    <Flex alignItems={'center'} justifyContent={'center'} gap={50}>
                        <Flex>
                            <AiFillHeart size={20}></AiFillHeart>
                            <Text fontWeight={'bold'} ml={2}>{post?.likes?.length}</Text>
                        </Flex>
                        <Flex>
                            <FaComment size={20}></FaComment>
                            <Text fontWeight={'bold'} ml={2}>{post?.comments?.length}</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Image src={post.imageURL} alt='profile post' w={'100%'} h={"100%"}
                    objectFit={'cover'}></Image>
            </GridItem>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: '3xl', md: '5xl' }}>
                <ModalOverlay></ModalOverlay>
                <ModalContent>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody bg={'black'} pb={5}>
                        <Flex gap={4} w={{ base: '90%', sm: '70%', md: 'full' }} mx={'auto'} maxH={'90vh'} minW={'50vh'}>
                            <Flex borderRadius={4} overflow={'hidden'} border={"1px solid"} borderColor={'whiteAlpha.300'} flex={1.5} justifyContent={'center'} alignItems={'center'}>
                                <Image src={post.imageURL} alt='profile post'></Image>
                            </Flex>
                            <Flex flex={1} flexDirection={'column'} px={10} display={{ base: 'none', md: 'flex' }}>
                                <Flex alignItems={'center'} justifyContent={'space-between'}>
                                    <Flex alignItems={'center'} gap={4} >
                                        <Avatar src={userProfile.profilePicURL} size={'sm'} name='programmer'></Avatar>
                                        <Text fontWeight={'bold'} fontSize={12}>
                                            {userProfile.username}
                                        </Text>
                                    </Flex>
                                    {authUser?.uid === userProfile.uid && (
                                        <Button
                                            size={'sm'} bg={'transparent'} _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }} borderRadius={4} p={1}
                                            onClick={handleDeletePost} isLoading={isDeleting}>
                                            <MdDelete size={20} cursor={'pointer'}></MdDelete>
                                        </Button>
                                    )}
                                </Flex>
                                <Divider my={4} bg={'gray.500'}></Divider>
                                <VStack w='full' alignItems={'start'} maxH={'350px'} overflowY={'auto'}>
                                    {post.caption && <Caption post={post}></Caption>}
                                    {post.comments.map(comment => (
                                        <Comment key={comment.id} comment={comment}></Comment>
                                    ))}
                                </VStack>
                                <Divider my={4} bg={'gray.800'}></Divider>
                                <PostFooter isProfilePage={true} post={post}></PostFooter>
                            </Flex>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfilePost

