import React from 'react'
import Inbox from '../Inbox'
import Navbar from '../layout/Navbar'
import PageContent from '../layout/PageContent'
import { MessagesProvider } from '../../contexts/messages.context'

function WebChatApp() {
    return (
        <PageContent>
            <Navbar />
            <MessagesProvider>
                <Inbox />
            </MessagesProvider>
        </PageContent>
    )
}

export default WebChatApp
