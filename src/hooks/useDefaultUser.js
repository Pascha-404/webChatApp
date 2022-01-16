import { useEffect, useState } from 'react';
import useFetchData from '../services/api/useFetchData';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const useDefaultUser = () => {
	const [defaultUser, setDefaultUser] = useState();
	// const [fetchedContacts] = useFetchData('https://randomuser.me/api/?results=5');
	useEffect(() => {
		const createDefaultUser = async () => {
			const fetchContacts = await axios.get('https://randomuser.me/api/?results=5');
			const contacts = fetchContacts.data.results
			const defaultUserId = uuid();
			let userData = {
				userId: defaultUserId,
				name: { first: 'patrick', last: 'pavliuchik', nickname: 'pascha' },
				contacts: contacts,
				chats: [
					{
						chatId: uuid(),
						members: [defaultUserId, contacts[0].login.uuid],
						messages: [
							{
								msgId: uuid(),
								userId: contacts[0].login.uuid,
								timestamp: Date.now(),
								msg: 'Wanna hang out?',
							},
							{
								msgId: uuid(),
								userId: defaultUserId,
								timestamp: Date.now(),
								msg: 'Sure mate, whats the plan?',
							},
							{
								msgId: uuid(),
								userId: contacts[0].login.uuid,
								timestamp: Date.now(),
								msg: 'Lets just chill and talk',
							},
						],
					},
				],
			};
			setDefaultUser(userData);
		};
		createDefaultUser();
	}, []);

	return [defaultUser];
};

export default useDefaultUser;
