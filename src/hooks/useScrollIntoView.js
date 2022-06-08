import { useRef, useEffect } from 'react';

/* 
useScrollIntoView returns a elementRef that needs to be attached to the element that
should be scrolled into view. The function takes 1 property (scrollBehavior),
which is by default 'instant'. There is also 'smooth' which can be used.
*/
const useScrollIntoView = (scrollBehavior = 'instant') => {
	const elementRef = useRef();

	const scrollToTarget = () => {
		if (scrollBehavior === 'instant') {
			elementRef.current.scrollIntoView({ behavior: 'auto' });
		} else if (scrollBehavior === 'smooth') {
			elementRef.current.scrollIntoView({ behavior: 'smooth' });
		} else {
			console.error(
				`Invalid parameter: "${scrollBehavior}". Choose between "smooth" or "instant". (default/empty = instant)`,
				409
			);
		}
	};
	// First checks if localStorage entry for layout exists.
	// If true grab data and check if chatBox.id has a value.
	// If true scroll to the elementRef we have placed.
	useEffect(() => {
		if (localStorage.hasOwnProperty('webChat_layout')) {
			const layoutLocalStore = JSON.parse(localStorage.getItem('webChat_layout'));
			if (layoutLocalStore.chatBox.id !== '') {
				scrollToTarget();
			}
		
		}});

	return [elementRef];
};

export default useScrollIntoView;
