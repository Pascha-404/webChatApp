function sortByTimestamp(array, order = 'ascending') {
    if (order === 'ascending') {
        return array.sort((objectA, objectB) => {
            const timestampKeyA = objectA.msgTimestamp || objectA.chatTimestamp || undefined;
            const timestampKeyB = objectB.msgTimestamp || objectB.chatTimestamp || undefined;

		
            if (timestampKeyA > timestampKeyB || timestampKeyB === undefined) return 1;
            if (timestampKeyA < timestampKeyB || timestampKeyA === undefined) return -1;
            return 0;
		
        });
    }
}

export default sortByTimestamp;
