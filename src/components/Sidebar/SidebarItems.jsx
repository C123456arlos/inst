import React from 'react'
import Home from './Home'
import Notifications from './Notifications'
import CreatePost from './CreatePost'
import ProfileLink from './ProfileLink'
import Search from './Search'

const SidebarItems = () => {
    return (
        <>
            <Home></Home>
            <Search></Search>
            <Notifications></Notifications>
            <CreatePost></CreatePost>
            <ProfileLink></ProfileLink>
        </>
    )
}

export default SidebarItems