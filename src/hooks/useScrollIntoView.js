import { useRef, useEffect } from 'react';

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

	useEffect(() => {
		scrollToTarget();
	});

	return [elementRef];
};

export default useScrollIntoView;
