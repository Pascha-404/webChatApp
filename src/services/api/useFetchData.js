import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (url, reqConfigObj = undefined) => {
	const [fetchedData, setFetchedData] = useState({ data: [], isFetching: false });

	useEffect(() => {
		const fetchAPI = async () => {
			try {
				setFetchedData(curData => ({ data: curData.data, isFetching: true }));
				const response = await axios.get(url, reqConfigObj);
				const data = await response.data;

				setFetchedData({ data: data, isFetching: false });
			} catch (error) {
				console.log(error);
			}
		};

		fetchAPI();
	}, [url, reqConfigObj]);
	return [fetchedData];
};

export default useFetchData;
