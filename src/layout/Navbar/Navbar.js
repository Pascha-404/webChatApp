import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PhoneIcon from '@mui/icons-material/Phone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function Navbar() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<nav>
			<Tabs orientation="vertical" value={value} onChange={handleChange} aria-label='icon tabs example'>
				<Tab icon={<PhoneIcon />} aria-label='phone' />
				<Tab icon={<FavoriteIcon />} aria-label='favorite' />
				<Tab icon={<PersonPinIcon />} aria-label='person' />
			</Tabs>
		</nav>
	);
}

export default Navbar;
