import React from 'react'

import { MessagesProvider } from '../../contexts/messages.context'

import Inbox from '../Inbox'
import Navbar from '../layout/Navbar'
import ChatBox from '../ChatBox'
import PageContent from '../layout/PageContent'


function WebChatApp() {
    return (
        <PageContent>
            <Navbar />
            <MessagesProvider>
                <Inbox />
                <ChatBox />
            </MessagesProvider>
        </PageContent>
    )
}

export default WebChatApp
