import React, { createContext } from 'react';

const MessagesContext = createContext();

const defaultMessages = [
	{
		userId: 1,
		chatMessages: [
			{ userId: 1, date: '2021/20/3', time: '12pm', msg: 'Hey, how are you?' },
			{
				userId: 2,
				date: '2021/20/3',
				time: '13pm',
				msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat nibh vel arcu sodales venenatis. Phasellus commodo nisl augue, quis.',
			},
			{ userId: 1, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 2, date: '2021/20/3', time: '15pm', msg: 'Hey, how are you?' },
			{
				userId: 1,
				date: '2021/20/3',
				time: '16pm',
				msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat nibh vel arcu sodales venenatis. Phasellus commodo nisl augue, quis.?',
			},
			{ userId: 2, date: '2021/20/3', time: '17pm', msg: 'Hey, how are you?' },
			{ userId: 1, date: '2021/20/3', time: '18pm', msg: 'Hey, how are you?' },
			{ userId: 2, date: '2021/20/3', time: '19pm', msg: 'Hey, how are you?' },
		],
	},
	{
		userId: 3,
		chatMessages: [
			{ userId: 3, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 4, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 3, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 4, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
		],
	},
	{
		userId: 5,
		chatMessages: [
			{ userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 6, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 5, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
			{ userId: 6, date: '2021/20/3', time: '14pm', msg: 'Hey, how are you?' },
		],
	},
];

function MessagesProvider({ children }) {
	return (
		<MessagesContext.Provider value={defaultMessages}>
			{children}
		</MessagesContext.Provider>
	);
}

export { MessagesProvider, MessagesContext };
