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

import { useContacts, useGroupsDispatch, useLayout, useLayoutDispatch, useUser } from '../../contexts';
import useInputState from '../../hooks/useInputState';
import addDatabaseGroup from '../../services/api/addDatabaseGroup';

function GroupFormDialog() {
	const { groupDialog } = useLayout();
	const { uuid } = useUser();
  const contacts = useContacts();
  const groupsDispatch = useGroupsDispatch();
	const layoutDispatch = useLayoutDispatch();
	const [members, setMembers] = useState([]);
	const [getMembers, setGetMembers] = useState(true);
	const { state, handleChange, reset } = useInputState('');

	function handleCloseDialog() {
		layoutDispatch({ type: 'SHOW_GROUPDIALOG', value: false });
	}

	const handleChangeChecked = targetedMember => e => {
		const memberIndex = members.findIndex(member => member.uuid === targetedMember.uuid);
		let modifiedMembers = members;
		modifiedMembers[memberIndex].isChecked = e.target.checked;
		setMembers([...modifiedMembers]);
	};

	function handleSubmit(e) {
		e.preventDefault();
		const addedMembers = members.filter(member => member.isChecked);
		const groupData = addDatabaseGroup({
			userId: uuid,
			members: addedMembers,
			groupName: state,
    });
    groupsDispatch({type: 'JOIN_GROUP', newGroup: groupData})
		reset();
		setGetMembers(true);
		handleCloseDialog();
	}

	useEffect(() => {
		if (getMembers) {
			const createList = contacts
				.filter(contact => contact.isFriend)
				.map(contact => {
					const { displayName, photoURL, uuid } = contact;
					return { displayName, photoURL, uuid, isChecked: false };
				});
			setMembers([...createList]);
		}
		return () => {
			setGetMembers(false);
		};
	}, [getMembers]);

	return (
		<Dialog open={groupDialog} onClose={handleCloseDialog}>
			<form onSubmit={handleSubmit}>
				<DialogTitle>Create a Group</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To create a group, please enter a name. The groupname must be unique.
					</DialogContentText>
					<TextField
						required
						autoFocus
						margin='dense'
						id='name'
						aria-label='Group Name'
						label='Group Name'
						type='text'
						fullWidth
						variant='standard'
						value={state}
						onChange={handleChange}
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
												onChange={handleChangeChecked(member)}
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
					<Button type='submit'>Submit</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default GroupFormDialog;
