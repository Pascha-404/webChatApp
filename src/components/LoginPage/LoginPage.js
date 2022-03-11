import React from 'react';
import PageContent from '../layout/PageContent';
import LoginForm from '../LoginForm/LoginForm';
import {
	Grid,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { CircleOutlined, MailOutlined } from '@mui/icons-material';
import useStyles from './LoginPage.style';

function LoginPage() {
	const classes = useStyles();
	return (
		<PageContent>
			<Grid
				item
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				sm={6}
				className={classes.descriptionSide}>
				<div className={classes.descriptionContainer}>
					<MailOutlined className={classes.mailIcon} />

					<Typography className={classes.heading} component='h1'>
						Awesome messaging app
					</Typography>

					<List dense={true}>
						<ListItem className={classes.listItem}>
							<ListItemIcon className={classes.listIcon}>
								<CircleOutlined />
							</ListItemIcon>
							<ListItemText primary="It's so awesome you'll forget about your breakfast" />
						</ListItem>

						<ListItem className={classes.listItem}>
							<ListItemIcon className={classes.listIcon}>
								<CircleOutlined />
							</ListItemIcon>
							<ListItemText primary='Your friends will respect youu and provide expensive presents' />
						</ListItem>
						
						<ListItem className={classes.listItem}>
							<ListItemIcon className={classes.listIcon}>
								<CircleOutlined />
							</ListItemIcon>
							<ListItemText primary='You can write anonymously to your high school crush' />
						</ListItem>
					</List>

					<Typography className={classes.bottomParagraph}>
						Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
						Velit officia consequat duis enim velit mollit. Exercitation veniam consequat
						sunt nostrud amet.
					</Typography>
				</div>
			</Grid>

			<Grid
				item
				container
				direction='column'
				justifyContent='center'
				alignItems='center'
				sm={6}
				className={classes.formSide}>
				<LoginForm />
			</Grid>
		</PageContent>
	);
}

export default LoginPage;
