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

import { useContacts, useLayout, useLayoutDispatch } from '../../contexts';

function GroupFormDialog() {
	const { groupDialog } = useLayout();
	const contacts = useContacts();
	const layoutDispatch = useLayoutDispatch();
	const [members, setMembers] = useState([]);

	function handleCloseDialog() {
		layoutDispatch({ type: 'SHOW_GROUPDIALOG', value: false });
	}

	function handleChange(e) {
		setMembers({ ...members, [e.target.name]: e.target.checked });
	}

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
            {members.map(member => <FormControlLabel key={member.uuid}
							control={<Checkbox checked={member.isChecked} onChange={handleChange} name={member.uuid} />}
							label={member.displayName}
						/>)}
					</FormGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDialog}>Cancel</Button>
				<Button onClick={handleCloseDialog}>Create</Button>
			</DialogActions>
		</Dialog>
	);
}

export default GroupFormDialog;
