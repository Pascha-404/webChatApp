import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
	chatBubble: {
		position: 'relative',
		marginBottom: '2rem',
		padding: '10px 20px',
		color: props => (props.isMe ? 'white' : 'black'),
		background: props => (props.isMe ? '#F44A4A' : '#FFFF'),
		borderRadius: '25px',
		float: props => (props.isMe ? 'right' : 'left'),
		'&:before': {
			content: '""',
			position: 'absolute',
			zIndex: props => (props.isMe ? '0' : '2'),
			bottom: '-2px',
			right: props => props.isMe && '-7px',
			left: props => !props.isMe && '-7px',
			height: '20px',
			borderRight: props => props.isMe && '20px solid #F44A4A',
			borderLeft: props => !props.isMe && '20px solid #FFFF',
			borderBottomLeftRadius: props => props.isMe && '16px 14px',
			borderBottomRightRadius: props => !props.isMe && '16px 14px',
			transform: 'translate(0px, -2px)',
		},
		'&:after': {
			content: '""',
			position: 'absolute',
			zIndex: props => (props.isMe ? '1' : '3'),
			bottom: '-2px',
			right: props => props.isMe && '-56px',
			left: props => !props.isMe && '4px',
			width: '26px',
			height: '20px',
			background: '#EFECE8',
			borderBottomLeftRadius: props => props.isMe && '10px',
			borderBottomRightRadius: props => !props.isMe && '10px',
			transform: 'translate(-30px, -2px)',
		},
	},
	clear: {
		clear: 'both',
	},
	timeSend: {
		color: '#1A2028',
		opacity: '0.3',
		position: 'absolute',
		fontSize: '12px',
		right: props => props.isMe && '1.1rem',
		left: props => !props.isMe && '1.1rem',
		bottom: '-1.8rem',
		lineHeight: '12px',
	},
});

export default useStyles;
