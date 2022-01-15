import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, reqConfigObj = undefined) => {
	const [fetchedData, setFetchedData] = useState();

	useEffect(() => {
		const fetchAPI = async () => {
			try {
				const response = await axios.get(url, reqConfigObj);
				const data = await response.data;

				setFetchedData(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchAPI();
	}, [url, reqConfigObj]);
	return [fetchedData];
};

export default useFetchData;
