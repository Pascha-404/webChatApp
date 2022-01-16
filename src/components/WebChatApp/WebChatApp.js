import React from 'react';

import { UserProvider } from '../../contexts/user.context';

import Inbox from '../Inbox';
import Navbar from '../layout/Navbar';
import ChatBox from '../ChatBox';
import PageContent from '../layout/PageContent';

function WebChatApp() {
	return (
		<PageContent>
			<UserProvider>
				<Navbar />
				<Inbox />
				<ChatBox />
			</UserProvider>
		</PageContent>
	);
}

export default WebChatApp;
