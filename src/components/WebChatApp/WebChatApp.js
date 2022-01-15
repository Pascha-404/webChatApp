import React from 'react';

import { UsersProvider } from '../../contexts/users.context';
import { MessagesProvider } from '../../contexts/messages.context';

import Inbox from '../Inbox';
import Navbar from '../layout/Navbar';
import ChatBox from '../ChatBox';
import PageContent from '../layout/PageContent';

function WebChatApp() {
	return (
		<PageContent>
			<UsersProvider>
				<Navbar />
				<MessagesProvider>
					<Inbox />
					<ChatBox />
				</MessagesProvider>
			</UsersProvider>
		</PageContent>
	);
}

export default WebChatApp;
