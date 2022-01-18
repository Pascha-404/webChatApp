import React from 'react';

import { UserProvider } from '../../contexts/user.context';
import { LayoutProvider } from '../../contexts/layout.context';

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
					<DataList />
					<ChatBox />
				</LayoutProvider>
			</UserProvider>
		</PageContent>
	);
}

export default WebChatApp;
