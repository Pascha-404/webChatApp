import React from 'react';

import { UserProvider } from '../../contexts/user.context';

import DataList from '../DataList';
import Navbar from '../layout/Navbar';
import ChatBox from '../ChatBox';
import PageContent from '../layout/PageContent';

function WebChatApp() {
	return (
		<PageContent>
			<UserProvider>
				<Navbar />
				<DataList />
				<ChatBox />
			</UserProvider>
		</PageContent>
	);
}

export default WebChatApp;
