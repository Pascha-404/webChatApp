import React from 'react';

import {
	UserProvider,
	LayoutProvider,
	GroupsProvider,
	ChatsProvider,
	MessagesProvider,
	ContactsProvider,
} from '../../contexts';

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
						<GroupsProvider>
							<ChatsProvider>
								<DataList />
								<MessagesProvider>
									<ChatBox />
								</MessagesProvider>
							</ChatsProvider>
						</GroupsProvider>
					</ContactsProvider>
				</LayoutProvider>
			</UserProvider>
		</PageContent>
	);
}

export default WebChatApp;
