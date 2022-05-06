import React, { useState, useEffect } from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	TextField,
	DialogActions,
	Button,
	FormControl,
	FormGroup,
	FormLabel,
	FormControlLabel,
	Checkbox,
	FormHelperText,
} from '@mui/material';

import UserAvatar from '../UserAvatar';

import { useContacts, useLayout, useLayoutDispatch } from '../../contexts';

function GroupFormDialog() {
	const { groupDialog } = useLayout();
	const contacts = useContacts();
	const layoutDispatch = useLayoutDispatch();
	const [members, setMembers] = useState([]);

	function handleCloseDialog() {
		layoutDispatch({ type: 'SHOW_GROUPDIALOG', value: false });
	}

	const handleChange = targetedMember => e => {
		const memberIndex = members.findIndex(member => member.uuid === targetedMember.uuid);
		let modifiedMembers = members;
		modifiedMembers[memberIndex].isChecked = e.target.checked;
		setMembers([...modifiedMembers]);
	};

	useEffect(() => {
		let isActive = true;
		if (isActive) {
			const createList = contacts
				.filter(contact => contact.isFriend)
				.map(contact => {
					const { displayName, photoURL, uuid } = contact;
					return { displayName, photoURL, uuid, isChecked: false };
				});
			setMembers(createList);
		}
		return () => {
			isActive = false;
		};
	}, []);

	return (
		<Dialog open={groupDialog} onClose={handleCloseDialog}>
			<DialogTitle>Create a Group</DialogTitle>
			<DialogContent>
				<DialogContentText>
					To create a group, please enter a name. The groupname must be unique.
				</DialogContentText>
				<TextField
					autoFocus
					margin='dense'
					id='name'
					label='Group Name'
					type='text'
					fullWidth
					variant='standard'
				/>
				<FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
					<FormLabel component='legend'>Add Members</FormLabel>
					<FormGroup>
						{members.map(member => (
							<FormControlLabel
								key={member.uuid}
								control={
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
										}}>
										<Checkbox
											checked={member.isChecked}
											onChange={handleChange(member)}
											name={member.uuid}
										/>
										<UserAvatar
											size={2}
											userName={member.displayName}
											photoURL={member.photoURL}
										/>
									</div>
								}
								label={member.displayName}
							/>
						))}
					</FormGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog}>Cancel</Button>
				<Button onClick={handleCloseDialog}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
}

export default GroupFormDialog;
