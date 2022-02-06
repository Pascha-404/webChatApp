import React from 'react';

import { UserProvider } from '../../contexts/user.context';
import { LayoutProvider } from '../../contexts/layout.context';
import { ChatsProvider } from '../../contexts/chats.context';
import { MessagesProvider } from '../../contexts/messages.context';
import { ContactsProvider } from '../../contexts/contacts.context';

import DataList from '../DataList';
import Navbar from '../layout/Navbar';
import ChatBox from '../ChatBox';
import PageContent from '../layout/PageContent';

function WebChatApp() {
	return (
		<PageContent>
			<UserProvider>
				<LayoutProvider>
					<Navbar />
					<ContactsProvider>
						<ChatsProvider>
							<MessagesProvider>
								<DataList />
								<ChatBox />
							</MessagesProvider>
						</ChatsProvider>
					</ContactsProvider>
				</LayoutProvider>
			</UserProvider>
		</PageContent>
	);
}

export default WebChatApp;
