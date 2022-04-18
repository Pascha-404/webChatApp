function sortByTimestamp(arrayOfArrays, order = 'ascending') {
	const flattenedArray = arrayOfArrays.flat();
	if (order === 'ascending') {
		return flattenedArray.sort((objectA, objectB) => {
			const timestampKeyA = objectA.msgTimestamp || objectA.chatTimestamp || undefined;
			const timestampKeyB = objectB.msgTimestamp || objectB.chatTimestamp || undefined;

			if (timestampKeyA > timestampKeyB || timestampKeyB === undefined) return 1;
			if (timestampKeyA < timestampKeyB || timestampKeyA === undefined) return -1;
			return 0;
		});
	}
	if (order === 'descending') {
		return flattenedArray.sort((objectA, objectB) => {
			const timestampKeyA = objectA.msgTimestamp || objectA.chatTimestamp || undefined;
			const timestampKeyB = objectB.msgTimestamp || objectB.chatTimestamp || undefined;

			if (timestampKeyA < timestampKeyB || timestampKeyB === undefined) return 1;
			if (timestampKeyA > timestampKeyB || timestampKeyA === undefined) return -1;
			return 0;
		});
	}
}

export default sortByTimestamp;
